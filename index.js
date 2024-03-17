const express = require('express')
const app = express()

const port = process.env.PORT || 3000


const path = require ("path")
const publicDirectory =  path.join(__dirname , '../public')
app.use (express.static (publicDirectory))

const geocode = require('./tools/geocode')
const forecast = require('./tools/forecastFile')

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            // shorthand property error:error
            return res.send({error})
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location:req.query.address
            })
        })
    })
})



 // to read partials : 
 var hbs = require('hbs');
const partialsPath = path.join(__dirname , "../Temp1/headers.hbs")
hbs.registerPartials(partialsPath)

 
app.get ('/' , (req,res) => {
    res.json( {
        title : "HOME",
        desc : "This is home page"
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    })
    

app.use('*', (req, res) => {
    res.json({ msg: "Cannot find the URL :" + req.originalUrl });
  });
