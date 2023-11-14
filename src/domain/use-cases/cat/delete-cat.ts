import { CatEntity } from '../../entities/cat.entity';
import { CatRepository } from '../../repositories/cat.repository';

export interface DeleteCatUseCase {
  execute(id: number): Promise<CatEntity>;
}

export class DeleteCat implements DeleteCatUseCase {
  constructor(private readonly repository: CatRepository) {}

  public async execute(id: number): Promise<CatEntity> {
    return this.repository.delete(id);
  }
}
