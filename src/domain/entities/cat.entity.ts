import { BreedEntity } from './breed.entity';
import { SizeEntity } from './size.entity';

export class CatEntity {
  constructor(
    public id: number,
    public breed: BreedEntity,
    public size: SizeEntity,
    public color: string,
    public personality: string,
    public photo: string
  ) {}

  public static fromObject(obj: { [key: string]: any }): CatEntity {
    const { id, breed, size, color, personality, photo } = obj;

    const requiredProps: { [key: string]: any } = {
      id,
      breed,
      size,
      color,
      personality,
      photo,
    };
    for (const prop in requiredProps) {
      if (!requiredProps[prop]) `${prop} is required`;
    }

    return new CatEntity(id, breed, size, color, personality, photo);
  }
}
