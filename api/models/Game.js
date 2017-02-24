/**
 * Game.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    questionId: {
      type: 'integer',
      defaultsTo: 0
    },
    betRound: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};
