import { UpdateBreedDto } from '../../dtos';
import { BreedEntity } from '../../entities/breed.entity';
import { BreedRepository } from '../../repositories/breed.repository';

export interface UpdateBreedUseCase {
  execute(id: number, dto: UpdateBreedDto): Promise<BreedEntity>;
}

export class UpdateBreed implements UpdateBreedUseCase {
  constructor(private readonly repository: BreedRepository) {}

  public async execute(id: number, dto: UpdateBreedDto): Promise<BreedEntity> {
    return this.repository.update(id, dto);
  }
}
