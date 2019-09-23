var socket = function (socket) {   

    socket.on('choose', function(data){
        console.log(data);
    })

    socket.on('disconnect', function(){
        users.some(function(currentUser, index){
            if(currentUser.id == user.id){
                users.splice(index, 1);
                return true;
            }
            return false;
        });
        socket.broadcast.emit('user:update', {
            users: users
        });
    });

};

module.exports = socket;