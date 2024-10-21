import Knob from './js/knob.js';
import Protobject from './js/protobject.js';

const perilla = new Knob({ min: -500, max: 500 });

perilla.onChange((value) => {
    Protobject.send({ speed: value }).to('arduino.js');
});

