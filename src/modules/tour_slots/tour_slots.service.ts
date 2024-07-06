import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { BaseCrudService } from '../../common/services/baseCrud.service';
import { BuildingService } from '../../services/building/building.service';
import { BrokerReferredLeadStatus } from '../broker_referred_leads/broker_referred_leads.enum';
import { BrokerReferredLeadsService } from '../broker_referred_leads/broker_referred_leads.service';
import {
  AvailableTourTime,
  AvailableTourTimesResponse,
  CreateTourSlotDto,
} from './tour_slots.dto';
import { TourSlots } from './tour_slots.entity';
import { SlotsRepository } from './tour_slots.repository';

@Injectable()
export class TourSlotsService extends BaseCrudService<TourSlots> {
  private readonly clientId = '22c661e78507435b8094c3fe4371756f';
  private readonly clientSecret = '42b13A84045547468847cC5c2Ec7A209';
  private readonly apiUrl =
    'https://wework-ww-sf-tours-xapi-uat.us-e1.cloudhub.io/api/v2/available_tour_times';
  constructor(
    @InjectRepository(SlotsRepository)
    private readonly repo: SlotsRepository,
    private readonly brokerReferredLeadsService: BrokerReferredLeadsService,
    private readonly buildingService: BuildingService,
  ) {
    super(repo, 'Tour_Slots');
  }

  async getAvailableTourTimes(
    buildingId: string,
    date: string,
  ): Promise<AvailableTourTime[]> {
    try {
      const currBuilding =
        await this.buildingService.findBuildingById(buildingId);
      const { location_uid } = currBuilding;
      const response = await axios.get<AvailableTourTimesResponse>(
        this.apiUrl,
        {
          params: {
            building_id: location_uid,
            date: date,
          },
          headers: {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.status !== 200) {
        throw new HttpException(
          'Failed to fetch tour times',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const { available_tour_times } = response.data;

      if (!available_tour_times) {
        throw new HttpException(
          'No available tour times found',
          HttpStatus.NOT_FOUND,
        );
      }

      return available_tour_times;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Server error',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTourSlot(
    createTourSlotDto: CreateTourSlotDto,
  ): Promise<TourSlots> {
    const lead = await this.brokerReferredLeadsService.findById(
      createTourSlotDto.lead_id,
    );

    if (lead.status !== BrokerReferredLeadStatus.LEAD_ACCEPTED) {
      throw new BadRequestException(
        `We can only make tour bookings for leads that have been accepted.`,
      );
    }

    const startTime = new Date(createTourSlotDto.start_time);
    const endTime = startTime;
    endTime.setHours(startTime.getHours() + 1);

    const tourSlot = await this.repo.save({
      ...createTourSlotDto,
      uid: uuidv4(),
      start_time: startTime,
      end_time: endTime,
      is_completed: false,
    });

    await this.brokerReferredLeadsService.updateStatus(tourSlot.lead_id, {
      status: BrokerReferredLeadStatus.TOUR_BOOKED,
    });
    return tourSlot;
  }

  async findUpcomingTourSlots(
    brokerId: number | null = null,
  ): Promise<TourSlots[]> {
    const queryBuilder = this.repo
      .createQueryBuilder('tour_slots')
      .where('tour_slots.start_time > :now', { now: new Date() });

    if (brokerId !== undefined) {
      queryBuilder.andWhere('tour_slots.broker_id = :brokerId', { brokerId });
    }

    return await queryBuilder.getMany();
  }

  async completeTour(id: number): Promise<TourSlots> {
    let entity = await this.findById(id);
    const { end_time } = entity;
    const nowDate = new Date();

    if (end_time < nowDate) {
      throw new BadRequestException(
        `This tour can't be completed, as the slot hasn't ended at. It will end at ; ${end_time.toDateString()}, please try closing it then.`,
      );
    }

    entity = await this.updateById(id, { is_completed: true });
    await this.brokerReferredLeadsService.updateStatus(entity.lead_id, {
      status: BrokerReferredLeadStatus.TOUR_COMPLETED,
    });

    return entity;
  }
}
