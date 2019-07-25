const express = require('express');
const bodyParser = require('body-parser');
const hueService = require('./api/services/HueService');

const app = express();

const lights = [];
const groups = [];

const getData = async() => {
  await hueService.getHues().then(
    _data => {
      this.lights = _data.lights
      this.groups = _data.groups
    }
  );
}

const getLightbyId = (id) => {
  return this.lights.find(
    _light => {
      return _light.hueID === id;
    }
  );
}

const getGroupbyName = (name) => {
  return this.groups.find(
    _group => {
      return _group.name === name;
    }
  );
}

getData();

app.use(bodyParser.json());

app.listen(8080, () => {console.log('Listening on port 8080')});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500);
  res.json({message: err.message});
  next();
});

app.use((req, res, next) => {
  console.log(`${req.originalUrl}, ${req.headers}, ${JSON.stringify(req.body)}`);
  next();
});

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      lights: this.lights,
      groups: this.groups
    }
  });
});

app.get('/lights', (req, res) => {
  res.status(200).json({
    message: 'success',
    data: this.lights
  });
});

app.get('/groups', (req, res) => {
  res.status(200).json({
    message: 'success',
    data: this.groups
  });
});

app.get('/groups/:name', (req, res) => {
  const group = getGroupbyName(req.params.name);

  if (!group) {
    res.status(400).json({
      message: 'request failed, invalid group name',
      data: []
    });
  } else {
    res.status(200).json({
      message: 'success',
      data: group
    });
  }
});

app.get('/lights/:id', (req, res) => {
  const light = getLightbyId(req.params.id);

  if (!light) {
    res.status(400).json({
      message: `request failed, '${req.params.id}' is not a valid light`,
      data: []
    })
  } else {
    res.status(200).json({
      message: 'success',
      data: light
    });
  }

});
