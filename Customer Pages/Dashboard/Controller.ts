import { Request, Response } from 'express';
import { DashboardService } from './Service';
import jwt from "jsonwebtoken";
import { ServiceRequest } from '../../models/servicerequest';
require("dotenv").config();

export class DashboardController { 

  public constructor(private readonly DashboardService: DashboardService) {
    this.DashboardService = DashboardService;
  }

  public getSR = async (req: Request, res: Response) => {
    jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!, (err, helper:any) => {
      if(err) {
        
          return res.status(400).json("Invalid or expired token!");
      }
     else{
       let ans: any =[];
      return this.DashboardService.getSR().then(
        (service: ServiceRequest[] | any)=> {
          if(service){
            for(let a in service){
                
                let q:any={};
                let user: any ={};
                let sr: any ={};
                
                
                sr.ServiceId=service[a].ServiceId;
                sr.ServiceStartDate=service[a].ServiceStartDate;
                sr.ServiceStartTime=service[a].ServiceStartTime;
                sr.Payement=service[a].TotalCost;
                sr.Status=service[a].Status;
                q.ServiceDetails = sr;

                let {HelperRequest}=service[a];
                if(HelperRequest != null){
                  user.Name = HelperRequest.FirstName + " "+ HelperRequest.LastName;
                  q.HelperDetails = user;
                }
                else{
                   q.HelperDetails= null;
                }
                                                                     
                  ans.push(q);
                  
                                               
        } 
            
             return res.status(200).json(ans);
      }
            else{
              return res.json("No Service history.")
            }
             
        }
 
 
      ).catch((error: Error) => {
        console.log("e"+error);
         return res.status(500).json({
           error: error
         });
       });
      }
  }); 
     }

     public ServiceDetails = async (req: Request, res: Response) => {
      jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!, (err, helper:any) => {
        if(err) {
            return res.status(400).json("Invalid or expired token!");
        }
       else{
         let ans: any = [];
        return this.DashboardService.ServiceDetails(+req.params.ServiceId).then(
          (service: ServiceRequest[] | any)=> {
            if(service){
              for(let a in service){
                  
                  let q:any={};
                  let user: any ={};
                  let sr: any ={};
                  let address: any = {};
                  
                  sr.ServiceId=service[a].ServiceId;
                  sr.ServiceStartDate=service[a].ServiceStartDate;
                  sr.ServiceStartTime=service[a].ServiceStartTime;
                  sr.Duration=service[a].ServiceHours;
                  sr.ExtraHours=service[a].ExtraHours;
                  sr.NetAmount=service[a].TotalCost;
                  sr.Comments=service[a].Comments;
                  q.ServiceDetails = sr;

                  let {HelperRequest,ServiceRequestAddress}=service[a];

                  
                  if(HelperRequest != null){
                    user.Name = HelperRequest.FirstName + " "+ HelperRequest.LastName;
                    q.HelperDetails = user;
                  }
                  else{
                     q.HelperDetails= null;
                  }

                  if( ServiceRequestAddress == null){
                    q.AddressofSr= null;
                  }
                  else{
                    address.StreetName = ServiceRequestAddress.AddressLine1;
                     address.HouseNumber= ServiceRequestAddress.AddressLine2;
                     address.PostalCode= ServiceRequestAddress.PostalCode;
                     address.City = ServiceRequestAddress.City;
                     q.AddressofSr= address;
                     
                  }
                                                                       
                    ans.push(q);
                    
                                                 
          } 
              
               return res.status(200).json(ans);
             }
             else{
                 return res.status(404).json("NO SUCHSERVICE Exist!")
             }
                           
            
   
   
             } ).catch((error: Error) => {
               console.log(error);
           return res.status(500).json({
             error: error
           });
         });
        }
    }); 
       }



  public RescheduleService = async(req: Request, res: Response): Promise<Response | void> => {
    const token = req.headers.authorization;
    let serviceDetails:any;
    let serviceList:any = [];
    let notfound = 0;
    let StatusFlag:any;
    let f=0;
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
            if(error) {
                return res.status(400).json("Invalid Login!");
            }
            else {

                await this.DashboardService.getServiceDetailsById(+req.params.ServiceId).then((service)=>{
                    if(service){
                        serviceDetails.TotalHours=service.ExtraHours! + service.ServiceHours;
                        serviceDetails=service;
                       StatusFlag= serviceDetails.Status;
                        
                    }else{
                        notfound =1;
                    }

                }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });

                  if(Number(StatusFlag) == 1 ){                     
                      
                      await this.DashboardService.RescheduleService(req.body,+req.params.ServiceId).then((s)=>{
                        if(s){
                           f=1;
                        }  
                        }).catch((error: Error) => {
                            return res.status(500).json({ error: error });
                        });
                    
                  }
                  else if(Number(StatusFlag) == 2){
                      //check sp available, send mail to  sp;

                         
                 await this.DashboardService.getAllRequestofSp(serviceDetails.ServiceProviderId).then((service)=>{
                    let srId = +req.params.ServiceId ;
                    if(service){
                        for(let a in service){
                            if(service[a].ServiceId != srId ){
                                serviceList.push(service[a]);
                            }
                        }
                        
                    }

                }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  }); 

                  const { srId, matched } = await this.DashboardService.helperHasFutureSameDateAndTime( req.body.ServiceStartDate, serviceList,  serviceDetails.TotalHours,  req.body.ServiceStartTime );
                                        if(matched) {
                                            return res.status(200).json(`Another Service Request of ServiceId #${srId} has already been assigned which has time overlap with service request. You can't pick this one!`);
                                        }
                                        else{
                                            
                                            await this.DashboardService.RescheduleService(req.body , +req.params.ServiceId).then((s)=>{
                                                if(s){
                                                   f=1;
                                                }  
                                                }).catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                        }  
                                        
                  }

                  if(f == 1 ){
                    return res.status(200).json('ServiceDetails Rescheduled and email sent to Helper');
                } 
                else{
                        if(notfound == 1){
                            return res.status(404).json("No request of given id")
                        }
                        else{
                          return res.status(400).json('Could not update try again')
                        }
                    
                }   
                  
                 
            }
        });
    }
    else {
        return res.status(400).json("Error occurred  header Not set properly!");
    }
};

  public CancelService = async (req: Request, res: Response): Promise<Response> => {
    return this.DashboardService
      .CancelService(+req.params.ServiceId)
      .then((ServiceRequest) => {
          return res.status(200).json("Service Canceled!");
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };



}