const { Router } = require('express');
const Device = require('../models/device');
const DeviceStats = require('../models/device_statistic');

const router = new Router();

// Read All (GET)
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create (POST)
router.post('/', async (req, res) => {
  try {
    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Create (POST)
router.post('/stats', async (req, res) => {
  try {
    const device = await Device.findOne({ device_id: req.body.dev_id });
    if (!device) {
      res.status(404).json({ error: 'Device not found' });
      return;
    }
    delete req.body.dev_id;
    req.body.dev_id = device._id;
    const data = await DeviceStats.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Read One (GET) using dev_id
router.get('/:device_id', async (req, res) => {
  try {
    const device = await Device.findOne({ dev_id: req.params.device_id });
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Update (PUT)
router.put('/:device_id', async (req, res) => {
  try {
    const device = await Device.findByIdAndUpdate(
      req.params.device_id,
      req.body,
      {
        new: true,
      },
    );
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

// Delete (DELETE)
router.delete('/:device_id', async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.device_id);
    res.json({ message: 'Device deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;
