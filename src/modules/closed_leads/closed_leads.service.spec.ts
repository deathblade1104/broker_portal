import { Test, TestingModule } from '@nestjs/testing';
import { ClosedLeadsService } from './closed_leads.service';

describe('ClosedLeadsService', () => {
  let service: ClosedLeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClosedLeadsService],
    }).compile();

    service = module.get<ClosedLeadsService>(ClosedLeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
