import { CreateSizeDto, UpdateSizeDto } from '../dtos';
import { SizeEntity } from '../entities/size.entity';

export abstract class SizeDatasource {
  abstract create(size: CreateSizeDto): Promise<SizeEntity>;
  abstract findAll(): Promise<SizeEntity[]>;
  abstract findOne(id: number): Promise<SizeEntity>;
  abstract update(id: number, size: UpdateSizeDto): Promise<SizeEntity>;
  abstract delete(id: number): Promise<SizeEntity>;
}
