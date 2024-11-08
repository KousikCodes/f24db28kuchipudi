const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Array of image file names
  const image_names = [ 'greatwallofchina.jpg', 'machupicchu.jpg', 'pyramids.jpg', 'greatwall2.jpg', 'pyramids2.jpg'];

  res.render('randomitem', { title: 'A random item', image_names: image_names });
});

module.exports = router;