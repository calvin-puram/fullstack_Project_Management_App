const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const projectRoute = require('./routes/project');
const globalError = require('./controller/globalError');

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('tiny'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(fileUpload());

app.use('/api/v1/users', usersRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/projects', projectRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'public')));

  app.get(/.*/, (req, res, next) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
  );
}

app.use(globalError);

module.exports = app;
