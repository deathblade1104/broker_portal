import { Test, TestingModule } from '@nestjs/testing';
import { BrokerFeeBreakupsService } from './broker_fee_breakups.service';

describe('BrokerFeeBreakupsService', () => {
  let service: BrokerFeeBreakupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerFeeBreakupsService],
    }).compile();

    service = module.get<BrokerFeeBreakupsService>(BrokerFeeBreakupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
