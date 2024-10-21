//Este codigo control el servo
import Protobject from './js/protobject.js';
import Arduino from './js/arduino.js';

Arduino.start();

let interval, i = 0, val;

Protobject.onReceived((data) => {
    val = data * 350;
    clearInterval(interval);
    
    if (val > 0) {
        //Este setInterval siguiente se usa para hacer que el movimiento comienze de forma liviana y aumente, sin que sea repentino
        interval = setInterval(() => {
            i = Math.min(i + 1, val);
            Arduino.contServoWrite({ pin: 5, value: i });
        }, 10);
    } else {
        i = 0;
        Arduino.contServoWrite({ pin: 5, value: 0 });
    }
});