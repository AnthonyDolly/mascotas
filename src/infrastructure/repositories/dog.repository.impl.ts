import {
  DogDatasource,
  DogEntity,
  DogRepository,
  CreateDogDto,
  UpdateDogDto,
} from '../../domain';

export class DogRepositoryImpl implements DogRepository {
  constructor(private readonly datasource: DogDatasource) {}

  create(createDogDto: CreateDogDto): Promise<DogEntity> {
    return this.datasource.create(createDogDto);
  }

  findAll(): Promise<DogEntity[]> {
    return this.datasource.findAll();
  }

  findOne(id: number): Promise<DogEntity> {
    return this.datasource.findOne(id);
  }

  update(id: number, dog: UpdateDogDto): Promise<DogEntity> {
    return this.datasource.update(id, dog);
  }

  delete(id: number): Promise<DogEntity> {
    return this.datasource.delete(id);
  }

  uploadDogsFromFile(file: Express.Multer.File): Promise<string> {
    return this.datasource.uploadDogsFromFile(file);
  }

  getDogImage(id: number): Promise<string> {
    return this.datasource.getDogImage(id);
  }
}
