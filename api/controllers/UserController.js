/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addUser(req, res) {
		 var data_from_client = req.params.all();
		 data_from_client.socket_id = req.socket.conn.id;
		 if (req.isSocket && req.method === 'POST') {
				 // This is the message from connected client
				 // So add new conversation
				 User.create(data_from_client)
						 .exec(function(error, data_from_client) {
								User.publishCreate({
									 id: data_from_client.id,
									 name: data_from_client.name
								 });
								 res.json(data_from_client);
						 });
		 } else if (req.isSocket) {
				 User.watch(req.socket);
				 console.log('User subscribed to ' + req.socket.id);
				 res.ok();
		 }

 }

};
