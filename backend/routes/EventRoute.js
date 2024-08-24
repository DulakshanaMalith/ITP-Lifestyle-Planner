const express = require("express");
const EventController = require("../controllers/EventController");

const Router = express.Router();

Router.get("/", EventController.getAllEvents);
Router.get("/:id", EventController.getEventById);
Router.post("/", EventController.addEvent);
Router.put("/:id", EventController.updateEvent);
Router.delete("/:id", EventController.deleteEvent);

module.exports = Router;
