import { Size } from '@prisma/client';
import { prisma } from '../../data/postgres';
import {
  SizeDatasource,
  SizeEntity,
  CreateSizeDto,
  UpdateSizeDto,
} from '../../domain';

const sizesEnum = {
  small: Size.SMALL,
  medium: Size.MEDIUM,
  large: Size.LARGE,
};

export class SizeDatasourceImpl extends SizeDatasource {
  async create(createSizeDto: CreateSizeDto): Promise<SizeEntity> {
    const sizes = sizesEnum[createSizeDto.name as keyof typeof sizesEnum];

    try {
      const newSize = await prisma.size.create({
        data: {
          name: sizes,
        },
      });

      return SizeEntity.fromObject(newSize);
    } catch (error) {
      if (!sizes) {
        throw `name ${createSizeDto.name} is not valid`;
      } else {
        throw `Size with name ${createSizeDto.name} already exists`;
      }
    }
  }

  async findAll(): Promise<SizeEntity[]> {
    const sizes = await prisma.size.findMany();

    return sizes.map((size) => SizeEntity.fromObject(size));
  }

  async findOne(id: number): Promise<SizeEntity> {
    const size = await prisma.size.findUnique({
      where: {
        id,
      },
    });

    if (!size) throw `Size with id ${id} not found`;

    return SizeEntity.fromObject(size);
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<SizeEntity> {
    await this.findOne(id);

    const sizes = sizesEnum[updateSizeDto.name as keyof typeof sizesEnum];

    try {
      const updatedSize = await prisma.size.update({
        where: {
          id,
        },
        data: {
          name: sizes,
        },
      });

      return SizeEntity.fromObject(updatedSize);
    } catch (error) {
      if (!sizes) {
        throw `Size ${sizes} is not valid`;
      } else {
        throw `Size with name ${sizes} already exists`;
      }
    }
  }

  async delete(id: number): Promise<SizeEntity> {
    await this.findOne(id);

    const deletedSize = await prisma.size.delete({
      where: {
        id,
      },
    });

    return SizeEntity.fromObject(deletedSize);
  }
}
