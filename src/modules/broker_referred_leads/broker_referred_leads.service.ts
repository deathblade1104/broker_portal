import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BuildingService } from '../../services/building/building.service';
import { User } from '../users/entities/user.entity';
import { BrokerReferredLeadsRepository } from './broker_referrred_leads.repository';
import {
  CreateBrokerReferredLeadDto,
  LeadWithBuilding,
} from './dto/create-broker_referred_lead.dto';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

@Injectable()
export class BrokerReferredLeadsService extends BaseCrudService<BrokerReferredLead> {
  constructor(
    @InjectRepository(BrokerReferredLeadsRepository)
    private readonly repo: BrokerReferredLeadsRepository,
    private readonly buildingService: BuildingService,
  ) {
    super(repo, 'BrokerReferredLeads');
  }

  async createLead(
    dto: CreateBrokerReferredLeadDto,
  ): Promise<LeadWithBuilding> {
    const currLead = await this.upsertOne({ ...dto});
    return await this.getLead(currLead.id);
  }

  async getLead(id: number): Promise<LeadWithBuilding> {
    let currLead: LeadWithBuilding = await this.findById(id);

    if (currLead.building_id) {
      currLead = {
        ...currLead,
        building: await this.buildingService.findBuildingById(
          currLead.building_id,
        ),
      };
    }

    return currLead;
  }
}
