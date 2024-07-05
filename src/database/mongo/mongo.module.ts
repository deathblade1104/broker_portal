import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Building } from '../../services/building/building.mongoentity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      name: 'mongoConnection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mongodb',
        url: `mongodb+srv://${configService.get<string>('mongo.username')}:${configService.get<string>('mongo.password')}@staging-primary.fu64l.mongodb.net/staging`,
        // url: 'mongodb://localhost:27017/local',
        synchronize: true,
        entities: [Building],
        logging: true,
      }),
    }),
    TypeOrmModule.forFeature([Building], 'mongoConnection'),
  ],
  exports: [TypeOrmModule],
})
export class MongoModule {}
