const db = require('../db/config');
const Games = {};

Games.findAll = (req, res, next) => {
	db.many('SELECT * FROM games')
		.then((allGames) => {
			res.locals.allGames = allGames
			next();
		})
		.catch(err => {
			console.log(`ERROR IN MODEL Games.findAll:`, err)
		});
};

Games.renderQuestion = (req, res, next) => {
		const { id, user_level } = req.params;
		
		// games 5 & 6
		let randomNum = 0;
		let random = 0;
		
		let getQuestion = null;

		let question = null;
		let response = null;
		let fullQuestion = "";
		let finalResponse = "";

		const poss_response = [];
		let pick = [];
		const order = [];
		const choice = [];
		
		// create an array with 4 random numbers
		while (order.length <= 3) {
			const randomOrder = Math.floor(Math.random() * 4);
			if (order.indexOf(randomOrder) === -1) {
				order.push(randomOrder);
			}
		}

		// games 1 to 4 are about convertion
		if ((parseInt(id) >= 1) && (parseInt(id) <= 4)) {
					// define a parameter function of the level
					const parameter = (parseInt(user_level)) * 10;
					// define the question function of the parameter
					question = Math.floor(Math.random() * parameter)+1;

					// define the order of convertion
					const side = ['US', 'EU'];
					const randomSide = Math.floor(Math.random()) * 2;

					if (parseInt(id) === 1) {
					// 1°F = ( 1°C x 1.8 ) + 32 & 1°C = ( 1°F - 32 ) / 1.8
								if (side[randomSide] === 'US') {
									fullQuestion = `How many °C make ${question}°F ?`;
									response = (question - 32) / 1.8;
								} else {
									fullQuestion = `How many °F make ${question}°C ?`;
									response = (question * 1.8) + 32;
								}
				  } else if (parseInt(id) === 2) {
					// 1 kg = 2.2 lb & 1 lb = 0.45 kg
								if (side[randomSide] === 'US') {
									fullQuestion = `How many kg make ${question}lb ?`;
									response = 0.45 * question;
								} else {
									fullQuestion = `How many lb make ${question}kg ?`;
									response = 2.2 * question;
								}
					} else if (parseInt(id) === 3) {
				  // 1 mile = 1.61 km & 1 km = 0,62 mile
								if (side[randomSide] === 'US') {
									fullQuestion = `How many km make ${question} mile(s) ?`;
									response = 1.61 * question;
								} else {
									fullQuestion = `How many mile(s) make ${question}km ?`;
									response = 0.62 * question;
								}
					} else if (parseInt(id) === 4) {
					// 1 cm = 0.39 inche & 1 inche = 2.54 cm
								if (side[randomSide] === 'US') {
									fullQuestion = `How many cm make ${question} inche(s) ?`;
									response = 2.54 * question;
								} else {
									fullQuestion = `How many inche(s) make ${question}cm ?`;
									response = 0.39 * question;
								}
					}

					// put the response inside the choices to pick
					finalResponse = (Math.round(response*100))/100;
					pick.push(finalResponse);

					// create 8 others choices
					for (let i = 1; i <= 5; i++) {
						poss_response.push(finalResponse+i);
						if (finalResponse-i < 0) {
							poss_response.push(finalResponse-i+8);
						} else {
							poss_response.push(finalResponse-i);
						}
					}
									
					// pick others numbers until there are 4 choices in pick
					while (pick.length <= 3) {
						const randomChoice = Math.floor(Math.random() * 7);
						if (pick.indexOf(poss_response[randomChoice]) === -1) {
							pick.push(poss_response[randomChoice]);
						}
					}
					
					// create an array with 4 choices in random order
					for (let j = 0; j < order.length; j++) {
						choice.push(pick[order[j]]);
					}
					res.locals.question = { fullQuestion, finalResponse, choice };
					next();
		
		} else if (parseInt(id) === 5) {
		// General Knowledge
			console.log('IN GAME 5');
			randomNum = user_level * 20;
			random = Math.ceil(Math.random() * randomNum);
			db.one(`SELECT * FROM knowledge WHERE level=$1 AND id=$2`, [user_level, random])
			.then( questionData => {
				pick = [questionData.response, questionData.possible_res_1, questionData.possible_res_2, questionData.possible_res_3];
				for (let j = 0; j < order.length; j++) {
					choice.push(pick[order[j]]);
				}
				fullQuestion = questionData.question;
				finalResponse =  questionData.response;
				console.log('fullQuestion', fullQuestion);
				console.log('finalResponse', finalResponse);
				console.log('choice', choice);
				
				res.locals.question = { fullQuestion, finalResponse, choice };
				next();
			});
		} 
		//else if (parseInt(id) === 6) {
    // 
		// 			console.log('IN GAME 6');
		// 		// Flags
		// 			randomNum = 14 * parseInt(user_level);
		// 			random = Math.ceil(Math.random() * randomNum);
    // 
		// 			db.one('SELECT response FROM flags WHERE level=$1 AND id=$2', [parseInt(user_level), random])
		// 			.then( question => {
		// 				console.log('IN RESPONSE', question);
		// 				res.locals.question = question;
		// 				response = question;
		// 				choice.push(response);
		// 				const randomOrderChoice = Math.floor(Math.random() * 3);
		// 				while (order.length <= 2) {
		// 					if (order.indexOf(randomOrderChoice) === -1) {
		// 						order.push(randomOrderChoice);
		// 					}
		// 				}
		// 				for (let j = 1; j <= order.length; j++) {
		// 					possible_res = `db.one('SELECT possible_res_${i} FROM flags WHERE level=$1 AND id=$2', [parseInt(user_level), random])`;
		// 					choice.push(possible_res);
		// 				}
		// 				res.locals.choice = choice;
		// 				next();
		// 			})
		// 			.catch(err => {
		// 				console.log(`ERROR IN MODEL Games.renderQuestion 6: ${err}`)
		// 			});	
		// }
	
	// return { fullQuestion, choice }
	// .then( fullBlockQuestion => {
	// 		fullBlockQuestion = res.locals.question
	// 		next();
	// 	}
	// ).catch(err => {
	// 	console.log(`ERROR IN MODEL Games.renderQuestion: ${err}`)
	// })

	
};

