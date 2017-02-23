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
    socket_id: {
      type: 'string',
      defaultsTo: ''
    }
  }
};
