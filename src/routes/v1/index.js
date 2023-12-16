const express = require('express');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const gameRoute = require('./game.route');
const contactUsRoute = require('./contactUs.route');
const aboutUsRoute = require('./aboutUs.route');
const teacherRoute = require('./teacher.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/admin',
    route: adminRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/games',
    route: gameRoute,
  },
  {
    path: '/contactUs',
    route: contactUsRoute,
  },
  {
    path: '/aboutUs',
    route: aboutUsRoute,
  }
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