Games.updateNumberTry = (req, res, next) => {
	const { new_nb_try, user_id } = req.body;
	db.one('UPDATE users SET number_try_game=$1 WHERE id=$2 RETURNING number_try_game', [new_nb_try, user_id] )
		.then( new_nb_try => {
			res.locals.new_nb_try = new_nb_try;
			next();
		})
		.catch(err => {
			console.log(`ERROR IN MODEL Games.updateNumberTry:`, err)
		});
}

Games.updateMaxScore = (req, res, next) => {
	const { user_id, score, game_id } = req.body;
	db.one(`UPDATE users SET max_score_game_${game_id}=$1 WHERE id=$2 RETURNING max_score_game_${game_id}`, [score, user_id] )
		.then( new_max_score => {
			res.locals.new_max_score = new_max_score;
			next();
		})
		.catch(err => {
			console.log(`ERROR IN MODEL Games.updateMaxScore:`, err)
		});
}

Games.updateLevel = (req, res, next) => {
	const { user_id, user_level } = req.body;
	db.one(`UPDATE users SET level=$1 WHERE id=$2 RETURNING level`, [user_level, user_id] )
		.then( new_level => {
			res.locals.new_level = new_level;
			next();
		})
		.catch(err => {
			console.log(`ERROR IN MODEL Games.updateLevel:`, err)
		});
}

Games.updateLastPlay = (req, res, next) => {
	const { user_id, last_try } = req.body;
	db.one(`UPDATE users SET last_try=$1 WHERE id=$2 RETURNING last_try`, [last_try, user_id] )
		.then( new_last_play => {
			res.locals.new_last_play = new_last_play;
			next();
		})
		.catch(err => {
			console.log(`ERROR IN MODEL Games.updateLastPlay:`, err)
		});
}


module.exports = Games
