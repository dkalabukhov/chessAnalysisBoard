/* eslint-disable */
"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var matchFullFEN = /^\s*([prnbqkPRNBQK12345678]{1,8}(?:\/[prnbqkPRNBQK12345678]{1,8}){7})\s+(w|b)\s+([KQkqA-Ha-h]{1,4}|\-)\s+(?:(?:([a-h][36]|\-)\s+(\d{1,3})\s+(\d{1,4}))|(?:0\s+0))\s*$/;
var fenExpand = /[1-8]+/g;
var fenPack = /\-+/g;
var fenSubst = { 1: '-', 2: '--', 3: '---', 4: '----', 5: '-----', 6: '------', 7: '-------', 8: '--------' };
var FenParser = (function () {
    function FenParser(value) {
        this.original = '';
        this.isValid = false;
        this.positions = '';
        this.ranks = [];
        this.turn = '';
        this.castles = '';
        this.enpass = '';
        this.halfmoveClock = 0;
        this.moveNumber = 0;
        this.original = (typeof value === 'string') ? value : '';
        var match = this.original.match(matchFullFEN);
        this.isValid = !!match;
        if (match) {
            this.positions = match[1];
            this.ranks = match[1].split('/').map(function (s) { return s.replace(fenExpand, function (i) { return fenSubst[i]; }); });
            this.turn = match[2];
            this.castles = match[3];
            this.enpass = match[4] !== undefined ? match[4] : '-';
            this.halfmoveClock = match[5] !== undefined ? parseInt(match[5], 10) : 0;
            this.moveNumber = match[6] !== undefined ? parseInt(match[6], 10) : 1;
            this.isValid = this.ranks.reduce(function (before, rank) { return before && rank.length === 8; }, true);
        }
    }
    FenParser.prototype.toString = function () {
        var positions = this.ranks.map(function (rank) { return rank.replace(fenPack, function (m) { return m.length.toString(); }); }).join('/');
        return positions + " " + this.turn + " " + this.castles + " " + this.enpass + " " + this.halfmoveClock + " " + this.moveNumber;
    };
    FenParser.prototype.hasPiece = function (piece) {
        return this.positions.indexOf(piece) >= 0;
    };
    FenParser.prototype.counts = function () {
        var counts = {};
        for (var _i = 0, _a = this.ranks; _i < _a.length; _i++) {
            var rank = _a[_i];
            for (var _b = 0, rank_1 = rank; _b < rank_1.length; _b++) {
                var ch = rank_1[_b];
                if (ch !== '-') {
                    counts[ch] = (counts[ch] || 0) + 1;
                }
            }
        }
        return counts;
    };
    FenParser.isFen = function (text) { return (typeof text === 'string' && matchFullFEN.test(text)); };
    return FenParser;
}());
export default FenParser;
//# sourceMappingURL=fenParser.js.map