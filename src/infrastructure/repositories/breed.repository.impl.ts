import {
  BreedDatasource,
  BreedEntity,
  BreedRepository,
  CreateBreedDto,
  UpdateBreedDto,
} from '../../domain';

export class BreedRepositoryImpl implements BreedRepository {
  constructor(private readonly datasource: BreedDatasource) {}

  create(createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    return this.datasource.create(createBreedDto);
  }

  findAll(): Promise<BreedEntity[]> {
    return this.datasource.findAll();
  }

  findOne(id: number): Promise<BreedEntity> {
    return this.datasource.findOne(id);
  }

  update(id: number, breed: UpdateBreedDto): Promise<BreedEntity> {
    return this.datasource.update(id, breed);
  }

  delete(id: number): Promise<BreedEntity> {
    return this.datasource.delete(id);
  }
}
