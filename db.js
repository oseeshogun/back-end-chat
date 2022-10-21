const { mongoose } = require('mongoose')
const config = require('./config')

const uri = `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@cluster0.ujw2m.mongodb.net/${config.DB_NAME}?retryWrites=true&w=majority`

mongoose
  .connect(uri, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connexion done !'))
  .catch((err) => console.log(err))

module.exports = mongoose
