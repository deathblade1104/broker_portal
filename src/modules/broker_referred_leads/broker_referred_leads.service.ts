import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BuildingService } from '../../services/building/building.service';
import { BrokerLeadHistoriesService } from '../broker_lead_history/broker_lead_history.service';
import { brokerReferredLeadConfig } from './broker_referred_leads.config';
import { BrokerReferredLeadStatus } from './broker_referred_leads.enum';
import { BrokerReferredLeadsRepository } from './broker_referrred_leads.repository';
import {
  CreateBrokerReferredLeadDto,
  LeadsPaginatedResponseDto,
  LeadWithBuilding,
} from './dto/create-broker_referred_lead.dto';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';

@Injectable()
export class BrokerReferredLeadsService extends BaseCrudService<BrokerReferredLead> {
  constructor(
    @InjectRepository(BrokerReferredLeadsRepository)
    private readonly repo: BrokerReferredLeadsRepository,
    private readonly buildingService: BuildingService,
    private readonly brokerLeadHistoriesService: BrokerLeadHistoriesService,
  ) {
    super(repo, 'BrokerReferredLeads');
  }

  async createLead(
    dto: CreateBrokerReferredLeadDto,
  ): Promise<LeadWithBuilding> {
    const currLead = await this.upsertOne({ ...dto });
    await this.brokerLeadHistoriesService.upsertOne({
      lead_id: currLead.id,
      status: BrokerReferredLeadStatus.LEAD_SUBMITTED,
    });
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
        histories: await this.brokerLeadHistoriesService.getLeadHistories(id),
      };
    }

    return currLead;
  }

  async getAllPaginated(
    query: PaginateQuery,
  ): Promise<LeadsPaginatedResponseDto> {
    const queryBuilder = this.repo.createQueryBuilder('broker-referred-leads');
    const paginatedResults = await paginate(
      query,
      queryBuilder,
      brokerReferredLeadConfig,
    );

    const buildingHashmap = await this.buildingService.getAllBuildingsHashmap();
    const dataArr: LeadWithBuilding[] = [];

    for (const data of paginatedResults.data) {
      console.log(buildingHashmap[data.building_id]);
      dataArr.push({ ...data, building: buildingHashmap[data.building_id] });
    }

    return {
      paginatedData: dataArr,
      meta: paginatedResults.meta,
      links: paginatedResults.links,
    };
  }

  async updateStatus(id: number, dto: { status: BrokerReferredLeadStatus }) {
    const entity = await this.findById(id);
    let updatePayload: Partial<BrokerReferredLead> = {};

    switch (dto.status) {
      case BrokerReferredLeadStatus.LEAD_ACCEPTED:
        if (entity.status !== BrokerReferredLeadStatus.LEAD_SUBMITTED) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.LEAD_REJECTED:
        if (entity.status !== BrokerReferredLeadStatus.LEAD_SUBMITTED) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.TOUR_BOOKED:
        if (entity.status !== BrokerReferredLeadStatus.LEAD_ACCEPTED) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.TOUR_COMPLETED:
        if (entity.status !== BrokerReferredLeadStatus.TOUR_BOOKED) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.CLIENT_DEAL_SIGNED:
        if (entity.status !== BrokerReferredLeadStatus.TOUR_COMPLETED) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.CLIENT_PAYMENT_RECEIVED:
        if (entity.status !== BrokerReferredLeadStatus.CLIENT_DEAL_SIGNED) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.BROKER_PAYMENT_INITIATED:
        if (
          entity.status !== BrokerReferredLeadStatus.CLIENT_PAYMENT_RECEIVED
        ) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;

      case BrokerReferredLeadStatus.BROKER_PAYMENT_COMPLETED:
        if (
          entity.status !== BrokerReferredLeadStatus.BROKER_PAYMENT_INITIATED
        ) {
          throw new BadRequestException(`Not Allowed`);
        }
        updatePayload.status = dto.status;
        break;
    }
  }
}
