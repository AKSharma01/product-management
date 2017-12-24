const express = require('express');
const routes = require('./category/routes');

// app creation
const app = express();


/* main route of application */
app.use('/category', routes);

/*server is listing on port no 3000*/
app.listen(process.env.port || 3000, function(){
	console.log("Open http://127.0.0.1:3000/");
});
