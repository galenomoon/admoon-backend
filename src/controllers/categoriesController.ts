import { Request, Response } from "express";
import CategoryUseCase from "../useCases/categoryUseCase";

const categoryUseCase = new CategoryUseCase();

export default class CategoryController {
  async getAll(req: Request, res: Response) {
    const { websiteId } = req.params;
    const { slug, sortBy } = req.query;
    const categories = await categoryUseCase.getAll(
      Number(websiteId),
      slug as undefined,
      sortBy as undefined
    );
    return res.status(200).json(categories);
  }

  async getById(req: Request, res: Response) {
    const { websiteId, id } = req.params;
    const category = await categoryUseCase.getById(
      Number(websiteId),
      Number(id)
    );
    return res.status(200).json(category);
  }

  async create(req: Request, res: Response) {
    const { name } = req.body;
    const { websiteId } = req.params;
    const newCategory = await categoryUseCase.create(Number(websiteId), {
      name,
    });
    return res.status(201).json(newCategory);
  }

  async update(req: Request, res: Response) {
    const { id, websiteId } = req.params;
    const { name } = req.body;
    const category = await categoryUseCase.update(
      Number(websiteId),
      Number(id),
      { name }
    );
    return res.status(200).json(category);
  }

  async delete(req: Request, res: Response) {
    const { id, websiteId } = req.params;
    const categories = await categoryUseCase.delete(
      Number(websiteId),
      Number(id)
    );
    return res.status(200).json(categories);
  }
}
