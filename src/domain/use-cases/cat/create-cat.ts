import { CreateCatDto } from '../../dtos';
import { CatEntity } from '../../entities/cat.entity';
import { CatRepository } from '../../repositories/cat.repository';

export interface CreateCatUseCase {
  execute(dto: CreateCatDto): Promise<CatEntity>;
}

export class CreateCat implements CreateCatUseCase {
  constructor(private readonly repository: CatRepository) {}

  public async execute(dto: CreateCatDto): Promise<CatEntity> {
    return this.repository.create(dto);
  }
}
