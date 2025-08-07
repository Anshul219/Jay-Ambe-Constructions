const express = require('express');
const Newsletter = require('../models/Newsletter');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    // Check if already subscribed
    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      if (existingSubscriber.isActive) {
        return res.status(400).json({ 
          success: false, 
          message: 'You are already subscribed to our newsletter!' 
        });
      } else {
        // Reactivate subscription
        existingSubscriber.isActive = true;
        await existingSubscriber.save();
        return res.json({ 
          success: true, 
          message: 'Welcome back! Your subscription has been reactivated.' 
        });
      }
    }

    // Create new subscription
    const subscriber = new Newsletter({
      email: email.toLowerCase(),
      source: req.body.source || 'website_footer'
    });

    await subscriber.save();

    res.json({ 
      success: true, 
      message: 'Thank you for subscribing to our newsletter! You\'ll receive updates about our latest projects and offers.' 
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'This email is already subscribed to our newsletter!' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Failed to subscribe. Please try again later.' 
    });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }

    const subscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    if (!subscriber) {
      return res.status(404).json({ 
        success: false, 
        message: 'Email not found in our subscription list.' 
      });
    }

    subscriber.isActive = false;
    await subscriber.save();

    res.json({ 
      success: true, 
      message: 'You have been successfully unsubscribed from our newsletter.' 
    });

  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to unsubscribe. Please try again later.' 
    });
  }
});

// Get all subscribers (admin only)
router.get('/subscribers', auth, async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ isActive: true })
      .sort({ subscribedAt: -1 });

    res.json({
      success: true,
      data: subscribers,
      total: subscribers.length
    });

  } catch (error) {
    console.error('Get subscribers error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch subscribers.' 
    });
  }
});

// Send newsletter (admin only)
router.post('/send', auth, async (req, res) => {
  try {
    const { subject, content } = req.body;

    if (!subject || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Subject and content are required' 
      });
    }

    // Get all active subscribers
    const subscribers = await Newsletter.find({ isActive: true });
    
    // Here you would integrate with an email service like SendGrid, Mailgun, etc.
    // For now, we'll just log the email details
    console.log('Newsletter to send:', {
      subject,
      content,
      recipients: subscribers.length
    });

    res.json({ 
      success: true, 
      message: `Newsletter sent to ${subscribers.length} subscribers!` 
    });

  } catch (error) {
    console.error('Send newsletter error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send newsletter.' 
    });
  }
});

module.exports = router; 