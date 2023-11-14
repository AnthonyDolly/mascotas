import { UpdateDogDto } from '../../dtos';
import { DogEntity } from '../../entities/dog.entity';
import { DogRepository } from '../../repositories/dog.repository';

export interface UpdateDogUseCase {
  execute(id: number, dto: UpdateDogDto): Promise<DogEntity>;
}

export class UpdateDog implements UpdateDogUseCase {
  constructor(private readonly repository: DogRepository) {}

  public async execute(id: number, dto: UpdateDogDto): Promise<DogEntity> {
    return this.repository.update(id, dto);
  }
}
