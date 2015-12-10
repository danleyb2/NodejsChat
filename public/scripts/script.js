var username = null;
var socket = io();

socket.on('message', function (df) {
    console.log(df.sock);
});
socket.on('chat message',function(mesg){
    console.log(mesg);
    var msg = mesg;

    var div=document.createElement('DIV');
    if(msg.sender==username){
        div.innerHTML="You-:"+msg.contet;
        div.setAttribute('class','b');
    }else{
        div.innerHTML=msg.sender+"-:"+msg.contet;
        div.setAttribute('class','a');
    }
    $("#history").append(div);
});

function MessageObj(sender, content) {
    this.sender=sender;
    this.contet=content;
}
function addNew(){
    username=document.getElementById('username').value.toString().trim();
    if(username!=="") {
        //add user

        document.getElementById('username').value="";
        $("#hideE").fadeOut(3000);

    }else{
        alert("Username cannot be empty");
    }
}
window.onkeydown=function(event){
    if(checkBox() && event.keyCode==13){
        sendNew();
        return false;
    }
};
function sendNew(){
    if(username != null){
    var msg=document.getElementById('txt').value.toString().trim();
    if(msg!=="") {
        //send message
        var ms = new MessageObj(username, msg);
        socket.emit('chat message', /*JSON.stringify(*/ms/*)*/);

        document.getElementById('txt').value = "";

        return false;
    }else{
        console.log("Can't send a blank message");
        document.getElementById('txt').value = "";
    }}else{
        alert('First enter a username');
    }
}

function checkBox() {return document.getElementById('chk').checked;}

