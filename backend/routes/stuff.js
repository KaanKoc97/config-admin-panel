const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('', stuffCtrl.getAllDevice);
router.get('/:id', stuffCtrl.getOneProject);
router.post('/deviceCheck', stuffCtrl.deviceCheck);
router.post('/addProject', stuffCtrl.createProject);
router.put('/:id', stuffCtrl.modifyDevice);
router.delete('/:id', stuffCtrl.deleteProject);
module.exports = router;