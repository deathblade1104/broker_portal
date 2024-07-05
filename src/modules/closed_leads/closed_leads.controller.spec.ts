import { Test, TestingModule } from '@nestjs/testing';
import { ClosedLeadsController } from './closed_leads.controller';
import { ClosedLeadsService } from './closed_leads.service';

describe('ClosedLeadsController', () => {
  let controller: ClosedLeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClosedLeadsController],
      providers: [ClosedLeadsService],
    }).compile();

    controller = module.get<ClosedLeadsController>(ClosedLeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
