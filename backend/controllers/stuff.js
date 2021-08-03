const Project = require('../models/projects');
const http = require('http');

function httpRequest(options) {
  return new Promise(function (resolve, reject) {
    var req = http.request(options, function (res) {
      if (res.statusCode >= 200) { resolve("online"); }
    });
    req.on('timeout', () => {
      resolve("timeout");
    });
    req.on('error', error => {
      console.error(error)
    })
    req.end();
  });
}
exports.createProject = (req, res, next) => {
  const project = new Project({
    projectName: req.body.projectName,
  });
  project.save().then(
    () => {
      res.status(201).json({
        message: 'Project saved successfully!'
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

exports.deleteProject = (req, res, next) => {
  Project.deleteOne({ _id: req.params.id }).then(
    () => {
      setTimeout(() => {
        res.status(200).json({
          message: 'Deleted!'
        });
      }, 3000);

    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deviceCheck = async (req, res, next) => {
  if (req.body.configs != undefined) {
    const objURL = new URL(req.body.configs[0].configUrl);
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
    httpRequest(options).then(
      function (body) {
        res.status(200).json({ "Status": body })
      }

    );
  }
  else {
    res.status(200).json({ "Status": "confignotfound" });
  }
};

exports.createDevice = (req, res, next) => {
  let device = { ip_no: req.body.ip_no };
  Project.updateOne({ _id: req.params.id }, { $push: { devices: device } }).then
    (
      () => {
        res.status(201).json({
          message: 'Device created successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    )
    ;
}


exports.createConfig = (req, res, next) => {
  let config = { appName: req.body.appName, configUrl: req.body.configUrl };
  Project.updateOne({ _id: req.params.id, "devices.ip_no": req.params.ip }, { $push: { "devices.$.configs": config } }).then
    (
      () => {
        res.status(201).json({
          message: 'Config created successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    )
    ;
}