import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, PaginateQuery } from 'nestjs-paginate';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BuildingService } from '../../services/building/building.service';
import { BrokerLeadHistoriesService } from '../broker_lead_history/broker_lead_history.service';
import { ClosedLeadsService } from '../closed_leads/closed_leads.service';
import { UsersService } from '../users/users.service';
import { brokerReferredLeadConfig } from './broker_referred_leads.config';
import { BrokerReferredLeadStatus } from './broker_referred_leads.enum';
import { BrokerReferredLeadsRepository } from './broker_referrred_leads.repository';
import {
  CreateBrokerReferredLeadDto,
  LeadsPaginatedResponseDto,
  LeadWithBuilding,
  UpdateStatusDto,
} from './dto';
import { BrokerReferredLead } from './entities/broker_referred_lead.entity';
import { feeCalculator } from './FeeCalculator';

@Injectable()
export class BrokerReferredLeadsService extends BaseCrudService<BrokerReferredLead> {
  constructor(
    @InjectRepository(BrokerReferredLeadsRepository)
    private readonly repo: BrokerReferredLeadsRepository,
    private readonly buildingService: BuildingService,
    private readonly brokerLeadHistoriesService: BrokerLeadHistoriesService,
    private readonly userService: UsersService,
    private readonly closedLeadsService: ClosedLeadsService,
  ) {
    super(repo, 'BrokerReferredLeads');
  }

  async createLead(
    dto: CreateBrokerReferredLeadDto,
  ): Promise<LeadWithBuilding> {
    const revenue = feeCalculator.calculateRevenueFinal(
      dto.no_of_desks,
      dto.budget_per_desk,
      dto.tenure_in_months,
    );
    const currLead = await this.upsertOne({
      ...dto,
      projected_earnings: revenue.brokerage,
      projected_contract_value: revenue.tcv,
    });
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
      dataArr.push({ ...data, building: buildingHashmap[data.building_id] });
    }

    return {
      paginatedData: dataArr,
      meta: paginatedResults.meta,
      links: paginatedResults.links,
    };
  }

  private validateStatusTransition(
    currentStatus: BrokerReferredLeadStatus,
    newStatus: BrokerReferredLeadStatus,
  ) {
    const allowedTransitions = {
      [BrokerReferredLeadStatus.LEAD_SUBMITTED]: [
        BrokerReferredLeadStatus.LEAD_ACCEPTED,
        BrokerReferredLeadStatus.LEAD_REJECTED,
      ],
      [BrokerReferredLeadStatus.LEAD_ACCEPTED]: [
        BrokerReferredLeadStatus.TOUR_BOOKED,
      ],
      [BrokerReferredLeadStatus.TOUR_BOOKED]: [
        BrokerReferredLeadStatus.TOUR_COMPLETED,
      ],
      [BrokerReferredLeadStatus.TOUR_COMPLETED]: [
        BrokerReferredLeadStatus.CLIENT_DEAL_LOST,
        BrokerReferredLeadStatus.CLIENT_DEAL_SIGNED,
      ],
      [BrokerReferredLeadStatus.CLIENT_DEAL_SIGNED]: [
        BrokerReferredLeadStatus.CLIENT_PAYMENT_RECEIVED,
      ],
      [BrokerReferredLeadStatus.CLIENT_PAYMENT_RECEIVED]: [
        BrokerReferredLeadStatus.BROKER_PAYMENT_INITIATED,
      ],
      [BrokerReferredLeadStatus.BROKER_PAYMENT_INITIATED]: [
        BrokerReferredLeadStatus.BROKER_PAYMENT_COMPLETED,
      ],
    };

    const validTransitions = allowedTransitions[currentStatus] || [];
    if (!validTransitions.includes(newStatus)) {
      throw new BadRequestException(`Not Allowed`);
    }
  }

  async updateStatus(id: number, dto: UpdateStatusDto) {
    const entity = await this.findById(id);
    this.validateStatusTransition(entity.status, dto.status);

    if (
      dto.status === BrokerReferredLeadStatus.BROKER_PAYMENT_INITIATED &&
      !dto.invoice_url
    ) {
      throw new BadRequestException(
        `Can't initiate payment without, an invoice.`,
      );
    }

    if (dto.status === BrokerReferredLeadStatus.CLIENT_PAYMENT_RECEIVED) {
      dto['closed_at'] = new Date();
      await this.closedLeadsService.createClosedLead(
        {
          lead_id: entity.id,
          broker_id: entity.broker_id,
          no_of_desks: entity.no_of_desks,
          price_per_desk: entity.budget_per_desk,
          move_in_date: entity.target_move_in_date,
          tenure: entity.tenure_in_months,
        },
        feeCalculator.calculateRevenueFinal(
          entity.no_of_desks,
          entity.budget_per_desk,
          entity.tenure_in_months,
        ),
      );
    }

    await this.userService.sendEmail(
      entity.broker_id,
      'Intimation for Lead Status Change',
      `Your referred lead changed it's status from ${entity.status} to ${dto.status}. Kindly perform the necessary actions to move ahead.`,
    );
    await this.updateById(id, dto, entity);
    await this.brokerLeadHistoriesService.createOne({
      lead_id: id,
      status: dto.status,
    });
    return await this.getLead(id);
  }
}
