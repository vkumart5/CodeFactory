
require('dotenv').config()

var express = require('express');
var router = express.Router();

const bcrypt = require("bcrypt")
const fs = require('fs')
const jwt = require("jsonwebtoken")

const userData = fs.readFileSync('./content/users.json');
const userDetails = JSON.parse(userData);

//const users = []
const users = userDetails

router.post('/login', async (req, res) => {
  //const user = users.find(user => user.name = req.body.name)
  const userName = users.name
  const userPassword = users.password
  if(userName != req.body.name){
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, userPassword)){
      const reqUserName = req.body.name
      const reqUserPassword= req.body.password

      const reqUser = { name: reqUserName, password: userPassword }

      const accessToken = jwt.sign(reqUser, process.env.ACCESS_TOKEN_SECRET)
      res.status(200).json({accessToken: accessToken})
    }
    else{
      res.status(403).send('Incorrect password')
    }
  } catch{
    res.status(500).send()
  }
})

router.get('/auth', (req, res) => {
  const authHeader = req.headers['authorization']
  const token = authHeader

  if (token == null) {
    res.sendStatus(401)
  }
  else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=> {
      if (err) return res.sendStatus(409)
      res.json({ authentication: true })
    })
  }
})



module.exports = router;
