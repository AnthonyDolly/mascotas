import { SizeEntity } from '../../entities/size.entity';
import { SizeRepository } from '../../repositories/size.repository';

export interface GetSizeUseCase {
  execute(id: number): Promise<SizeEntity>;
}

export class GetSize implements GetSizeUseCase {
  constructor(private readonly repository: SizeRepository) {}

  public async execute(id: number): Promise<SizeEntity> {
    return this.repository.findOne(id);
  }
}
