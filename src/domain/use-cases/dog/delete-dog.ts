import { DogEntity } from '../../entities/dog.entity';
import { DogRepository } from '../../repositories/dog.repository';

export interface DeleteDogUseCase {
  execute(id: number): Promise<DogEntity>;
}

export class DeleteDog implements DeleteDogUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(id: number): Promise<DogEntity> {
    return this.repository.delete(id);
  }
}
