module.exports = app => {
  const matches = require("../controllers/match.controller.js");

  var router = require("express").Router();

  // Create a new Match
  router.post("/", matches.create);

  // Retrieve all Matches
  router.get("/", matches.findAll);

  // Retrieve all Matches
  router.get("/all", matches.getTotal);

  // Retrieve all Players
  router.get("/players", matches.getPlayers)

  // Retrieve all matches json
  router.get("/dump", matches.getAllMatches)

  // Get matches from uploader app
  router.post("/external", matches.uploadSingle)

  app.use('/api/matches', router);
}