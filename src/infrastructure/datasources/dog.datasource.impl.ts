import { prisma } from '../../data/postgres';
import {
  DogDatasource,
  DogEntity,
  CreateDogDto,
  UpdateDogDto,
} from '../../domain';
import xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

export class DogDatasourceImpl extends DogDatasource {
  async create(createDogDto: CreateDogDto): Promise<DogEntity> {
    try {
      const newDog = await prisma.dog.create({
        data: {
          ...createDogDto,
          photo: createDogDto.file,
        },
      });

      return DogEntity.fromObject(newDog);
    } catch (error) {
      throw `Breed with id ${createDogDto.breedId} or size with id ${createDogDto.sizeId} not found`;
    }
  }

  async findAll(): Promise<DogEntity[]> {
    const dogs = await prisma.dog.findMany({
      include: { breed: true, size: true },
    });

    return dogs.map(({ photo, ...dogs }) => DogEntity.fromObject(dogs));
  }

  async findOne(id: number): Promise<DogEntity> {
    const dog = await prisma.dog.findUnique({
      where: {
        id,
      },
      include: { breed: true, size: true },
    });

    if (!dog) throw `Dog with id ${id} not found`;

    return DogEntity.fromObject(dog);
  }

  async update(id: number, updateDogDto: UpdateDogDto): Promise<DogEntity> {
    const dog = await this.findOne(id);

    if (dog.photo && updateDogDto.file) {
      const imagePath = path.join(__dirname, `../../../uploads/${dog.photo}`);
      fs.unlinkSync(imagePath);
    }

    try {
      const updatedDog = await prisma.dog.update({
        where: {
          id,
        },
        data: {
          ...updateDogDto.values,
          photo: updateDogDto.file,
        },
        include: { breed: true, size: true },
      });

      return DogEntity.fromObject(updatedDog);
    } catch (error) {
      console.log(error);
      const breedIdMessage = updateDogDto.breedId
        ? `Breed with id ${updateDogDto.breedId}`
        : '';
      const sizeIdMessage = updateDogDto.sizeId
        ? `Size with id ${updateDogDto.sizeId}`
        : '';

      if (breedIdMessage || sizeIdMessage) {
        throw `${breedIdMessage}${
          breedIdMessage && sizeIdMessage ? ' or ' : ''
        }${sizeIdMessage} not found`;
      }

      throw error;
    }
  }

  async delete(id: number): Promise<DogEntity> {
    await this.findOne(id);

    const deletedDog = await prisma.dog.delete({
      where: {
        id,
      },
    });

    return DogEntity.fromObject(deletedDog);
  }

  async uploadDogsFromFile(file: Express.Multer.File): Promise<string> {
    const breeds = await prisma.breed.findMany();
    const sizes = await prisma.size.findMany();

    const workbook = xlsx.readFile(file.path);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const dogs = xlsx.utils.sheet_to_json(sheet);

    try {
      const dogsToCreate = dogs.map((dog: any) => {
        const breed = breeds.find((breed) => breed.name === dog.breed);
        const size = sizes.find((size) => size.name === dog.size.toUpperCase());

        if (!breed) throw `Breed ${dog.breed} not found`;
        if (!size) throw `Size ${dog.size} not found`;

        return {
          breedId: breed.id,
          sizeId: size.id,
          color: dog.color,
          personality: dog.personality,
          photo: '',
        };
      });

      const createdDogs = await prisma.dog.createMany({
        data: dogsToCreate,
      });

      return `${createdDogs.count} dogs created`;
    } catch (error) {
      throw error;
    }
  }

  async getDogImage(id: number): Promise<string> {
    const dog = await this.findOne(id);

    if (!dog.photo) throw `Dog image not found`;

    const imagePath = path.join(__dirname, `../../../uploads/${dog.photo}`);

    return imagePath;
  }
}
