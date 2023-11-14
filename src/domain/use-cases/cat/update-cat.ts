import { UpdateCatDto } from '../../dtos';
import { CatEntity } from '../../entities/cat.entity';
import { CatRepository } from '../../repositories/cat.repository';

export interface UpdateCatUseCase {
  execute(id: number, dto: UpdateCatDto): Promise<CatEntity>;
}

export class UpdateCat implements UpdateCatUseCase {
  constructor(private readonly repository: CatRepository) {}

  public async execute(id: number, dto: UpdateCatDto): Promise<CatEntity> {
    return this.repository.update(id, dto);
  }
}
