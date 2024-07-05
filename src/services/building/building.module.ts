import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from './building.mongoentity';
import { BuildingService } from './building.service';
import { BuildingController } from './building.controller';
import { MongoModule } from '../../database/mongo/mongo.module';

@Module({
  imports: [
    MongoModule,
    TypeOrmModule.forFeature([Building], 'mongoConnection'),
  ],
  controllers: [BuildingController],
  providers: [BuildingService],
  exports: [BuildingService],
})
export class BuildingModule {}
