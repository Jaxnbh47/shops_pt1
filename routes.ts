import express, { Router, Request, Response } from "express";
import { Shop } from "./shop";

const shops: Shop[] = [
    { id: 1, name: "Pepper's Pizza", rating: 4.5 },
    { id: 2, name: "Clive's Chives", rating: 3.4 },
    { id: 3, name: "Betty's Brews", rating: 4.3 },
    { id: 4, name: "Sylvester's Shoes", rating: 3.8 },
    { id: 5, name: "Teddy's Tunes", rating: 4.7 }
];

export const shopRouter = Router();

shopRouter.get('/:id', async (req: Request, res: Response) : Promise<Response> => {
    const shop = shops.find((x) => x.id === Number(req.params.id));
    if (shop === undefined) {
      return res.status(404).send({ "error": `Shop not found: ${req.params.id}` });
    }
    return res.status(200).json(shop);
  });


shopRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
      if (req.query.minRating !== undefined) {
        console.log(req.query.minRating)
        let underArray = shops.filter((x) => x.rating >= Number(req.query.minRating));
      return res.status(200).json(underArray);
      } else {
      return res.status(200).send(shops);
      }
  });
