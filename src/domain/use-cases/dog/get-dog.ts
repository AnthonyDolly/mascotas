import { DogEntity } from '../../entities/dog.entity';
import { DogRepository } from '../../repositories/dog.repository';

export interface GetDogUseCase {
  execute(id: number): Promise<DogEntity>;
}

export class GetDog implements GetDogUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(id: number): Promise<DogEntity> {
    return this.repository.findOne(id);
  }
}
