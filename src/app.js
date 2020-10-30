const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDir = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve 
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'Ashwaq',
        footerName: 'khan Pvt.Ltd. Company'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ashwaq AK',
        footerName: 'James007 Pvt.Ltd. Company'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'How can i help you',
        title: 'Ready to help',
        name: 'Mr. Ashwaq',
        footerName: 'AK Pvt.Ltd. Company'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : 'you should prodive a address term'
        })
    }
    res.send({
        forcast: 'its snowing',
        location: 'R.T. Nagar',
        address : req.query.address
    })
})

app.get('/products', (req, res) => {
    // console.log(req.query);
    if(!req.query.search){
        return res.send({
            error : 'you should prodive a search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products : []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Ashwaq',
        errorMessage: 'help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Ashwaq',
        errorMessage: 'Page NOT Found'
    })
})

app.listen(3000, () => {
    console.log('Server is Up running at 3000');
})