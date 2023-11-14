import { CreateSizeDto } from '../../dtos';
import { SizeEntity } from '../../entities/size.entity';
import { SizeRepository } from '../../repositories/size.repository';

export interface CreateSizeUseCase {
  execute(dto: CreateSizeDto): Promise<SizeEntity>;
}

export class CreateSize implements CreateSizeUseCase {
  constructor(private readonly repository: SizeRepository) {}

  public async execute(dto: CreateSizeDto): Promise<SizeEntity> {
    return this.repository.create(dto);
  }
}
