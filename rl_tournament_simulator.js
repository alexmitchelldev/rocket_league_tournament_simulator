const classes = require('./classes.js');

let GOAL_PROBABILITY = 60;

const initSimulator = () => {
    console.log('Welcome!');
};

const playGame = (team1, team2) => {
    let gameResult = {
        winner: {
            name: null,
            goals: null
        },
        loser: {
            name: null,
            goals: null
        },
        overtimeGame: false
    }

    const team1Goals    = calculateGoalsScored(team1);
    const team2Goals    = calculateGoalsScored(team2);

    if (team1Goals !== team2Goals) {
        gameResult.winner.name  = (team1Goals > team2Goals) ? team1.name : team2.name;
        gameResult.winner.goals = (team1Goals > team2Goals) ? team1Goals : team2Goals;
        gameResult.loser.name   =  (team1Goals > team2Goals) ? team2.name : team1.name;
        gameResult.loser.goals = (team1Goals > team2Goals) ? team2Goals : team1Goals;
    } else {
        let teams = [team1, team2];
        let overtimeResult = handleOvertime(teams);

        gameResult.overtimeGame = true;
        gameResult.winner.name  = teams[overtimeResult.winner].name;
        gameResult.winner.goals = overtimeResult.winner === 0 ? (team1Goals + 1) : (team2Goals + 1);
        gameResult.loser.name = teams[overtimeResult.loser].name;
        gameResult.loser.goals  = overtimeResult.winner === 0 ? team2Goals : team1Goals;
    }

    return gameResult;
};

const calculateGoalsScored = team => {
    let goalsScored = 0;
    let allGoalsScored = false;

    while (!allGoalsScored) {
        if (shotOnGoal(team) === 'GOAL') {
            goalsScored++;
            GOAL_PROBABILITY += 10;
        } else {
            allGoalsScored = true;
            GOAL_PROBABILITY = 60;
        } 
    }

    return goalsScored;
};

const shotOnGoal = team => {
    return ((Math.floor(Math.random() * GOAL_PROBABILITY) + 1) < team.rating) ? 'GOAL' : null;
};

const handleOvertime = (teams) => {
    let goalScored = false;
    let currentTeam = Math.floor(Math.random() * 2);
    let result = {
        winner: null,
        loser: null
    }

    while (!goalScored) {
        if (shotOnGoal(teams[currentTeam]) === 'GOAL') {
            goalScored = true;
            result.winner   = currentTeam;
            result.loser    = switchTeam(currentTeam);
            GOAL_PROBABILITY = 60;
        } else {
            currentTeam = switchTeam(currentTeam);
        }
    }

    return result;
};

const switchTeam = teamNumber => {
    let oppositeTeam = teamNumber === 0 ? 1 : 0;
    
    return oppositeTeam;
};