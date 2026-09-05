const express = require('express');
const router = express.Router();
const {
  createDrive,
  getDrives,
  getDriveById,
  updateDrive,
  deleteDrive,
} = require('../controllers/driveController');

router.route('/').post(createDrive).get(getDrives);
router.route('/:id').get(getDriveById).put(updateDrive).delete(deleteDrive);

module.exports = router;
