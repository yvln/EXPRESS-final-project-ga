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

// router.get('/:id/:user_level',
// 	Games.findById,
// 	(req, res) => {
// 		console.log('in games GET findById');
// 		const { game } = res.locals;
// 		res.json({
// 			game: game
// 		});
// 	}
// );

router.get('/renderQuestion/:id/:user_level',
	Games.renderQuestion,
	(req, res) => {
		const { question } = res.locals;
		res.json({ 
			question: question
		});
	}
);

router.post('/updateNumberTry',
	Games.updateNumberTry,
	(req, res) => {
		const { new_nb_try } = res.locals;
		res.json({
			new_nb_try: new_nb_try
		});
	}
);

router.post('/updateMaxScore',
	Games.updateMaxScore,
	(req, res) => {
		const { new_max_score } = res.locals;
		res.json({
			new_max_score: new_max_score
		});
	}
)

router.post('/updateLevel',
	Games.updateLevel,
	(req, res) => {
		const { new_level } = res.locals;
		res.json({
			new_level: new_level
		});
	}
)

router.post('/updateLastPlay',
	Games.updateLastPlay,
	(req, res) => {
		const { new_last_play } = res.locals;
		res.json({
			new_last_play: new_last_play
		});
	}
)

module.exports = router;
