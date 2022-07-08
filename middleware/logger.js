const logger = (req, res, next) => {
    console.log('Request Passing through MIDDLEWARE');
    next();
}

module.exports = logger;