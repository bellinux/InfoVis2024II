import Arduino from './js/arduino.js';
import Protobject from './js/protobject.js';

Arduino.start();
Protobject.onReceived((data) => {
   Arduino.servoWrite({ pin: 5, value: data.speed });
});

/*
Arduino.start().then(function (){
	Arduino.servoWrite({ pin: 6, value: 500 });
    //Arduino.contServoWrite({ pin: 5, value: 500 })
});

*/










