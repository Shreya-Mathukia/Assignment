import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { HistoryService } from "./Service";
import jwt from "jsonwebtoken";
require('dotenv').config();
import moment from "moment";
import exceljs from "exceljs";

export class HistoryController {
    public constructor(private readonly historyService: HistoryService) {
        this.historyService = historyService;
    }

    public history = async(req: Request, res: Response): Promise<Response | undefined> => {
        let serviceRequest: ServiceRequest[] = [];
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then((user: any) => {
                            return this.historyService
                            .getAllPastRequest(user.id)
                            .then(async (service) => {
                                if(service) {
                                    if(service.length > 0) {
                                        for(let s in service) {
                                            
                                                serviceRequest.push(service[s]);
                                            }
                                        if(serviceRequest.length > 0) {
                                            return res.status(200).json({ serviceRequest });
                                        }
                                        else {
                                            return res.status(400).json("No service exists!");
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No service exists!!");
                                    }
                                }
                                else {
                                    return res.status(400).json("No service exists!!!");
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Error!");
        }
    };

    public getServiceById = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then((user:any) => {

                            return this.historyService
                            .getServiceById(+req.params.ServiceId)
                            .then((service) => {
                                if(service) {
                                    if(user.id === service.UserId) {
                                        return res.status(200).json(service);
                                    }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
                                    }
                                }
                                else {
                                    return res.status(404).json("No service request detail found with this service ID!");
                                }
                            })
                            .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            });
                          
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public giveRatings = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        req.body.RatingDate = new Date();
        this.historyService.getServiceById(+req.params.ServiceId).then( (service: any)=>{
            req.body.ServiceRequestId = service.ServiceRequestId;
        }).catch((error: Error) => {
            return res.status(500).json({ error: error });
        })

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then((user: any) => {                   
                            return this.historyService
                              .getRatingsById(req.body.ServiceRequestId)
                              .then((rating) => {
                                  if(rating) {
                                      return res.status(400).json("You already gave Ratings!");
                                  }
                                  else {
                                      if(req.params.ServiceId) {
                                          return this.historyService
                                            .getServiceById(+req.params.ServiceId)
                                            .then((service) => {
                                                if(service) {
                                                    req.body.ServiceRequestId = service.ServiceRequestId;
                                                     req.body.RatingFrom = service.UserId;
                                                        if(service.Status == true) {
                                                            req.body.RatingFrom = service.UserId;
                                                            req.body.RatingTo = service.ServiceProviderId;
                                                            req.body.Ratings = this.historyService.getRatings(req.body);
                                                            return this.historyService
                                                              .giveRatings(req.body)
                                                              .then((ratings) => {
                                                                return res.status(200).json(ratings);
                                                              })
                                                              .catch((error: Error) => {
                                                                return res.status(500).json({ error: error });
                                                              });
                                                        }
                                                        else {
                                                            return res.status(400).json("Service Request not completed or ServiceProvider Not found!");
                                                        }
                                                    
                                                }
                                                else {
                                                    return res.status(404).json("No service exists!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                      }
                                      else {
                                          return res.status(400).json("Service Request  not exists!");
                                      }
                                  }
                              })
                              .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                              });
                          
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("ERROR");
        }
    }; 

    public export = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then(async (user) => {
                          if(user) {
                              const data = await this.historyService.getAllPastRequest(user.id);
                              const workbook = new exceljs.Workbook();
                              const worksheet = workbook.addWorksheet('Service History');
                              worksheet.columns = [
                                {header: 'Id', key: 'Id', width: 10},
                                {header: 'ServiceId', key: 'ServiceId', width: 10},
                                {header: 'ServiceStartDate', key: 'ServiceStartDate', width: 20},
                                {header: 'ServiceStartTime', key: 'ServiceStartTime', width: 20},
                                {header: 'ServiceProviderId', key: 'ServiceProviderId', width: 20},
                                {header: 'TotalCost', key: 'TotalCost', width: 10},
                                {header: 'Status', key: 'Status', width: 10}
                              ];
                              let count = 1;
                              data.forEach(d => {
                                (d as any).Id = count;
                                worksheet.addRow(d);
                                count += 1;
                              });

                              worksheet.getRow(1).eachCell((cell) => {
                                cell.font = {bold: true};
                              });

                              workbook.xlsx.writeFile('ServiceHistory_' + user.FirstName+'-'+user.LastName + '.xlsx')
                              .then((service) => {
                                return res.status(200).json("Data exported successfully!");
                              })
                              .catch((error: Error) => {
                                  console.log(error);
                                return res.status(500).json({ error: error });
                              });
                          }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("ERROR!");
        }
    };
}