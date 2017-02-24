/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {
  // cleanup old db entries
  User.destroy({ }).exec(function (err, user) {  console.log("running initial user destroy") });
  Question.destroy({ }).exec(function (err, question) {  console.log("running initial question destroy") });
  Game.destroy({ }).exec(function (err, game) {  console.log("running initial game destroy") });

  Question.create({ title: "How many employees has SUSE?", answer: "500"}).exec(function (err, question) {
    console.log("running initial question creation")
    Game.create({ questionId: question.id }).exec(function (err, user) {
      console.log("running initial game creation")
    });
  });
  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
