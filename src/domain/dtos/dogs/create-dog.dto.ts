export class CreateDogDto {
  private constructor(
    public readonly breedId: number,
    public readonly sizeId: number,
    public readonly color: string,
    public readonly personality: string,
    public readonly file: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateDogDto?] {
    const requiredFields = [
      'breedId',
      'sizeId',
      'color',
      'personality',
      'file',
    ];

    for (const field of requiredFields) {
      if (!props[field]) {
        return [`${field} is required`, undefined];
      }
    }

    let { breedId, sizeId, color, personality, file } = props;

    if (isNaN(Number(breedId)) || isNaN(Number(sizeId))) {
      return ['breedId and sizeId must be numbers', undefined];
    }

    breedId = Number(breedId);
    sizeId = Number(sizeId);

    return [
      undefined,
      new CreateDogDto(breedId, sizeId, color, personality, file),
    ];
  }
}
