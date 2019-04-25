const express = require('express');
const morgan = require ('morgan');
const path = require('path');
const models = require('./models');
const wiki = require('./router/wiki');
const user = require('./router/user');

const PORT = 8080;

const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use(express.static(__dirname + "/public"))
app.use('/wiki', wiki);
app.use('/user', user);

//TESTING
app.get('/', (req, res, next) => {
  res.redirect('/wiki')
})


//DATABASE STUFF
models.db.authenticate().
then(() => {
  console.log("connected to database")
})
//
const init = async () =>{
  await models.User.sync({force: true})
  await models.Page.sync({force: true})
  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`)
  })
}

init()
