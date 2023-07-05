const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const Server  = require("socket.io").Server //teste
const http  = require('http') //teste

const app = express();

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// teste************************
const path  = require('path')

const server  = http.createServer(app)
const io = new Server(server , {
    cors:{
        origin:"*"
    }
})


const _dirname = path.dirname("")
const buildPath = path.join(__dirname, '..', '..', 'frontend', 'antd-demo', 'build');

app.use(express.static(buildPath))

app.get("/*", function(req, res){

    res.sendFile(
        path.join(__dirname, "../../frontend/antd-demo/build/index.html"),
        function (err) {
          if (err) {
            res.status(500).send(err);
          }
        }
      );

})
io.on("connection" , (socket) => {
    console.log('We are connected')
 
    socket.on("chat" , chat => {
       io.emit('chat' , chat)
    } )
 
    socket.on('disconnect' , ()=> {
     console.log('disconnected')
    })
 })

// teste************************
app.use(cors());
app.use(express.json());
app.use(routes);

//app.listen(3333);
server.listen(3333);
