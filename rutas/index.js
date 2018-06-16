'use strict'

const express = require('express');
const userCtrl = require('../controladores/user');
const auth = require('../middlewares/auth');
const api = express.Router();

api.post('/signup', userCtrl.signUp);
api.post('/signin', auth,userCtrl.signIn);
api.get('/private', auth,  function(req, res){
  res.status(200).send({message: 'tienes acceso'})
})

module.exports = api;
