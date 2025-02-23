import express from "express";
import 'dotenv/config';
import expressLayouts from 'express-ejs-layouts';
import indexRoutes from "./server/routes/index.js";
import dashboardRoutes from './server/routes/dashboard.js';
import connectDB from "./server/config/db.js";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import authRoutes from './server/routes/auth.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    }),
    // cookie: { maxAge: new Date ( Date.now() + (3600000) ) }
    // Date.now() - 30 * 24 * 60 * 60 * 1000
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to Database
connectDB();

// static files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/', dashboardRoutes);

// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
});

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});