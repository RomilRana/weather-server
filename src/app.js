const path = require('path')
const express = require('express')
const hbs = require('hbs') // work as header & footer
const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')

const app = express()

//Define path for names
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partial')

//setup engine of hbs and location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

//setup to work
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title :'Weather App',
        name:'Romil Rana'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
       title:'About me',
       name:'Romil Rana' 
    })
})

app.get('/help',(req,res) => {

    res.render('help',{
        helpText:'This is some useful text',
        name:'Romil Rana' 
    })
})

app.get('/weather',(req,res) => {
    if(!req.query.address)
    {
        return res.send({
            error:'you must have an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error){
            return res.send({error})
        }

        forcast(latitude, longitude, (error, forcastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forcast: forcastData,
                location,
                address: req.query.address
            })
        })
    })

 /*   res.send({
        forcast:'it is windi',
        location:'New York',
        address :req.query.address
    }) */
 })

app.get('/pro',(req,res) => {
    if(!req.query.serch){
        res.send({
            error:'youn have to serch first'
        })
    }
    console.log(req.query.serch)
    res.send({
        pro: []
    })
})

app.get('*',(req,res) => {
    res.send('My 404 page')
})


app.listen(3000, () => {

    console.log('server is set on port no:3000')
})