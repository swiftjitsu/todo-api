var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var _ = require('underscore');

var todos = [];

// var todos = [{
// 	id: 1,
// 	description: 'Leave work early tomorrow for video shoot',
// 	completed: false
// }, {
// 	id: 2,
// 	description: 'Look for contact at San Diego Convention Center',
// 	completed: false
// }, {
// 	id: 3,
// 	description: 'Get back to homebase.',
// 	completed: false
// }];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/',function(req,res){
	res.send('TODO API Root.');
});

// GET /todos Request
app.get('/todos', function(req,res){

	res.json(todos);
});

// Get /todos/id
app.get('/todos/:id', function(req, res){
	var todosId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todosId});

	// var data = todos[(todosId - 1)];
	// todos.forEach(function(todo){
	// 	if(todosId === todo.id) {
	// 		matchedTodo = todo;
	// 	}
	// });

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404);
	}


	console.log("l: " + todos.length);

	// res.json(data);
// #472715

});

// POST  /todos
app.post('/todos', function(req,res){
   var body = _.pick(req.body, 'description','completed');  // Use _.pick to only pick description and completed.

   if( !_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0 ) {
   	return res.status(400).send();
   }


   // add id field
   body.id = todoNextId++;

   body.description = body.description.trim();

   var todosObj = { 
   		"description": body.description,
   		"completed": false
   	}

   	todosObj.id = todoNextId;

   	todos.push(body);

   console.log(body.description + ' description');

   console.log(todos);
   // res.json(body);
});


// DELETE /todos/:id
app.delete('/todos/:id', function(req,res){
	var todosId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todosId});

	// This was my version
	// var removed = _.without(todos,matchedTodo);
	// todos = removed;
	// console.log(todos);
	// console.log("Deleted: " + JSON.stringify(matchedTodo));

	if(!matchedTodo) {
		res.status(404).json({"error": "no todo found with that id"});
	} else {
		todos = _.without(todos, matchedTodo);
		res.json(matchedTodo);
	}
});

// put /todos/:id
app.put('/todos/:id',function(req,res){
	var todosId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todosId});
	var body = _.pick(req.body, 'description','completed');
	var validAttributes = {};

	if(!matchedTodo) {
		
		console.log('No match found.');
		return res.status(404).send();

	} else { console.log('Match found'); }

 	if(	body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
		console.log('valid completed attribute.');
	} else if (body.hasOwnProperty('completed') ) {
		return res.status(400).send();
	}
	
	if( body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {

		console.log('validated description');

		validAttributes.description = body.description;
	} else if ( body.hasOwnProperty('description')) {
		return res.status(400).send();
	}

	// Update here
	_.extend(matchedTodo, validAttributes);


});





app.listen(PORT, function(){
	console.log('ToDo App listening on ' + PORT);
});