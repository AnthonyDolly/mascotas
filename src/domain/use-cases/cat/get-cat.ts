import { CatEntity } from '../../entities/cat.entity';
import { CatRepository } from '../../repositories/cat.repository';

export interface GetCatUseCase {
  execute(id: number): Promise<CatEntity>;
}

export class GetCat implements GetCatUseCase {
  constructor(private readonly repository: CatRepository) {}

  public async execute(id: number): Promise<CatEntity> {
    return this.repository.findOne(id);
  }
}
