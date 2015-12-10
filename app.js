var exp=require('express');
var dbO = require('./includes/mongoDB.js').database;

var mongolocalurl = "mongodb://localhost:27017/exampleDb";
var mongolaburl = 'mongodb://brian:brian123@ds059672.mongolab.com:59672/groupchat';

var col = "chat";
var mo = require('mongodb').MongoClient;
var io = null;

dbO.connect(mongolocalurl, col, mo);

app=exp();

app.get('/', function (req, res, next) {

    if (io == null) {
        io = require('socket.io')(require('./includes/session').serverObj);
    }
    res.sendFile(__dirname+'/index.html');


    io.on('connection', function (socket) {

        //io.emit('message', {sock:socket});
        console.log('connected to a client\n');
        //console.log(socket.id);
        //socket.join('Ksh4XWj8OyslX62mAAAA');
        //socket.id='Ksh4XWj8OyslX62mAAAA';
        //console.log(io.engine.clients);
        //console.log(io.eio.clients);
        p = io.eio.clients;
        for (var key in p) {
            if (p.hasOwnProperty(key)) {
                console.log("Clients id :-" + key + " -> " + p[key]);

            }
        }

        /*
         function MessageObj(sender, content) {
         this.sender=sender;
         this.contet=content;
         }*/

        //setTimeout(function(){io.emit('chat message',"Welcome");},5000);
        socket.on('chat', function (msg) {
            console.log('init chat: ' + msg);
        });

        socket.on('chat message',function(msg){
            console.log(msg);

            io.emit('chat message', msg);
            /*
             io.to(socketid).emit('message', 'whatever');
             io.on('connection', function(socket){
             socket.on('say to someone', function(id, msg){
             socket.broadcast.to(id).emit('my message', msg);
             });
             });
             */


            //          dbO.coll.insert({"sender":msg.sender,"content":msg.contet});
        });
    });

    /*
    io.on('disconnection',function(socket){
        io.emit('chat message',"Connection lost to server");
    });*/
});
app.get('/style.css',function(req,res){
    res.sendFile(__dirname+'/public/styles/style.css');
});
app.get('/script.js',function(req,res){
    res.sendFile(__dirname+'/public/scripts/script.js');

});
app.get('/lib/jquery.js',function(req,res){
    res.sendFile(__dirname+'/public/scripts/jquery.js');
});



module.exports = app;