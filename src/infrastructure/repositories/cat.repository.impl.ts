import {
  CatDatasource,
  CatEntity,
  CatRepository,
  CreateCatDto,
  UpdateCatDto,
} from '../../domain';

export class CatRepositoryImpl implements CatRepository {
  constructor(private readonly datasource: CatDatasource) {}

  create(createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.datasource.create(createCatDto);
  }

  findAll(): Promise<CatEntity[]> {
    return this.datasource.findAll();
  }

  findOne(id: number): Promise<CatEntity> {
    return this.datasource.findOne(id);
  }

  update(id: number, cat: UpdateCatDto): Promise<CatEntity> {
    return this.datasource.update(id, cat);
  }

  delete(id: number): Promise<CatEntity> {
    return this.datasource.delete(id);
  }
}
