import { Logger, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  EntityManager,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { IBaseEntity } from '../interfaces/baseEntity.interface';

export class BaseCrudService<T extends IBaseEntity> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly entityName: string,
  ) {}

  private getRepository(manager?: EntityManager): Repository<T> {
    return manager
      ? manager.getRepository<T>(this.repository.target)
      : this.repository;
  }

  async createOne(
    createDto: DeepPartial<T>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepository(manager);
    const entity = repo.create(createDto);
    return await repo.save(entity);
  }

  async getOrCreateOne(
    createDto: DeepPartial<T>,
    options: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepository(manager);
    const existingEntity = await repo.findOne(options);
    if (existingEntity !== null) {
      return existingEntity;
    } else {
      const entity = repo.create(createDto);
      return await repo.save(entity);
    }
  }

  async findById(id: number, manager?: EntityManager): Promise<T> {
    const repo = this.getRepository(manager);
    const options: FindOneOptions<T> = {
      where: { id } as any,
    };
    const found = await repo.findOne(options);
    if (!found) {
      throw new NotFoundException(
        `${this.entityName} with ID - ${id} does not exist.`,
      );
    }
    return found;
  }

  async findOne(
    options: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepository(manager);
    const found = await repo.findOne(options);
    if (!found) {
      throw new NotFoundException(
        `${this.entityName} with ${options} does not exist.`,
      );
    }
    return found;
  }

  async find(
    options: FindOneOptions<T>,
    manager?: EntityManager,
  ): Promise<T | null> {
    const repo = this.getRepository(manager);
    const found = await repo.findOne(options);
    return found;
  }

  async findAll(
    findQuery: FindManyOptions<T> = {},
    manager?: EntityManager,
  ): Promise<T[]> {
    const repo = this.getRepository(manager);
    return await repo.find(findQuery);
  }

  async updateById(
    id: number,
    updateDto: DeepPartial<T>,
    entity: T | null = null,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepository(manager);
    if (entity === null) entity = await this.findById(id, manager);
    Object.assign(entity, updateDto);
    return await repo.save(entity);
  }

  async delete(id: number, manager?: EntityManager): Promise<void> {
    const repo = this.getRepository(manager);
    const result = await repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `${this.entityName} with ID - ${id} does not exist.`,
      );
    }
  }

  async softDelete(
    id: number,
    entity: T | null = null,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepository(manager);
    if (entity === null) entity = await this.findById(id, manager);
    Object.assign(entity, { is_active: false });
    return await repo.save(entity);
  }

  async hardDelete(id: number, manager?: EntityManager): Promise<void> {
    const repo = this.getRepository(manager);
    await repo.delete(id);
  }

  // async createMany(
  //   createDtos: DeepPartial<T>[],
  //   manager?: EntityManager,
  // ): Promise<T[]> {
  //   const repo = this.getRepository(manager);
  //   const entities = repo.create(createDtos);
  //   return await repo.save(entities);
  // }

  async upsertMany(
    updateDataArr: DeepPartial<T>[],
    manager?: EntityManager,
  ): Promise<T[]> {
    const repo = this.getRepository(manager);

    try {
      const result = await repo.save(updateDataArr);
      return result;
    } catch (error) {
      const err = new Error(`Upsert operation failed.`);
      err['payload'] = updateDataArr;
      err['error'] = error;
      throw err;
    }
  }

  /**
   * Upserts a single record in the database. If if id provided in the updateData, it updates
   * the entity with given id, els, it inserts a new entity in the database.
   *
   * @param {DeepPartial<T>} updateData - The data to update the record with.
   * @param {EntityManager} [manager] - The optional entity manager to use for the operation.
   * @return {Promise<T>} The updated record.
   * @throws {Error} If there is an error during the upsert operation.
   */
  async upsertOne(
    updateData: DeepPartial<T>,
    manager?: EntityManager,
  ): Promise<T> {
    const repo = this.getRepository(manager);

    try {
      const result = await repo.save(updateData);
      Logger.log('Upsert operation successful:', result);
      return result;
    } catch (error) {
      Logger.error('Error during upsert operation:' + JSON.stringify(error));
      throw error;
    }
  }

  async updateMany(
    filter: FindOptionsWhere<T>,
    updateData: Partial<T>,
    manager?: EntityManager,
  ): Promise<T[]> {
    const repo = this.getRepository(manager);
    const entitiesToUpdate = await repo.find({ where: filter });

    if (entitiesToUpdate.length === 0) {
      return [];
    }

    for (const entity of entitiesToUpdate) {
      Object.assign(entity, updateData);
    }

    return await this.upsertMany(entitiesToUpdate, manager);
  }

  // async findAllActive(
  //   findQuery: FindManyOptions<T> = {},
  //   manager?: EntityManager,
  // ): Promise<T[]> {
  //   const repo = this.getRepository(manager);
  //   let whereQuery = findQuery.where ? findQuery.where : {};
  //   whereQuery['is_active'] = true;
  //   findQuery['where'] = whereQuery;
  //   return await repo.find(findQuery);
  // }

  async findAllByIds(ids: number[]): Promise<T[]> {
    const queryBuilder = this.repository.createQueryBuilder('entityAlias');
    const entities = await queryBuilder
      .where('entityAlias.id IN (:...ids)', { ids })
      .getMany();

    return entities;
  }

  async updateManyWithIds(
    ids: number[],
    updateData: Partial<T>,
    manager?: EntityManager,
  ): Promise<T[]> {
    const repo = this.getRepository(manager);
    const entities = await this.findAllByIds(ids);
    if (entities.length === 0) {
      return [];
    }
    const updatedEntities = entities.map(entity => {
      Object.assign(entity, updateData);
      return entity;
    });
    return await repo.save(updatedEntities);
  }

  async deleteMany(
    filter: FindOptionsWhere<T>,
    manager?: EntityManager,
  ): Promise<void> {
    const repo = this.getRepository(manager);
    await repo.delete(filter);
  }
}
