const express = require('express');
const router = express.Router();
const Component = require('../models/Component');

// Get all components
router.get('/', async (req, res) => {
  try {
    const components = await Component.find();
    res.json(components);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a component
router.post('/', async (req, res) => {
  try {
    const component = new Component({
      name: req.body.name,
      description: req.body.description,
      type: req.body.type,
      status: req.body.status || 'operational'
    });

    const newComponent = await component.save();
    res.status(201).json(newComponent);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A component with this name already exists' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Update a component
router.put('/:id', async (req, res) => {
  try {
    const component = await Component.findById(req.params.id);
    if (!component) {
      return res.status(404).json({ message: 'Component not found' });
    }

    if (req.body.name) component.name = req.body.name;
    if (req.body.description) component.description = req.body.description;
    if (req.body.type) component.type = req.body.type;
    if (req.body.status) component.status = req.body.status;

    const updatedComponent = await component.save();
    res.json(updatedComponent);
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ message: 'A component with this name already exists' });
    }
    res.status(400).json({ message: error.message });
  }
});

// Delete a component
router.delete('/:id', async (req, res) => {
  try {
    const deletedComponent = await Component.findByIdAndDelete(req.params.id);
    if (!deletedComponent) {
      return res.status(404).json({ message: 'Component not found' });
    }
    res.json({ message: 'Component deleted successfully', component: deletedComponent });
  } catch (error) {
    console.error('Error deleting component:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 