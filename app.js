// Load module
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');
var bodyParser = require("body-parser");
var session = require('express-session');

// Load config
var config = require("./configs");

// Cấu hình server
app.set("view engine", "jade");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'Session module',
	resave: false,
	saveUninitialized: true
}));

// Tạo kết nối db
var mongoose = require('mongoose')
mongoose.connect(config.URL_DATA);

// Lắng nghe kết nối
http.listen(config.PORT, function(){
	console.log(config.URL_CLIENT);

	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', () => {
		console.log('Connected DB');
	});
});

// Thêm route
fs.readdirSync("./routes").forEach(actor => {
	fs.readdirSync("./routes/" + actor).forEach(route => {
		require("./routes/"+actor+"/"+route)(app);
	});
});

// Socket.io
require("./socket/server")(io);
