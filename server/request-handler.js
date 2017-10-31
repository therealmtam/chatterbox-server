/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/

var url = require('url');
var fs = require('fs');
var querystring = require('querystring');


//STORE ALL DATA IN THIS ARRAY:
var storageArr = [];

//INITIALIZED A POST TO PASS A FEW SPEC TESTS
var initialPost = {
  username: 'Jono',
  text: 'Do my bidding!',
  roomname: 'lobby'
};
storageArr.push(initialPost);


var requestHandler = function(request, response) {


  var defaultCorsHeaders = {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'access-control-allow-headers': 'content-type, accept',
    'access-control-max-age': 10 // Seconds.
  };

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'text/plain';


  console.log('Serving request type ' + request.method + ' for url ' + request.url);
  
  //---------------------------

  var urlInfo = url.parse(request.url);
  var preferredRoute = '/classes/messages';

  if (request.method === 'GET' && urlInfo.path === '/classes/messages') {
    statusCode = 200;

    response.writeHead(statusCode, headers);
    response.end(JSON.stringify({results: storageArr}));
    return;

  } else if (request.method === 'POST' && urlInfo.path === '/classes/messages') {
    statusCode = 201;

    //store that data:
    var body = '';
    
    request.on('data', function (chunk) {
      body += chunk;
    });

    request.on('end', function () {

      //parse out the information from the message:
      //ex. username=Test&text=ha&roomname=lobby
      //And store it into the storage array.
      storageArr.push(querystring.parse(body));
     
      response.writeHead(statusCode, headers);
      response.end('POST in /classes/messages');
    });

    return;

  } else if (request.method === 'POST' && urlInfo.path === '/classes/room') {
    statusCode = 201;

    response.writeHead(statusCode, headers);
    response.end('POST in /classes/room');
    return;

  } else {
    statusCode = 404;

    response.writeHead(statusCode, headers);
    response.end('Not Found');
    return;
  }
};


module.exports.requestHandler = requestHandler;







