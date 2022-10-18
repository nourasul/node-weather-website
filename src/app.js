const path = require('path')
const express = require('express')
//load hbs: 
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)//C:\Users\NoraAlsuliman\OneDrive - Lean for Business Services\Desktop\node-cource\web-server\src
//console.log(path.join(__dirname,'../public'))//C:\Users\NoraAlsuliman\OneDrive - Lean for Business Services\Desktop\node-cource\web-server\public

const app = express()
const port = process.env.PORT || 3000
//configure express to serve the directry
const publicDirectoryPath= path.join(__dirname,'../public')
const viewPath= path.join(__dirname, '../template/views')
const partialsPath= path.join(__dirname,'../template/partials')

//app.use: customize my server, to serve up that folder. Static takes the path to the folder we want to serve up
//app.set: we need to tell Express what template engine we installed. 1st arg:view engine 2nd arg:module installed: hbs
app.set('view engine', 'hbs') //handlebar is setup -> we can use it to create dynamic templates
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectoryPath))


//set up a server to send a response, app.get() what the app should do when someone try to access the url
//first argument is the rout, the 2nd arg: function: what to send to the user when user visit the rout
//function arg: 1.object containing: info about the incoming request to the server

//to allow the web server to access the dynamic web page, we need to use rout
app.get('', (req, res)=>{ //home page: localhost:3000
    res.render('index',{
        title: 'Weather',
        name: 'Nora'
    })//No need for file extension. it should match up with template name in the views folder
    //first arg: name of the view to render.
    //2nd arg: object that contain all of the values you want the view to be able to access
})
app.get('/about', (req, res)=>{ 
    res.render('about', {
        title: 'About Page',
        name:'Nora'
    })
})
app.get('/help', (req, res)=>{ 
    res.render('help', {
        title: 'Help',
        name:'Nora'
    })
})
//No address provided, send error
app.get('/weather', (req, res)=>{ 
    if(!req.query.address){
        console.log(req.query.address)
        return res.send({
            error: 'You must provide address term'
        })
    }
    geocode(req.query.search, (error, {latitude,longitude,city} = {} ) =>{ 
        if (error){ //defult value is empty if the user, undifiend for all the three values 
          return res.send({
            error:error
          })
    }//return will stop the function from contuning so no need to write else 
    //before using object destructuring:  forecast(data.latitude, data.longitude,(error, forecastData)=>{
      forecast(latitude, longitude,(error, forecastData) =>{
          if (error){
            return res.send({
                error:error
              })
          } 
          res.send({
            address:req.query.address,
            forecast: forecastData,
            city
          })
      })
    })
    })
    // console.log(req.query.address)
    // res.send({
    //     address: req.query.address,
    //     forecast: 'It is sunny',
    //     kocation:'Riyadh'
    // })
//})
app.get('/products', (req, res)=>{ 
    //search needs to be provided in the query but you don't have to provide rating. http://localhost:3000/products?search=games&rating=5
    if(!req.query.search){ //this block will run only if the search is not provided
       return res.send({
            error: 'You must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// anything after help, eg: help/test
app.get('/help/*', (req, res)=>{
    res.render('error',{
        msg: 'Help article not found',
        title: '404',
        name:'Nora'
    })

})
//"*"" means anything that hasn't been match so far
app.get('*',(req, res) =>{
    res.render('error',{
        msg: 'Page not found',
        title: '404',
        name:'Nora'
    })
})

//we will have one domain"app.com" and multiple routs: all of them will run on a single express server
//app.com/help
//app.com/about
//what the server should do when someome tries to get the resouse


//start the server up
//2nd arg: callback funcrion: function that runs when the server is up and running
app.listen(port, ()=>{
    console.log('Server is up on port '+ port)

})
//Templete engine to render a dynamic web page using express.
//we will use templete engine called: HandleBar
//Handlebar: Render dynamic contenr
//using Templete engine we can use the same header and footer across all the web pages 