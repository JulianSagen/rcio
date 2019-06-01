const io = require('socket.io')();
const Gpio = require('pigpio').Gpio;

const wheelMotor = new Gpio(22, {mode: Gpio.OUTPUT});
const speedMotor = new Gpio(23, {mode: Gpio.OUTPUT});

let speed = 1600;
let wheel = 1600;


io.origins('*:*')

io.on('connection', (client) => {
    console.log("Client connected")
    //  console.log(client)
    client.on('disconnect', (client) => {
        console.log("Client disconnection")
        //  console.log(client)

    });
    client.on('incoming data', (data) => {
        console.log("Reciveing incomming data: " + data)
        console.log(data)
    });
    client.on('wheelspeed', (data) => {
        console.log("Reciveing incomming data: ")
        console.log(data)
        wheel = data.wheel;
        speed = data.speed;

    });
});


const sendSignal = setInterval( () =>{
    speedMotor.servoWrite(speed);
    wheelMotor.servoWrite(wheel);

}, 200);


const port = 8000;
io.listen(port);
console.log('listening on port ', port);


const moveWheel = (degree) => {
    console.log("Moving wheel to" + degree)
}