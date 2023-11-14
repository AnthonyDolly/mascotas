import { CreateCatDto, UpdateCatDto } from '../dtos';
import { CatEntity } from '../entities/cat.entity';

export abstract class CatDatasource {
  abstract create(cat: CreateCatDto): Promise<CatEntity>;
  abstract findAll(): Promise<CatEntity[]>;
  abstract findOne(id: number): Promise<CatEntity>;
  abstract update(id: number, cat: UpdateCatDto): Promise<CatEntity>;
  abstract delete(id: number): Promise<CatEntity>;
}
