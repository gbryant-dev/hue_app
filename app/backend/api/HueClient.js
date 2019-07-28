class HueLight {

  constructor(hueID, name, type, state) {
    this.hueID = hueID;
    this.name = name;
    this.type = type;
    this.state = new HueState(state.on, state.bri, state.reachable);
  }
}

class HueGroup {

  constructor() {
    console.log('Hue Group!');
  }
}

class HueState {
  constructor(power, brightness, reachable) {
    this.power = power;
    this.brightness = brightness;
    this.reachable = reachable;
  }
}

module.exports = { HueLight, HueGroup }
