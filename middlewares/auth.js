const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    const tokonCookie = req.cookies?.token;
    req.user = null;


    if (!tokonCookie)
        return next();

    const token = tokonCookie;
    const user = getUser(token);

    req.user = user;
    return next();
}
//authorizetion
function restrictTo(roles) {
    return function (req, res, next) {
        if (!req.user) return res.redirect("/login");

        if (!roles.includes(req.user.roles)) return res.end("UnAuthorized");

        return next();
    };
}

module.exports = { checkForAuthentication, restrictTo };