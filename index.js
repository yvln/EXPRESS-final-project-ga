const express   			= require('express');
const app       			= express();
const port       			= process.env.PORT || 8080;

const cors 						= require('cors');
const bodyParser			= require('body-parser');

const userController = require('./controllers/user-controller.js');
const gameController = require('./controllers/game-controller.js');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', userController);
app.use('/games', gameController);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
})
