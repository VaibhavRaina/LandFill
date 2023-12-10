module.exports = function func(handler) {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    }
}
