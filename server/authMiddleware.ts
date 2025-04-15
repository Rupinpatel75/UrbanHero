import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123123";

export interface AuthRequest extends Request{
    user? : {
        userId: string
    };
}

export const authenticateUser = (req: AuthRequest, res:Response, next:NextFunction) => {
        console.log(req.header);
        const token = req.header("Authorization")?.split(" ")[1];
        console.log(token,"debug");
    if(!token) {
        return res.status(401).json({
            message: "Access Denied, No token provided"
        })
    }

    try{
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { userId: decoded.userId };
        next();
    } catch(error) {
        return res.status(401).json({
            message:"invalid token"
        });
    }
}