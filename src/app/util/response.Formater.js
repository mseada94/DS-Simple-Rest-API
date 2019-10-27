import { BAD_REQUEST, UNAUTHORIZED, NOT_FOUND, SERVER_ERROR } from '../util/errors';

export default function responseFormater(req, res, next)  {
    if(res.locals.data){
        // Formate for good results
        res.status(res.locals.status);
        res.json(res.locals.data);
    }else if(res.locals.error){
        // Error
        let status,msg;

        switch (res.locals.error.type) {
            case BAD_REQUEST:
                status = 400;
                msg = res.locals.error.msg;
                break;
            case UNAUTHORIZED:
                status = 401;
                msg = res.locals.error.msg;
                break;
            case NOT_FOUND:
                status = 404;
                msg = res.locals.error.msg;
                break;
            case SERVER_ERROR:
                status = 500;
                msg = res.locals.error.msg;
                break;
            default:
                status = 500;
                msg = 'Internal Server Error';
        }
        
        const errorResponse = {
            code: status,
            timeStamp: new Date().toLocaleString(),
            path: req.url,
            method: req.method,
            message:msg,
        };
        res.status(status);
        res.json(errorResponse);
    }

    next();
}
