const express = require('express');
const CodeVersion = require('../models/CodeVersion');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/code/save
// @desc    Save a code version
// @access  Private
router.post('/save', auth, async (req, res) => {
  try {
    const { code, review, language } = req.body;
    const linesOfCode = code.split('\n').length;

    const codeVersion = new CodeVersion({
      user: req.user._id,
      code,
      language: language || 'javascript',
      review,
      linesOfCode
    });

    await codeVersion.save();
    res.json({ message: 'Code version saved', codeVersion });
  } catch (error) {
    console.error('Save code error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/code/versions
// @desc    Get all code versions for user
// @access  Private
router.get('/versions', auth, async (req, res) => {
  try {
    const versions = await CodeVersion.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(50);
    res.json({ versions });
  } catch (error) {
    console.error('Get versions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/code/versions/:id
// @desc    Get a specific code version
// @access  Private
router.get('/versions/:id', auth, async (req, res) => {
  try {
    const version = await CodeVersion.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!version) {
      return res.status(404).json({ message: 'Version not found' });
    }
    
    res.json({ version });
  } catch (error) {
    console.error('Get version error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

