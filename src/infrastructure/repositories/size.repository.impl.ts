import {
  SizeDatasource,
  SizeEntity,
  SizeRepository,
  CreateSizeDto,
  UpdateSizeDto,
} from '../../domain';

export class SizeRepositoryImpl implements SizeRepository {
  constructor(private readonly datasource: SizeDatasource) {}

  create(createSizeDto: CreateSizeDto): Promise<SizeEntity> {
    return this.datasource.create(createSizeDto);
  }

  findAll(): Promise<SizeEntity[]> {
    return this.datasource.findAll();
  }

  findOne(id: number): Promise<SizeEntity> {
    return this.datasource.findOne(id);
  }

  update(id: number, size: UpdateSizeDto): Promise<SizeEntity> {
    return this.datasource.update(id, size);
  }

  delete(id: number): Promise<SizeEntity> {
    return this.datasource.delete(id);
  }
}
