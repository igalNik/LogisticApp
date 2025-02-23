const mongoose = require('mongoose');
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log('DB connection successful!'));

app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV === 'develoopment')
    console.log(`App running on port ${process.env.PORT}`);
});
