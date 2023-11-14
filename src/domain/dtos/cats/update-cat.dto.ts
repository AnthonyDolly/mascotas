export class UpdateCatDto {
  private constructor(
    public readonly breedId?: number,
    public readonly sizeId?: number,
    public readonly color?: string,
    public readonly personality?: string,
    public readonly photo?: string
  ) {}

  get Values() {
    const returnObj: { [key: string]: any } = {};

    const fields = ['breedId', 'sizeId', 'color', 'personality', 'photo'];

    for (const field of fields) {
      if (field in this && this[field as keyof this]) {
        returnObj[field] = this[field as keyof this];
      }
    }

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateCatDto?] {
    const { breedId, sizeId, color, personality, photo } = props;

    if (!breedId && !sizeId && !color && !personality && !photo) {
      return ['At least one field is required', undefined];
    }

    return [
      undefined,
      new UpdateCatDto(breedId, sizeId, color, personality, photo),
    ];
  }
}
