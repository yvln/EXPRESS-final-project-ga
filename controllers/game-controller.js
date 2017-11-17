const express = require('express');
const router = express.Router();

const Games = require('../models/game-model');

router.get('/',
	Games.findAll,
	(req, res) => {
		const { allGames } = res.locals;
		res.json({
			allGames: allGames
		})
	}
);

router.get('/renderQuestion/:id/:user_level',
	Games.renderQuestion,
	(req, res) => {
		const { question } = res.locals;
		res.json({ 
			question: question
		});
	}
);

router.post('/newDay',
	Games.newDay,
	(req, res) => {
		const { new_day } = res.locals;
		res.send(new_day)
	}
);

router.post('/updateNumberTry',
	Games.updateNumberTry,
	(req, res) => {
		const { new_nb_try } = res.locals;
		res.send(new_nb_try)
	}
);

router.post('/updateMaxScore',
	Games.updateMaxScore,
	(req, res) => {
		const { new_max_score } = res.locals;
		res.send(new_max_score)
	}
);

router.post('/updateLevel',
	Games.updateLevel,
	(req, res) => {
		const { new_level } = res.locals;
		res.send(new_level)
	}
);

router.post('/updateLastPlay',
	Games.updateLastPlay,
	(req, res) => {
		const { new_last_play } = res.locals;
		res.send(new_last_play)
	}
);

module.exports = router;
