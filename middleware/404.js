export const notFound = (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 400;
    return next(error)
}