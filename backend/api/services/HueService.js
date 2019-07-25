const axios = require('axios');
const { HueLight, HueGroup } = require('../HueClient');

const host = 'http://192.168.1.202/api';
const username = 'kr7oSIYLlX5KWHoka-qGteSm4-xWY9av2xf1oScI';
const hueUrl = `${host}/${username}`;

let lights = [];
let groups = [];

class HueService {

  async getLights(url) {
    const rsp = await axios.get(`${url}/lights`);
    return rsp.data;
  };

  async getGroups (url) {
    const rsp = await axios.get(`${url}/groups`);
    return rsp.data;
  }

  async getHues() {

    await this.getLights(hueUrl)
    .then(_lights => {
      this.lights = [];
      for (const index in _lights) {
        let _light = _lights[index];
        let light = new HueLight(index, _light.name, _light.type, _light.state);
        this.lights.push(light);
      }
    });

    await this.getGroups(hueUrl)
      .then(_groups =>  {
        this.groups = [];
        for (const index in _groups) {
          let _group = _groups[index];
          this.groups.push(_group);
        }
      });

    return {lights: this.lights, groups: this.groups}
  }

}
const hueService = new HueService();
module.exports = hueService;
