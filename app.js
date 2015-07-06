var exp=require('express');
app=exp();

app.use('/chat', function (req,res,next) {
    var io=require('socket.io')(require('./includes/session').serverObj);
    res.sendFile(__dirname+'/index.html');
    io.on('connection',function(socket){
       console.log("A user connected");
        //setTimeout(function(){io.emit('chat message',"Welcome");},5000);
        socket.on('chat message',function(msg){

            console.log(JSON.parse(msg));

           io.emit('chat message',msg);
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
app.get('/socket.io/socket.io.js',function(req,res){
    res.sendFile(__dirname+'/public/scripts/socket.io.js');
});
app.use(function(req, res, next) {
    console.log("handling a request: "+req.url);
    res.end();
    });



module.exports = app;