export class UpdateSizeDto {
  private constructor(public readonly name?: string) {}

  get Values() {
    const returnObj: { [key: string]: any } = {};

    if (this.name) returnObj.name = this.name;

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateSizeDto?] {
    let { name } = props;

    if (!name) return ['name is required', undefined];

    name = name.toLowerCase();

    return [undefined, new UpdateSizeDto(name)];
  }
}
