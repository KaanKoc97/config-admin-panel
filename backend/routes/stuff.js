const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');

router.get('', stuffCtrl.getAllDevice);
router.get('/:id', stuffCtrl.getOneProject);
router.post('/configs', stuffCtrl.statusControl);
router.post('', stuffCtrl.createDevice);
router.put('/:id', stuffCtrl.modifyDevice);
router.delete('/:id', stuffCtrl.deleteDevice);
module.exports = router;