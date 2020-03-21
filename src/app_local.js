const express = require('express');
const path = require('path');
const i18n = require('i18n');
const session = require('express-session');
const index_router = require('./routes/index');
const api_router = require('./routes/api');
const {auth: auth} = require('@nextds/nextlogin/lib/backend');
const webpack_config = require('../webpack.config.local');

global.__basepath = path.join(__dirname, '../');
global.NODE_ENV = process.env.NODE_ENV;

const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const compiler = webpack(webpack_config);

const app = express();

app.use(
    middleware(compiler, {
        logLevel: 'warn', publicPath: webpack_config.output.publicPath
    })
);
app.use(require("webpack-hot-middleware")(compiler));

// i18n setup
i18n.configure({
    defaultLocale: 'en',
    locales: ['en', 'de'],
    directory: path.join(__dirname, '../locales'),
    cookie: 'lang',
    queryParameter: 'lang',
    register: global,
    updateFiles: false
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    maxAge: (60 * 1000 * 60 * 24)
}));
app.use(i18n.init);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', api_router);
app.use('*', index_router);
app.use('/auth', auth);

// pass globals to frontend
app.locals.debug = process.env.DEBUG;
app.locals.node_env = process.env.NODE_ENV;

module.exports = app;
