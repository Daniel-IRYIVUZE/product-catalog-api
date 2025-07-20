const express = require('express');
const app = express();

app.patch('/:productId/variants/:variantId/stock', (req, res) => {
  res.json(req.params);
});

app.listen(3000, () => console.log('Server running'));