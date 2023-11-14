import { CreateDogDto, UpdateDogDto } from '../dtos';
import { DogEntity } from '../entities/dog.entity';

export abstract class DogDatasource {
  abstract create(dog: CreateDogDto): Promise<DogEntity>;
  abstract findAll(): Promise<DogEntity[]>;
  abstract findOne(id: number): Promise<DogEntity>;
  abstract update(id: number, dog: UpdateDogDto): Promise<DogEntity>;
  abstract delete(id: number): Promise<DogEntity>;
  abstract uploadDogsFromFile(file: Express.Multer.File): Promise<string>;
  abstract getDogImage(id: number): Promise<string>;
}
