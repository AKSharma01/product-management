const express = require('express');
const routes = require('./app/routes');
const bodyParser = require('body-parser');

// app creation
const app = express();

app.use(bodyParser.json());
/* main route of application */
app.use('', routes);

/*server is listing on port no 3000*/
app.listen(process.env.port || 3000, function(){
	console.log("Open http://127.0.0.1:3000/");
});
