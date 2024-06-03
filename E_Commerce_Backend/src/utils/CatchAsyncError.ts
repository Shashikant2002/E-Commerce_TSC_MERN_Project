import { NextFunction, Request, Response } from "express";
import { ControllerType } from "../types/CommonTypes.js";

export default (theFunc: ControllerType) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };
