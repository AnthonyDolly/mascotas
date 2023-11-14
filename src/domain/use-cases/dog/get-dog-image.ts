import { DogEntity } from '../../entities/dog.entity';
import { DogRepository } from '../../repositories/dog.repository';

export interface GetDogImageUseCase {
  execute(id: number): Promise<string>;
}

export class GetDogImage implements GetDogImageUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(id: number): Promise<string> {
    return this.repository.getDogImage(id);
  }
}
