const player = class Player {
    constructor(name, attack, defence) {
        this.name       = name;
        this.attack     = attack;
        this.defence    = defence;
        this.rating     = this.attack + this.defence;
    }
}

const team = class Team {
    constructor(name, players) {
        this.name       = name;
        this.players    = players;
        this.rating     = this.calculateTeamScore();
    }

    calculateTeamScore () {
        let teamScore = 0;

        this.players.forEach(player => {
            teamScore += player.rating;
        });

        return teamScore;
    }
}

module.exports = {player, team}