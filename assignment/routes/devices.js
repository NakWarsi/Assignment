var express = require('express');
var router = express.Router();
var device = require('../model/device');
const mqtt = require('mqtt');
var client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', function () {
    console.log('mqtt broker connected')
})



/* GET users listing. */
router.get('/', function(req, res) {
    device.getData((err,data)=>{
        if (err){
            res.json({
                success: false,
                msg: err  
            })
          }
          else{
              res.json({ 
                  success: true,
                  msg: data
              })
            }
    })
});


router.get('/interval', (req, res) => {
  arr = req.url.split('=')
  res.send("changing interval to "+arr[1]+" seconds");
  client.publish('interval',arr[1])
})



router.post("/", (req, res) => { 

  if (!req.body.sensor || !req.body.temperature || !req.body.humidity)
{
      res.json({
          success: false,
          msg: 'incomplete data'
      });}
  else {
      let DATA = {
        sensor: req.body.sensor,
        temperature: req.body.temperature,
        humidity: req.body.humidity
      }
      
      device.addDevice(DATA, (err,DATA) => {
          console.log(DATA)
          if (err){
              res.json({
                  success: false,
                  msg: err
                  
              })
            }
          else{
            console.log(DATA)
              res.json({ 
                  success: true,
                  msg: 'data added  :' + DATA
              })
            }
      })
  }
})

module.exports = router;
