const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve    
app.use(express.static(publicDirectoryPath))


app.get('', (req,res) => {
     res.render('index', {
       title: 'Weather App',
       name: 'Prakhar Jain'
     })
})

app.get('/about', (req,res) => {
       res.render('about', {
         title: 'About me',
         name: 'Prakhar Jain'
       })
})

app.get('/help', (req,res) => {
     res.render('help', {
         message: 'We are ready to help you :)',
         title: 'Help',
         name: 'Prakhar Jain'
     })
})

app.get('/weather', (req,res) => {
     if(!req.query.address){
         return res.send({
              error: 'You must provide address for weather forecast!'
         }) 
     }
     
     geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
          if(error){
             return res.send({
                   error: error
              })
          }
          
          forecast(latitude, longitude, (error, forecastData) => {
          if(error){
             return res.send({
                    error: error
               })
          }
   
          res.send({
               forecast: forecastData,
               location: location,
               address: req.query.address
            }) 
       })
    })
  
   
})

app.get('/products', (req,res) => {
     if(!req.query.search){
         return res.send({
               error: 'You must provide search term'
          })
     }
     console.log(req.query.search)
     res.send({
          products: []
     })
})


app.get('/help/*', (req,res) => {
      res.render('404', {
           title: '404',
           name: 'Prakhar Jain',
           error : 'Help article not found!'
      })
})

app.get('*', (req,res) => {
     res.render('404', {
          title: '404',
          name: 'Prakhar Jain',
          error: 'Page not found!'
     })   
})


app.listen(port, () => {
   console.log('Server is up at port '+port)
})