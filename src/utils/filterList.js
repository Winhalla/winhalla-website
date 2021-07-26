import formatTime from "./formatTime";

const filterList = {

    time_played: {
        filterFunction: function (a, b) {
            return b.matchtime - a.matchtime
        },
        display: function (object) {
            return formatTime(object.matchtime);
        },
    },

    level: {
        filterFunction: function (a, b) {
            return b.level - a.level
        },
        display: function (object) {
            return object.level;
        },
        onlyLegends: true
    },

    games_played: {
        filterFunction: function (a, b) {
            return b.games - a.games
        },
        display: function (object) {
            return object.games;
        }
    },

    win_rate: {
        filterFunction: function (a, b) {
            return (b.wins / b.games) - (a.wins / a.games)
        },
        display: function (object) {
            return parseInt(object.wins / object.games * 100).toString() + "%";
        },
        onlyLegends: true
    },

    kos: {
        filterFunction: function (a, b) {
            return b.kos - a.kos
        },
        display: function (object) {
            return object.kos;
        }
    },

    damage_dealt: {
        filterFunction: function (a, b) {
            return b.damagedealt - a.damagedealt
        },
        display: function (object) {
            return object.damagedealt;
        }
    },

}

export default filterList;