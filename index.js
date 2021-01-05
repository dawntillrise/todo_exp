const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const conf = require('./config.json')

const PORT = process.env.PORT || 80;
 
const app = express()
const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
	try {
		await mongoose.connect(
		'mongodb+srv://'+conf.login+':'+conf.pass+'@cluster0.fryke.mongodb.net/'+conf.dbName+'?retryWrites=true&w=majority', 
		{
			useNewUrlParser: true,
			useFindAndModify: false
		})
		app.listen(PORT, () => {
			console.log('Server has been started...')
		})
	} catch (e) {
		console.log(e)
	}
}

start()
