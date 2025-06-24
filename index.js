const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const URL = require('./models/url');
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");
// const { connectToMongo } = require("./conn");

const staticRouter = require("./routes/staticRouter");
const urlRoute = require('./routes/url');
const userRoute = require('./routes/user');

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.set("views", path.resolve("./views"));

app.use(express.json());          // Enable JSON parsing
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // ✅ Correct — you must CALL the function

app.use('/url', restrictToLoggedinUserOnly, urlRoute);        // Mount /url routes
app.use('/user', userRoute);
app.use('/', checkAuth, staticRouter);

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await require('./models/url')
            .findOneAndUpdate(
                {
                    shortId,
                },
                {
                    $push: {
                        visitHistory: {
                            timestamp: Date.now(),
                        },
                    },
                },
                { new: true }
            );
        if (!entry) return res.status(404).send('Short URL not found');
        return res.redirect(entry.redirectURL);
    } catch (err) {
        console.error('Redirect error:', err);
        return res.status(500).send('Internal Server Error');
    }
});

async function start() {
    try {
        await mongoose.connect('mongodb+srv://rat:rat99@cluster0.bpmez1o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log('Connected to MongoDB');

        app.listen(PORT, () =>
            console.log(`Server running: http://localhost:${PORT}`)
        );
    } catch (err) {
        console.error('DB connection error:', err);
    }
}

start();
