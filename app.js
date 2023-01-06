const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const adsRouter = require('./routes/api/ads');
const usersRouter = require('./routes/api/users');
const petsRouter = require('./routes/api/pets');
const newsRouter = require('./routes/api/news');
const oursFriendsRouter = require('./routes/api/oursFriends');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/api/ads', adsRouter);
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/news', newsRouter);
app.use('/api/ours_friends', oursFriendsRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
