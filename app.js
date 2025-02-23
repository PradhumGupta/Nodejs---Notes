import express from "express";
import 'dotenv/config';
import expressLayouts from 'express-ejs-layouts';
import indexRoutes from "./server/routes/index.js";
import dashboardRoutes from './server/routes/dashboard.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// static files
app.use(express.static('public'));

// Templating Engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
app.use('/', indexRoutes);
app.use('/', dashboardRoutes);


// Handle 404
app.get('*', (req, res) => {
    res.status(404).render('404');
})


app.listen(port, () => {
    console.log(`App listening on ${port}`);
});