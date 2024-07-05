import { Test, TestingModule } from '@nestjs/testing';
import { BuildingTourBookingsService } from './building_tour_bookings.service';

describe('BuildingTourBookingsService', () => {
  let service: BuildingTourBookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BuildingTourBookingsService],
    }).compile();

    service = module.get<BuildingTourBookingsService>(BuildingTourBookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
