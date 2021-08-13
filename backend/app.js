const express = require('express');
const stuffRoutes = require('./routes/stuff');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo-db:27017/kaan', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(process.cwd()+"/frontend/dist/Angular12Crud/"));
app.use('/', stuffRoutes);
app.get('/', (req,res) => {
    res.sendFile(process.cwd()+"/frontend/dist/Angular12Crud/index.html")
  });

module.exports = app;
