import express from "express";
import 'dotenv/config';
import expressLayouts from 'express-ejs-layouts';

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

app.get('/', (req, res) => {
    const locals = {
        title: 'NodeJs Notes',
        description: 'Free NodeJs Notes'
    };
    res.render('index', locals);
});

app.listen(port, () => {
    console.log(`App listening on ${port}`);
});