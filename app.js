const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));

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

app.get("/", function(req, res) {
    res.send("Welcome to our first API");
});

app.get("/team", function (req, res) {
    res.status(200).json({
        teamArray,
    });
});

app.get("/team/:teamID", function (req, res) {

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

app.post("/team", function (req, res) {
    teamArray.push({
        id: req.body.id,
        name: req.body.name,
    });
    res.status(200).json({
        teamArray
    });
});

app.post("/team/add-players/:teamID", function (req, res) {

    teamArray.forEach(currentTeam => {
    if (currentTeam.id == req.params.teamID) {
        currentTeam.playersArray.forEach(currentPlayer => {
            if (currentPlayer === req.body) {
                console.log("Player Already Exists");
            } else {
            currentTeam.playersArray.push(req.body);
            }
        })
    }
})
    res.status(200).json({
        teamArray
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT: ${PORT}`);
});