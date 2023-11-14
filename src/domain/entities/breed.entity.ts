export enum Species {
  dog = 'dog',
  cat = 'cat',
}

export interface BreedEntityOptions {
  id: number;
  name: string;
  species: Species;
}

export class BreedEntity {
  public id: number;
  public name: string;
  public species: Species;

  constructor(options: BreedEntityOptions) {
    const { id, name, species } = options;

    this.id = id;
    this.name = name;
    this.species = species;
  }

  public static fromObject(obj: { [key: string]: any }): BreedEntity {
    const { id, name, species } = obj;

    const requiredProps: { [key: string]: any } = { id, name, species };
    for (const prop in requiredProps) {
      if (!requiredProps[prop]) `${prop} is required`;
    }

    return new BreedEntity({
      id,
      name,
      species,
    });
  }
}
