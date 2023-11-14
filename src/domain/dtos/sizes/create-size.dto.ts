export class CreateSizeDto {
  private constructor(public readonly name: string) {}

  static create(props: { [key: string]: any }): [string?, CreateSizeDto?] {
    let { name } = props;

    if (!name) return ['name is required', undefined];

    name = name.toLowerCase();

    return [undefined, new CreateSizeDto(name)];
  }
}
