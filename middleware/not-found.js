const notFoundMiddleware = (req, res) => {
    res.status(404).send('Rout does Not Exist');
};
export default notFoundMiddleware;