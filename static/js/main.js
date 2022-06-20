console.log('working now');

var labelUsername = document.querySelector('#label-username');
var usernameInput = document.querySelector('#username');
var btnJoin= document.querySelector('#btn-join');

var username;
var webSocket;

//Web socket message fxn
function webSocketOnmessage (event){
    var parsedData = JSON.parse(event.data);
    var message  = parsedData['message'];
    console.log('message :', message);

}

btnJoin.addEventListener('click',()=>{
    username = usernameInput.value;
    console.log('username :', username)
    if(username == ""){
        return ;
    }
    usernameInput.value = "";
    usernameInput.disabled = true;
    usernameInput.style.visibility = 'hidden';

    btnJoin.disabled = true;
    btnJoin.style.visibility = 'hidden';

    var labelUsername = document.querySelector('#label-username'); 
    labelUsername.innerHTML = username;

    var loc = window.location;
    var wsStart = 'ws://';

    if (loc.protocol == "https:"){
        wsStart = "wss://";

    }

    var endpoint = wsStart + loc.host + loc.pathname;
    console.log('endpoint:',endpoint); //Connection host 

    webSocket = new WebSocket(endpoint); 

    webSocket.addEventListener('open',(e)=>{
        console.log('Connection opened');
    } 
    );
    webSocket.addEventListener('message',webSocketOnmessage  );
    
    webSocket.addEventListener('close',(e)=>{
        console.log('Connection closed');
    }  );
    webSocket.addEventListener('error',(e)=>{
        console.log('Connection error');
    }  );



})