import { Species } from '@prisma/client';
import { prisma } from '../../data/postgres';
import {
  BreedDatasource,
  BreedEntity,
  CreateBreedDto,
  UpdateBreedDto,
} from '../../domain';

const speciesEnum = {
  cat: Species.CAT,
  dog: Species.DOG,
};

export class BreedDatasourceImpl extends BreedDatasource {
  async create(createBreedDto: CreateBreedDto): Promise<BreedEntity> {
    const species =
      speciesEnum[createBreedDto.species as keyof typeof speciesEnum];

    try {
      const newBreed = await prisma.breed.create({
        data: {
          ...createBreedDto,
          species,
        },
      });

      return BreedEntity.fromObject(newBreed);
    } catch (error) {
      if (!species) {
        throw `Species ${createBreedDto.species} is not valid`;
      } else {
        throw `Breed with name ${createBreedDto.name} already exists`;
      }
    }
  }

  async findAll(): Promise<BreedEntity[]> {
    const breeds = await prisma.breed.findMany();

    return breeds.map((breed) => BreedEntity.fromObject(breed));
  }

  async findOne(id: number): Promise<BreedEntity> {
    const breed = await prisma.breed.findUnique({
      where: {
        id,
      },
    });

    if (!breed) throw `Breed with id ${id} not found`;

    return BreedEntity.fromObject(breed);
  }

  async update(
    id: number,
    updateBreedDto: UpdateBreedDto
  ): Promise<BreedEntity> {
    await this.findOne(id);

    const species =
      speciesEnum[updateBreedDto.species as keyof typeof speciesEnum];

    try {
      const updatedBreed = await prisma.breed.update({
        where: {
          id,
        },
        data: {
          ...updateBreedDto.Values,
          species,
        },
      });

      return BreedEntity.fromObject(updatedBreed);
    } catch (error) {
      if (!species) {
        throw `Species ${updateBreedDto.species} is not valid`;
      } else {
        throw `Breed with name ${updateBreedDto.name} already exists`;
      }
    }
  }

  async delete(id: number): Promise<BreedEntity> {
    await this.findOne(id);

    const deletedBreed = await prisma.breed.delete({
      where: {
        id,
      },
    });

    return BreedEntity.fromObject(deletedBreed);
  }
}
