export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export class SizeEntity {
  constructor(public id: number, public name: Size) {}

  public static fromObject(obj: { [key: string]: any }): SizeEntity {
    const { id, name } = obj;

    const requiredProps: { [key: string]: any } = { id, name };
    for (const prop in requiredProps) {
      if (!requiredProps[prop]) `${prop} is required`;
    }

    return new SizeEntity(id, name);
  }
}
