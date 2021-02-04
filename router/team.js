const express = require('express');
const router = express.Router();

let teamArray = [
    {
        id: 1,
        name: "lakers",
        playersArray: [],
    },
    {
        id: 2,
        name: "Celtics",
        playersArray: [],
    },
    {
        id: 3,
        name: "Bulls",
        playersArray: [],
    },
];

let teamArrayNums = [
    {
        id: 1,
        name: "lakers",
        playersArray: [
            {
                player: "kobe"
            }, 
            {
                player: "shaq"
            }
        ]
    },
    {
        id: 2,
        name: "Celtics",
        playersArray: [],
    },
    {
        id: 3,
        name: "Bulls",
        playersArray: [],
    },
];

let showTeamArray = [
    {
      "team": "lakers" 
    },
    {
      "team": "knicks"
    },
    {
      "team": "nets"
    }
  ]

// app.get("/", function(req, res) {
//     res.send("Welcome to our first API");
// });

router.get("/", function (req, res) {
    res.status(200).render("team", { teams: showTeamArray });
    // console.log(req.query);
    // res.status(200).json({
    //   //teamArray,
    //   query: req.query,
    // });
  });

router.get("/:teamID", function (req, res) {

    teamArray.forEach(currentTeam => {
        if (currentTeam.id == req.params.teamID) {
            finalTeamResult = currentTeam;
        } else {
            finalTeamResult = "Team does not exist"
        };
    });
    
    res.status(200).json({
        team: finalTeamResult,
    });
});

router.post("/", function (req, res) {
    teamArray.push({
        id: req.body.id,
        name: req.body.name,
    });
    res.status(200).json({
        teamArray
    });
});

router.post("/add-players/:teamID", function (req, res) {

    teamArray.forEach(currentTeam => {
    if (currentTeam.id == req.params.teamID) {
        if (!currentTeam.playersArray.includes(Object.values(req.body).toString())) {
            currentTeam.playersArray.push(Object.values(req.body).toString())
        } else {
            console.log("Duplicate Player")
        }
    }
})
    res.status(200).json({
        teamArray
    });
});

router.put("/update-number/:teamID/:player", function(req, res) {
    teamArrayNums.forEach(team => {
        if (team.id == req.params.teamID) {
            team.playersArray.forEach(person => {
                if (Object.values(person) == req.params.player) {
                    Object.assign(person, req.query);
                }}
                )};
    });
    res.status(200).json({
        teamArrayNums
    });
});

router.delete("/delete-by-name/:teamID/:player", function(req, res) {
    teamArrayNums.forEach(team => {
        if (req.params.teamID == team.id) {
            team.playersArray.forEach(jersey => {
                if (Object.values(jersey) == req.params.player) {
                    delete jersey.player;
                } else {
                    console.log("player does not exist");
                }
            });
        };
    });
    res.status(200).json({
        teamArrayNums
    });
});

module.exports = router;