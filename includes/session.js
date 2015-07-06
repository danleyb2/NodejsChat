var http=require('http');
exports= module.exports=createServer;

exports.serverObj={};
function createServer(ap) {
    if(ap===undefined){
        //return server obj

        return exports.serverObj;
    }else{

        //createServer obj
        exports.serverObj=http.createServer(ap);
    }
}