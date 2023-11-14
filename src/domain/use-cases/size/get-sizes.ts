import { SizeEntity } from '../../entities/size.entity';
import { SizeRepository } from '../../repositories/size.repository';

export interface GetSizesUseCase {
  execute(): Promise<SizeEntity[]>;
}

export class GetSizes implements GetSizesUseCase {
  constructor(private readonly repository: SizeRepository) {}

  public async execute(): Promise<SizeEntity[]> {
    return this.repository.findAll();
  }
}
