const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
import authRoutes from './routes/auth';
const analyticsRoutes = require('./routes/analytics');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const categoryRoutes = require('./routes/category');
const app = express();
import keys from './config/keys';

mongoose.connect(keys.mongoUri)
  .then(() => {
    console.log('mongo connected true');
  }).catch(error =>  console.log(error)
   );
app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', passport.authenticate(
  'jwt', { session: false }
), analyticsRoutes);
app.use('/api/order', passport.authenticate(
  'jwt', { session: false }
), orderRoutes);
app.use('/api/position', passport.authenticate(
  'jwt', { session: false }
), positionRoutes);
app.use('/api/category', passport.authenticate(
  'jwt', { session: false }
), categoryRoutes);

export default app;
