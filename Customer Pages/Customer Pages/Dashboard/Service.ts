import { ServiceRequest } from "../../models/servicerequest";
import { DashboardRepository } from "./Repository"




export class DashboardService {
    public constructor(private readonly DashboardRepository: DashboardRepository) {
        this.DashboardRepository = DashboardRepository;
    }

    public async getSR(): Promise<ServiceRequest[] | null> {
        return this.DashboardRepository.getSR();
    }

    public async ServiceHistory(): Promise<ServiceRequest[] | null> {
        return this.DashboardRepository.ServiceHistory();
    }

    
    public async RescheduleService(ServiceRequest: ServiceRequest, ServiceId: number) {
        return this.DashboardRepository.RescheduleService(ServiceRequest, ServiceId);
    }

    public async CancelService(ServiceId: number) {
        return this.DashboardRepository.CancelService(ServiceId);
    }

    
}