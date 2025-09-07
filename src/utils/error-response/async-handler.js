function asyncHandler(handler) {
    return async (req, res, next) => {
        Promise
            .resolve(handler(req, res))
            .catch((error) =>{
                next(error)
            });
    };
}

export default asyncHandler;
