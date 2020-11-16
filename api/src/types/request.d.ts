import {Request} from "express";
export default interface RequestCustom extends Request {
    userId?: number;
    isLogged: boolean;
}
