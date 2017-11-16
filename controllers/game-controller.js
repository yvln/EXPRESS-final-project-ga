const express = require('express');
const router = express.Router();

const Games = require('../models/game-model');

router.get('/',
	Games.findAll,
	(req, res) => {
		console.log('in games GET findAll');
		const { allGames } = res.locals;
		res.json({
			allGames: allGames
		});
	}
);

router.get('/:id/:user_level',
	Games.findById,
	(req, res) => {
		console.log('in games GET findById');
		const { game } = res.locals;
		res.json({
			game: game
		});
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

// router.post('/lessTry',
// 	Games.oneLessTry(number_try_game, user_id),
// 	(req, res) => {
// 		const { number_try } = res.locals;
// 		res.json({
// 			number_try: number_try
// 		});
// 	}
// );

module.exports = router;
