const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);


const Users = {

};
const Messages = [
    
]

app.use(express.static(__dirname + "/public"));

io.on("connection", (socket) => {
    console.log("Client connected.");

    socket.on("registerUser", (data) => {
        if (Users[data.username] == undefined){
            Users[data.username] = data;
            console.log("Register")
            socket.emit("registerMessage", {message: "User successfully registered!", type: "success"} );
        }else{
            socket.emit("registerMessage", {message: "This user is already registered", type: "danger"} );
        }
    });
    socket.on("login", (data) => {
        let LoggedUser = false;
        if (Users[data.username] != undefined){
            if (Users[data.username].password == data.password){
                console.log("Logged");
                socket.emit("successLogin", null);
                LoggedUser = true;
            }
        }
        if (!LoggedUser){
            console.log("Not Logined:(");
        }
    });
    socket.on("sendMessage", (data) => {
        Messages.push(data);
        io.emit("takeMessage", data);
    });
});

app.get("", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

server.listen(PORT, console.log("Server Started. port " + PORT));