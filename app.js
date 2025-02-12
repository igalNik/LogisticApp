const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).send('success!'));

const port = 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
