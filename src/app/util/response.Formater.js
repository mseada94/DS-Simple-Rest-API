module.exports = function responseFormater(req, res, next)  {
    if(res.locals.data){
        // Formate for good results
        res.status(res.locals.status);
        res.json(res.locals.data);
        next();
    }else{
        // Error
        let status,msg;
        if(!res.locals.error){
            status = 404;
            msg = 'Not Found';
        }else{
            // TODO: Define Error classes holding a suitable status code and message
            status = 400;
            msg = res.locals.error;
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
        next();
    }

}
