import { Test, TestingModule } from '@nestjs/testing';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';

describe('BrokerReferredLeadsService', () => {
  let service: BrokerReferredLeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerReferredLeadsService],
    }).compile();

    service = module.get<BrokerReferredLeadsService>(BrokerReferredLeadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
