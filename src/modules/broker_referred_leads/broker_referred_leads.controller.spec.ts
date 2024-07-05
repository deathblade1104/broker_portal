import { Test, TestingModule } from '@nestjs/testing';
import { BrokerReferredLeadsController } from './broker_referred_leads.controller';
import { BrokerReferredLeadsService } from './broker_referred_leads.service';

describe('BrokerReferredLeadsController', () => {
  let controller: BrokerReferredLeadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BrokerReferredLeadsController],
      providers: [BrokerReferredLeadsService],
    }).compile();

    controller = module.get<BrokerReferredLeadsController>(BrokerReferredLeadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
