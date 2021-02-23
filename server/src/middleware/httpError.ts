import { Request, Response, NextFunction } from 'express'


class HttpException extends Error {
    status: number;
    message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }
}



class HttpErrorMiddleware {
    defaultError = ( error: HttpException, req:Request, res: Response, next: NextFunction) => {
        const status = error.status || 500
        const message = error.message || 'Something went wrong';

        res
        .status(status)
        .json({
            error: status,
            message,
        })
    }

    error404 = (req:Request, res:Response, next:NextFunction) => {
        res.status(404).json({
            error: 404,
            message: "Oops! We don't have what we you were looking for."
        })
    }
}

export default HttpErrorMiddleware;