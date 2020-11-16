import {Response} from "express";

export default class ApiResponse {
    static success = (
        res: Response,
        data: any,
        status: number,
        message: string
    ) => {
        res.status(status);
        res.json({
            data,
            success: true,
            message
        });
    };

    static error = (
        res: Response,
        data: any,
        status: number,
        message: string,
    ) => {
        res.status(status).json({
            message,
            data,
            success: false,
        });
    };
}
