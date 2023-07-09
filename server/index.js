const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.js');
const postRouter = require('./routes/post.js');
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@lern-mern.sakad8r.mongodb.net/?retryWrites=true&w=majority`, {
            // useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify: false
        });
        console.log('Connected DB......');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server is running");
})


app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter)

