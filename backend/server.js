require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require('./routes');

const PORT = process.env.PORT || 5000;

// config express app
const app = express();
app.use(express.json());
app.use(cors());
mongoose.set('strictQuery', true);

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(api => {
    app.use(api.path, api.route);
});

// connect to database
const connectUrl = `mongodb://localhost:27017`;
const connectDB = async () => {
    try {
        await mongoose.connect(connectUrl, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false,
        });
        console.log("connect database successfully");
    } catch (error) {
        console.log("connect database error " + error);
        process.exit(1);
    }
};
connectDB();

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
