import { CreateBreedDto } from '../../dtos';
import { BreedEntity } from '../../entities/breed.entity';
import { BreedRepository } from '../../repositories/breed.repository';

export interface CreateBreedUseCase {
  execute(dto: CreateBreedDto): Promise<BreedEntity>;
}

export class CreateBreed implements CreateBreedUseCase {
  constructor(private readonly repository: BreedRepository) {}

  public async execute(dto: CreateBreedDto): Promise<BreedEntity> {
    return this.repository.create(dto);
  }
}