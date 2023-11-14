import { prisma } from '../../data/postgres';
import {
  CatDatasource,
  CatEntity,
  CreateCatDto,
  UpdateCatDto,
} from '../../domain';

export class CatDatasourceImpl extends CatDatasource {
  async create(createCatDto: CreateCatDto): Promise<CatEntity> {
    try {
      const newCat = await prisma.cat.create({
        data: createCatDto,
        include: { breed: true, size: true },
      });

      return CatEntity.fromObject(newCat);
    } catch (error) {
      throw `Breed with id ${createCatDto.breedId} or size with id ${createCatDto.sizeId} not found`;
    }
  }

  async findAll(): Promise<CatEntity[]> {
    const cats = await prisma.cat.findMany({
      include: { breed: true, size: true },
    });

    return cats.map((cat) => CatEntity.fromObject(cat));
  }

  async findOne(id: number): Promise<CatEntity> {
    const cat = await prisma.cat.findUnique({
      where: {
        id,
      },
      include: { breed: true, size: true },
    });

    if (!cat) throw `Cat with id ${id} not found`;

    return CatEntity.fromObject(cat);
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<CatEntity> {
    await this.findOne(id);

    try {
      const updatedCat = await prisma.cat.update({
        where: {
          id,
        },
        data: updateCatDto,
        include: { breed: true, size: true },
      });

      return CatEntity.fromObject(updatedCat);
    } catch (error) {
      throw `Breed with id ${updateCatDto.breedId} or size with id ${updateCatDto.sizeId} not found`;
    }
  }

  async delete(id: number): Promise<CatEntity> {
    await this.findOne(id);

    const deletedCat = await prisma.cat.delete({
      where: {
        id,
      },
    });

    return CatEntity.fromObject(deletedCat);
  }
}
