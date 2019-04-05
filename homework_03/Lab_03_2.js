const EventEmitter = require('events');

class GYM extends EventEmitter {}

const athlete = new GYM();
athlete.on('boom', () => {
  console.log('Athlete is working Out');
});
//function Emiter1()
setInterval({athlete.emit('boom');},1000);