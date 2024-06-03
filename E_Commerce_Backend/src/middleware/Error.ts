import { Request, Response, NextFunction } from "express";
import ErrorHandeler from "../utils/ErrorHandaler.js";

type ErrorType = {
  statusCode: number;
  message: string;
};

export default (
  err: ErrorType,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


  


  //Wrong Mongo DB Error
  // @ts-ignore
  if (err.name === "CastError") {
    // @ts-ignore
    const message = `Resource not Found. Invalid ${err.path}`;
    err = new ErrorHandeler(message, 400);
  }

  // Mongoose Duplicate key error
  // @ts-ignore
  if (err.code === 11000) {
    const message = `Duplicate Id Entered`;
    err = new ErrorHandeler(message, 400);
  }

  //Wrong jwt token Error
  // @ts-ignore
  if (err.name === "jsonWebTokenError") {
    const message = `json web token is invalid try again`;
    err = new ErrorHandeler(message, 400);
  }

  //jwt Expire Error
  // @ts-ignore
  if (err.name === "tokenExpireError") {
    const message = `Json Web Token is expired`;
    err = new ErrorHandeler(message, 400);
  }
  


  console.log("Error =>>>>>>>>", err.message);

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
