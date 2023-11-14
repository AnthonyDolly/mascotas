export class UpdateBreedDto {
  private constructor(
    public readonly name?: string,
    public readonly species?: string
  ) {}

  get Values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;
    if (this.species) returnObj.species = this.species;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateBreedDto?] {
    const { name, species } = props;

    if (!name && !species) return ['name or species is required', undefined];

    return [undefined, new UpdateBreedDto(name, species)];
  }
}
