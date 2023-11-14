import { CreateBreedDto, UpdateBreedDto } from '../dtos';
import { BreedEntity } from '../entities/breed.entity';

export abstract class BreedDatasource {
  abstract create(breed: CreateBreedDto): Promise<BreedEntity>;
  abstract findAll(): Promise<BreedEntity[]>;
  abstract findOne(id: number): Promise<BreedEntity>;
  abstract update(id: number, breed: UpdateBreedDto): Promise<BreedEntity>;
  abstract delete(id: number): Promise<BreedEntity>;
}
