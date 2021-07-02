const Project = require('../models/projects');
const http = require('http')

exports.createDevice = (req, res, next) => {
  const project = new Project({
    name: req.body.name,
    devices: req.body.devices
  });
  project.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getAllDevice = (req, res, next) => {
  Project.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.getOneProject = (req, res, next) => {
  Project.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyDevice = (req, res, next) => {
  const thing = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published
  };
  device.updateOne({ _id: req.params.id }, { $set: thing }).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteDevice = (req, res, next) => {
  device.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Deleted!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.statusControl = (req, res, next) => {
  console.log("IP:", req.body.ip);
  const objURL = new URL(req.body.ip);
  console.log("Host:" + objURL.hostname);
  console.log("Port:" + objURL.port);
  console.log("Path:" + objURL.pathname);
  var options = {
    hostname: objURL.hostname,
    port: objURL.port,
    path: objURL.pathname,
    method: 'GET',
    query: {
      "func": "getconfig"
    },
    timeout: 3000,
  };
  console.log("Query:" + options.query.func);
  const request = http.request(options, response => {
    console.log(`statusCode: ${response.statusCode}`)
    res.send({"Status": "online"});

  })
  request.on('timeout', () => {
    res.send({"Status": "timeout"})
  });

  request.on('error', error => {
    console.error(error)
  })

  request.end()
};