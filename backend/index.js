const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const { user } = require('./models/User')
const { tweet } = require('./models/Tweets');

const app = express();

app.use(express.json())
app.use(cors());

app.use("/api", authRoutes)
app.get('/', (req, res) => {
    res.send('<h2>This is from index.js file</h2>');
})
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('DB connected'))

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
});