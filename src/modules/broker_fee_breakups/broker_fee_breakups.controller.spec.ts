import { Test, TestingModule } from '@nestjs/testing';
import { BrokerFeeBreakupsController } from './broker_fee_breakups.controller';
import { BrokerFeeBreakupsService } from './broker_fee_breakups.service';

describe('BrokerFeeBreakupsController', () => {
  let controller: BrokerFeeBreakupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerFeeBreakupsController],
      providers: [BrokerFeeBreakupsService],
    }).compile();

    controller = module.get<BrokerFeeBreakupsController>(BrokerFeeBreakupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
