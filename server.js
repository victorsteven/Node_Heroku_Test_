const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
//setting either heroku port or our local port
var port = process.env.PORT || 3000;

var app = express();
//lets register the hbs partials we want to use
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

//serving static files, it means, we dont need to define a route for them:

app.use((req, res, next) => {
    var now = new Date().toString();

    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);

    fs.appendFile(`server.log`, log + "\n",  (err) => {
        if(err) console.log(err);
    });

    next();
});

// app.use((req, res, next) => {
//     res.render('maintanance')
// });
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

// app.get('/', (req, res) => {
//     res.send({
//         name: "Steven",
//         age: 40
//     });
// })
app.get('/', (req, res) => {
   res.render('home.hbs', {
        pageTitle: "Welcome sir",
    //    currentYear: new Date().getFullYear()

   })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
        // currentYear: new Date().getFullYear()
    })
})


app.listen(port , () => {
    console.log(`server is up on port ${port }`);
});

