import { Test, TestingModule } from '@nestjs/testing';
import { BuildingTourBookingsController } from './building_tour_bookings.controller';
import { BuildingTourBookingsService } from './building_tour_bookings.service';

describe('BuildingTourBookingsController', () => {
  let controller: BuildingTourBookingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BuildingTourBookingsController],
      providers: [BuildingTourBookingsService],
    }).compile();

    controller = module.get<BuildingTourBookingsController>(BuildingTourBookingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
