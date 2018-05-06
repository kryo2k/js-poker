"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./card");
const Chance = require("chance");
class Deck {
    constructor(cards = []) {
        this.cards = cards;
    }
    get length() {
        return this.cards.length;
    }
    deal() {
        const next = this.cards.shift();
        return (typeof next === 'undefined') ? false : next;
    }
    shuffle(times, randomizer) {
        Deck.shuffle(this.cards, times, randomizer);
        return this;
    }
    indexOf(suit, rank, fromIndex) {
        const cards = this.cards, length = cards.length;
        let current, cursor = (typeof fromIndex === 'undefined' || !cards.hasOwnProperty(fromIndex)) ? 0 : fromIndex;
        while (cursor < length) {
            current = cards[cursor];
            if (typeof current === 'object' && current.rank === rank && current.suit === suit)
                return cursor;
            cursor++;
        }
        return -1;
    }
    indexOfObject(card, fromIndex) {
        return this.indexOf(card.suit, card.rank, fromIndex);
    }
    static shuffle(arr, times = 1, randomizer = Math.random) {
        times = (isNaN(times) || !isFinite(times) || times < 1) ? 1 : times;
        const length = arr.length;
        let i, j;
        for (i = 0; i < times; i++)
            for (j = 0; j < length; j++) {
                let s = arr[j], k = Math.floor(randomizer() * length) % length;
                arr[j] = arr[k];
                arr[k] = s;
            }
        return arr;
    }
    static standard(times = 1) {
        times = (isNaN(times) || !isFinite(times) || times < 1) ? 1 : times;
        var x, y, z, cards = [];
        for (x = 0; x < times; x++)
            for (y = 0; y < 4; y++)
                for (z = 0; z < 13; z++)
                    cards.push(card_1.toObject(y, z));
        return new Deck(cards);
    }
}
exports.Deck = Deck;
;
function seededRandomizer(seed) {
    const rng = new Chance(seed);
    return rng.floating.bind(rng, { min: 0, max: 1 });
}
exports.seededRandomizer = seededRandomizer;
;
//# sourceMappingURL=deck.js.map