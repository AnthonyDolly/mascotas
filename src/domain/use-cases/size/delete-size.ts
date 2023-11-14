import { SizeEntity } from '../../entities/size.entity';
import { SizeRepository } from '../../repositories/size.repository';

export interface DeleteSizeUseCase {
  execute(id: number): Promise<SizeEntity>;
}

export class DeleteSize implements DeleteSizeUseCase {
  constructor(private readonly repository: SizeRepository) {}

  public async execute(id: number): Promise<SizeEntity> {
    return this.repository.delete(id);
  }
}
