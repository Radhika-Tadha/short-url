// const sesssionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "globalia$99@$";

function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
        role: user.role,
    }, secret);
    // sesssionIdToUserMap.set(id, user);
}
function getUser(token) {
    if (!token)
        return null;
    console.log("Token from cookie:", token);

    return jwt.verify(token, secret);
}

module.exports = {
    setUser,
    getUser,
};

