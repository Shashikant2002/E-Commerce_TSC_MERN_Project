import { Response } from "express";
import { UserModalType } from "../types/ModalTypes.js";

const GetUserJWTToken = async (
  user: UserModalType,
  statusCode: number,
  res: Response
) => {
  const token = await user.getJWTToken();

  const expireTime: number = Number(process.env.USER_COOKIE_EXPIRE);
  console.log(expireTime);
  
  const option: {
    // maxAge?: Date;
    // sameSite?: string;
    // secure?: boolean;
    // crossDomain?: boolean;
  } = {
    maxAge: new Date(new Date(Date.now() + expireTime * 1000 * 60)),
    sameSite: "none",
    secure: true,
    crossDomain: true,
  };

  res.cookie("JWT_USER_TOKEN", token, option);
  res.status(statusCode).json({
    success: true,
    message: "Login Successfull !!",
    user,
    token,
  });
};

export default GetUserJWTToken;
