export class UpdateDogDto {
  private constructor(
    public readonly breedId?: number,
    public readonly sizeId?: number,
    public readonly color?: string,
    public readonly personality?: string,
    public readonly file?: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};

    const fields = ['breedId', 'sizeId', 'color', 'personality', 'photo'];

    for (const field of fields) {
      if (field in this && this[field as keyof this]) {
        returnObj[field] = this[field as keyof this];
      }
    }

    return returnObj;
  }

  static create(props: { [key: string]: any }): [string?, UpdateDogDto?] {
    let { breedId, sizeId, color, personality, file } = props;

    if (
      (breedId && isNaN(Number(breedId))) ||
      (sizeId && isNaN(Number(sizeId)))
    ) {
      return ['breedId and sizeId must be numbers', undefined];
    }

    breedId = Number(breedId);
    sizeId = Number(sizeId);

    if (!breedId && !sizeId && !color && !personality && !file) {
      return ['At least one field is required', undefined];
    }

    return [
      undefined,
      new UpdateDogDto(breedId, sizeId, color, personality, file),
    ];
  }
}
