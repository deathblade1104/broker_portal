import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { IBuilding } from './building.interface';
import { Building } from './building.mongoentity';

@Injectable()
export class BuildingService {
  constructor(
    @InjectRepository(Building, 'mongoConnection') // Specify the connection name
    private readonly buildingRepository: Repository<Building>,
  ) {}

  async findAll(): Promise<Building[]> {
    return await this.buildingRepository.find();
  }

  async findById(id: string): Promise<Building> {
    const building = await this.buildingRepository.findOneBy({
      _id: new ObjectId(id),
    });

    if (!building || building === null) {
      throw new NotFoundException(`Building with Id - ${id} not found`);
    }
    return building;
  }

  async findBuildingById(id: string): Promise<IBuilding> {
    const currBuilding = await this.findById(id);

    const res: IBuilding = {
      ...currBuilding,
      id: currBuilding._id.toString(),
    };

    return res;
  }

  async getAllBuildingsHashmap(): Promise<Record<string, IBuilding>> {
    const buildingsArr = await this.findAll();
    const buildingsHashMap: Record<string, IBuilding> = {};

    for (const building of buildingsArr) {
      buildingsHashMap[`${building._id}`] = {
        ...building,
        id: building._id.toString(),
      };
    }
    return buildingsHashMap;
  }
}
