import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export interface IRequest extends Request {
  profile?: any;
  auth?: any;
}

const jwtSecret = process.env.JWT_SECRET || "default_secret_is_here";
class AuthController {
  signin = async (req: Request, res: Response) => {
    try {
      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(401).json({ error: "User not found" });

      if (!user.authenticate(req.body.password)) {
        return res
          .status(401)
          .send({ error: "Email and password don't match." });
      }

      const token = jwt.sign({ _id: user._id }, jwtSecret);

      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 5);
      res.cookie("t", token, { expires: expirationDate });

      return res.json({
        token,
        user: { _id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      return res.status(401).json({ error: "Could not sign in" });
    }
  };

  signout = (req: Request, res: Response) => {
    res.clearCookie("t");
    return res.status(200).json({
      message: "signed out",
    });
  };

  requireSignin = (req: IRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const decoded = jwt.verify(token, jwtSecret) as any;
    req.auth = decoded;
    req.profile = decoded;
    next();
  };

  decode = (req: IRequest, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, jwtSecret) as any;
      req.auth = decoded;
    }
    next();
  };

  hasAuthorization = (req: IRequest, res: Response, next: NextFunction) => {
    const authorized =
      req.profile && req.auth && req.profile._id == req.auth._id;
    if (!authorized) {
      return res.status(403).json({
        error: "User is not authorized to perform this action",
      });
    }
    next();
  };
}

export default AuthController;
