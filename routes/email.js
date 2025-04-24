const express = require('express');
const { sendEmail } = require('../services/senEmail');
const router = express.Router();


router.post('/send-email', async (req, res) => {
  const { toEmail } = req.body;
  try {
    const response = await sendEmail(toEmail);
    res.status(200).json({ message: 'Email sent successfully', response });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;