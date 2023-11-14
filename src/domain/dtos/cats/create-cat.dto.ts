export class CreateCatDto {
  private constructor(
    public readonly breedId: number,
    public readonly sizeId: number,
    public readonly color: string,
    public readonly personality: string,
    public readonly photo: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateCatDto?] {
    const requiredFields = [
      'breedId',
      'sizeId',
      'color',
      'personality',
      'photo',
    ];

    for (const field of requiredFields) {
      if (!props[field]) {
        return [`${field} is required`, undefined];
      }
    }

    const { breedId, sizeId, color, personality, photo } = props;

    return [
      undefined,
      new CreateCatDto(breedId, sizeId, color, personality, photo),
    ];
  }
}
