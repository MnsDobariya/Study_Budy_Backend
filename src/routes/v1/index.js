const express = require('express');
const userRoute = require('./user.route');
const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const gameRoute = require('./game.route');
const contactUsRoute = require('./contactUs.route');
const aboutUsRoute = require('./aboutUs.route');
const assignmentsRoute = require('./assignments.route');
const toDosRoute = require('./todos.route');
const eventRoute=require('./event.route');
const resourcesRouter = require('./resources.route');
const notificationRoute = require('./notification.route');
const roomRoute = require('./room.route');
const chatRoute = require('./chat.route');
const taskRoute = require('./task.route');
const discussionRoomRoute = require('./discussionRoom.route');
const discussionChatRoute = require('./discussionChat.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/event',
    route: eventRoute,
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
    path: '/todos',
    route: toDosRoute,
  },
  {
    path: '/resources',
    route: resourcesRouter,
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
  },
  {
    path: '/assignments',
    route: assignmentsRoute,
  },
  {
    path: '/notification',
    route: notificationRoute,
  },
  {
    path: '/room',
    route: roomRoute,
  },
  {
    path: '/chat',
    route: chatRoute,
  },
  {
    path: '/task',
    route: taskRoute,
  },
  {
    path: '/discussionRoom',
    route: discussionRoomRoute,
  },
  {
    path: '/discussionChat',
    route: discussionChatRoute,
  },
];


defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
