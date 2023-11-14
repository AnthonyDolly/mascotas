export class CreateBreedDto {
  private constructor(
    public readonly name: string,
    public readonly species: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateBreedDto?] {
    props.species = props.species.toLowerCase();
    const { name, species } = props;

    if (!name) return ['name is required', undefined];
    if (!species) return ['species is required', undefined];

    return [undefined, new CreateBreedDto(name, species)];
  }
}
