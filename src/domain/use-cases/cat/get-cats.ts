import { CatEntity } from '../../entities/cat.entity';
import { CatRepository } from '../../repositories/cat.repository';

export interface GetCatsUseCase {
  execute(): Promise<CatEntity[]>;
}

export class GetCats implements GetCatsUseCase {
  constructor(private readonly repository: CatRepository) {}

  public async execute(): Promise<CatEntity[]> {
    return this.repository.findAll();
  }
}
