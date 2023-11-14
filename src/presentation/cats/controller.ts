import { Request, Response } from 'express';
import {
  CatRepository,
  CreateCat,
  CreateCatDto,
  DeleteCat,
  GetCat,
  GetCats,
  UpdateCat,
  UpdateCatDto,
} from '../../domain';

export class CatController {
  constructor(private readonly catRepository: CatRepository) {}

  public getCats = (req: Request, res: Response) => {
    new GetCats(this.catRepository)
      .execute()
      .then((cats) => res.json(cats))
      .catch((error) => res.status(400).json({ error }));
  };

  public getCat = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      res.status(400).json({ error: 'id must be a number' });
      return;
    }

    new GetCat(this.catRepository)
      .execute(id)
      .then((cat) => res.json(cat))
      .catch((error) => res.status(400).json({ error }));
  };

  public createCat = (req: Request, res: Response) => {
    const [error, createCatDto] = CreateCatDto.create(req.body);

    if (error) return res.status(400).json({ error });

    new CreateCat(this.catRepository)
      .execute(createCatDto!)
      .then((cat) => res.json(cat))
      .catch((error) => res.status(400).json({ error }));
  };

  public updateCat = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const [error, updateCatDto] = UpdateCatDto.create({
      ...req.body,
    });

    if (error) return res.status(400).json({ error });

    new UpdateCat(this.catRepository)
      .execute(id, updateCatDto!)
      .then((cat) => res.json(cat))
      .catch((error) => res.status(400).json({ error }));
  };

  public deleteCat = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    new DeleteCat(this.catRepository)
      .execute(id)
      .then((cat) => res.json(cat))
      .catch((error) => res.status(400).json({ error }));
  };
}
