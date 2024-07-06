import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';
import { IBuildingAddress, IMongoBuilding } from './building.interface';

@Entity('buildings', { database: 'mongo' })
export class Building implements IMongoBuilding {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  address: IBuildingAddress;

  @Column()
  region: string;

  @Column()
  tier: string;

  @Column()
  microMarket: string;

  @Column()
  locationUuid: string;
}
