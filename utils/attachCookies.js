
const attachCookie = ({ res, token }) => {
    // create cookie
    const oneDay = 1000 * 24 * 60 * 60;
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
    });
};
export default attachCookie;