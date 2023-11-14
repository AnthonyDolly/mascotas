import { CreateDogDto } from '../../dtos';
import { DogEntity } from '../../entities/dog.entity';
import { DogRepository } from '../../repositories/dog.repository';

export interface CreateDogUseCase {
  execute(dto: CreateDogDto): Promise<DogEntity>;
}

export class CreateDog implements CreateDogUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(dto: CreateDogDto): Promise<DogEntity> {
    return this.repository.create(dto);
  }
}
