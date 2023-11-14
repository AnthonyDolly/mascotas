import { UpdateSizeDto } from '../../dtos';
import { SizeEntity } from '../../entities/size.entity';
import { SizeRepository } from '../../repositories/size.repository';

export interface UpdateSizeUseCase {
  execute(id: number, dto: UpdateSizeDto): Promise<SizeEntity>;
}

export class UpdateSize implements UpdateSizeUseCase {
  constructor(private readonly repository: SizeRepository) {}

  public async execute(id: number, dto: UpdateSizeDto): Promise<SizeEntity> {
    return this.repository.update(id, dto);
  }
}
