var Connect = require('express')();

	Connect.get('/:query', function(req, res, next) {

		res.writeHead(200, { 'Content-Type': 'text/html' });

		var rediff = require('./searcher-rediff');
		rediff.on('on_book', function(item){
			res.write(item + "<br/>");
		});
		rediff.on('completed', function(){
			res.end();
		});
		rediff.search(escape(req.params.query));

	});

    Connect.get('/', function(req, res){
        var examples = [
            '/users',
            '/users.json',
            '/users/0 (or /users/0/view)',
            '/users/0/edit',
            '/users/0.json'
        ];
        var body = 'Visit one of the following: <ul>'
            + examples.map(function(str){ return '<li>' + str + '</li>' }).join('\n')
            + '</ul>';
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': body.length
        });
        res.end(body, 'utf8');
    });

var server = Connect;//.createServer();
server.listen(3000);
console.log('Server listening to localhost:3000');
