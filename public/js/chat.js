//let socket = io('http://localhost:3003');
let socket = io();

// Query DOM
let message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
    });
    message.value = "";

});

message.addEventListener('keypress', function () {
    socket.emit('typing');
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.user + ': </strong>' + data.message + '</p>';
    const chatWindow = document.getElementById('chat-window');
    chatWindow.scrollTop = chatWindow.scrollHeight;

});


// socket.on('typing', function (data) {
//     feedback.innerHTML = '<p><em>'+ data.us +'is typing a message...</em></p>';
//
// });
