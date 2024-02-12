const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    console.log('Here');
    res.render('index');
});

app.get('/about', (req, res) => {
    // Handle the 'about' route here
    res.send('About Page');
});

app.listen(1890, () => {
    console.log('Server is running on http://localhost:1890');
});
