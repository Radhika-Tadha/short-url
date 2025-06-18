const { default: mongoose } = require('mongoose');
mongoose.set("strictQuery",true);

async function connectToMongo(url) {
    return mongoose.connect(url);
}
module.exports = {connectToMongo};
// 9-10-11-12-1-2-3-4-5-6
