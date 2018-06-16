
'use strict'

const User = require('../modelos/user');
const servicios = require('../servicios')

function signUp(req, res){
  const user = new User({
    email: req.body.email,
    apellido: req.body.apellido,
    user: req.body.user,
    password: req.body.password
    //age: req.body.age,
    //sex: req.body.sex
  })

  user.save((err) =>{
    if(err) return res.status(500).send({ message: `Error al crear usuario ${err}`});

    return res.status(200).send({ token: servicios.createToken(user) });
  })
}

function signIn(req,res) {
  User.findOne({ email: req.body.email}, function (err, user) {
    if (err) return res.status(500).send({message: err})
    if (!user.length === 0) return res.status(404).send({message: 'No existe el usuario.'})
    user.comparePassword(req.body.password, function (err,match) {
      if (err) return res.status(500).send({message: err})

      if (match) {
        res.status(200).send({
          message: 'Has iniciado sesión.',
          token: servicios.createToken(user)
        })
      } else {
        res.status(401).send({
          message: 'Datos incorrectos.'
        })
      }
    })

  })
}

module.exports = {
  signUp,
  signIn
}
