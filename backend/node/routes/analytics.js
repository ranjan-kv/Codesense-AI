const express = require('express');
const CodeVersion = require('../models/CodeVersion');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/analytics
// @desc    Get analytics data for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const versions = await CodeVersion.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    // Calculate stats
    const totalVersions = versions.length;
    const totalLines = versions.reduce((sum, v) => sum + (v.linesOfCode || 0), 0);
    const bugsFixed = versions.reduce((sum, v) => {
      if (v.review?.feedback) {
        return sum + v.review.feedback.filter(f => f.type === 'Bug').length;
      }
      return sum;
    }, 0);
    
    const qualityScores = versions
      .map(v => v.review?.quality_score)
      .filter(score => score !== undefined && score !== null);
    const avgQualityScore = qualityScores.length > 0
      ? qualityScores.reduce((a, b) => a + b, 0) / qualityScores.length
      : 0;

    // Chart data - last 10 versions
    const chartData = versions.slice(0, 10).reverse().map(v => ({
      date: new Date(v.createdAt).toLocaleDateString(),
      score: v.review?.quality_score || 0
    }));

    // Type distribution
    const typeCounts = {};
    versions.forEach(v => {
      if (v.review?.feedback) {
        v.review.feedback.forEach(f => {
          typeCounts[f.type] = (typeCounts[f.type] || 0) + 1;
        });
      }
    });

    const typeDistribution = Object.entries(typeCounts).map(([type, count]) => ({
      type,
      count
    }));

    res.json({
      stats: {
        totalVersions,
        totalLines,
        bugsFixed,
        avgQualityScore: Math.round(avgQualityScore * 10) / 10
      },
      chartData,
      typeDistribution
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

