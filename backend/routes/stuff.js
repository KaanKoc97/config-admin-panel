const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('/getAllDevice', stuffCtrl.getAllDevice);
router.get('/getOneProject/:id', stuffCtrl.getOneProject);
router.post('/deviceCheck', stuffCtrl.deviceCheck);
router.post('/addProject', stuffCtrl.createProject);
router.post('/addDevice/:id', stuffCtrl.createDevice);
router.post('/addConfig/:id/:ip', stuffCtrl.createConfig);
router.put('/modifyDevice/:id/:ip', stuffCtrl.modifyDevice);
router.delete('/:id', stuffCtrl.deleteProject);
module.exports = router;