import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        throw new UnauthenticatedError('Authentication invalid!!!');
    };
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const testUser = payload.userId === '64c7563ebc90f3c5de2f4a4e';
        req.user = { userId: payload.userId, testUser };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
};
export default auth;