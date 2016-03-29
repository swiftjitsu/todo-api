var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var bodyParser = require('body-parser');

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
	var matchedTodo;

	// var data = todos[(todosId - 1)];
	todos.forEach(function(todo){
		if(todosId === todo.id) {
			matchedTodo = todo;
		}
	});

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404);
	}


	console.log("l: " + todos.length);

	// res.json(data);


});

// POST  /todos
app.post('/todos', function(req,res){
   var body = req.body;

   // add id field
   body.id = todoNextId++;

   console.log(todoNextId);
   // push body into array

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



app.listen(PORT, function(){
	console.log('ToDo App listening on ' + PORT);
});