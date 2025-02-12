require('dotenv').config({ path: './config.env' });
const express = require('express');

const app = express();

app.get('/api/v1/users', (req, res) => res.status(200).json(process.env));

app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV === 'develoopment')
    console.log(`App running on port ${port}`);
});
