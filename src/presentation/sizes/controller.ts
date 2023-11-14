import { Request, Response } from 'express';
import {
  SizeRepository,
  CreateSize,
  CreateSizeDto,
  DeleteSize,
  GetSize,
  GetSizes,
  UpdateSize,
  UpdateSizeDto,
} from '../../domain';

export class SizeController {
  constructor(private readonly sizeRepository: SizeRepository) {}

  public getSizes = (req: Request, res: Response) => {
    new GetSizes(this.sizeRepository)
      .execute()
      .then((sizes) => res.json(sizes))
      .catch((error) => res.status(400).json({ error }));
  };

  public getSize = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'id must be a number' });
      return;
    }

    new GetSize(this.sizeRepository)
      .execute(id)
      .then((size) => res.json(size))
      .catch((error) => res.status(400).json({ error }));
  };

  public createSize = (req: Request, res: Response) => {
    const [error, createSizeDto] = CreateSizeDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateSize(this.sizeRepository)
      .execute(createSizeDto!)
      .then((size) => res.json(size))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateSize = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const [error, updateSizeDto] = UpdateSizeDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    new UpdateSize(this.sizeRepository)
      .execute(id, updateSizeDto!)
      .then((size) => res.json(size))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteSize = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new DeleteSize(this.sizeRepository)
      .execute(id)
      .then((size) => res.json(size))
      .catch((error) => res.status(400).json({ error }));
  };
}
