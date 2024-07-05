import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ObjectId } from 'typeorm';

export class IBuildingAddress {
  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  floorNumberWithKeycard?: string;

  @ApiPropertyOptional()
  floorNumberWithoutKeycard?: string;

  @ApiProperty()
  line1: string;

  @ApiPropertyOptional()
  line2?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  stateCode?: string;
}

export class IMongoBuilding {
  @ApiProperty()
  _id: ObjectId; // Primary Key

  @ApiProperty()
  name: string; // string

  @ApiProperty()
  city: string; // String

  @ApiProperty()
  address: IBuildingAddress;

  @ApiProperty()
  region: string;
}

export class IBuilding {
  @ApiProperty()
  id: string; // Primary Key

  @ApiProperty()
  name: string; // string

  @ApiProperty()
  city: string; // String

  @ApiPropertyOptional()
  address?: IBuildingAddress;

  @ApiPropertyOptional()
  region?: string;
}
