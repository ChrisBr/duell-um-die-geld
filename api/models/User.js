/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      defaultsTo: ''
    },
    account: {
      type: 'integer',
      defaultsTo: 500
    },
    answer: {
      type: 'string',
      defaultsTo: ''
    },
    betRound: {
      type: 'integer',
      defaultsTo: 0
    },
    bet: {
      type: 'integer',
      defaultsTo: 0
    },
    socket_id: {
      type: 'string',
      defaultsTo: ''
    }
  },

  afterUpdate: function (values, cb) {
    // do this only when there are more than 2 user
    
    User.find({ answer: '' }).exec(function (err, usersWithoutAnswer){
      // all users submitted an answer, let's start the game!
      if(usersWithoutAnswer.length === 0){
        // there should only be one game
        // start the game by setting the betRound to 1
        Game.update({}, { betRound: 1 }).exec(function(error, games){
          console.log("All users submitted an answer, starting game: " + games[0].id);
          Game.publishUpdate(games[0].id, { betRound: 1 });
        });
      }
    });

    User.find({ betRound: 0 }).exec(function (err, usersWithoutBet){
      // all users submitted a bet
      if(usersWithoutBet.length === 0){
        // there should only be one game
        // increase the betRound of game
        Game.update({}, { betRound: 2 }).exec(function(error, games){
          console.log("All users submitted a bet for round 2, starting next bet round: " + games[0].id);
          Game.publishUpdate(games[0].id, { betRound: 2 });
        });
      }
    });

    cb();
  }
};
