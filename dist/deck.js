"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const card_1 = require("./card");
const Chance = require("chance");
/**
* Main class for Deck object
*/
class Deck {
    constructor(cards = []) {
        this.cards = cards;
    }
    /**
    * Length of cards in this deck.
    */
    get length() {
        return this.cards.length;
    }
    /**
    * Deal the next card (from top), or returns FALSE if there
    * is not enough cards in deck.
    */
    deal() {
        const next = this.cards.shift();
        return (typeof next === 'undefined') ? false : next;
    }
    /**
    * Shuffles cards in this deck. Allows specifying a number of times
    * to repeat the operation, as well as providing your own randomizer
    * function.
    */
    shuffle(times, randomizer) {
        Deck.shuffle(this.cards, times, randomizer);
        return this;
    }
    /**
    * Finds the next index of the provided suit and rank, with support for
    * an optional starting index. Starts from beginning if fromIndex is not
    * provided or invalid.
    */
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
    /**
    * Finds the next index of the provided card object, with support for
    * an optional starting index. Starts from beginning if fromIndex is not
    * provided or invalid.
    */
    indexOfObject(card, fromIndex) {
        return this.indexOf(card.suit, card.rank, fromIndex);
    }
    /**
    * Static function to shuffle an array (in place) with options for number
    * of times to repeat operation, and also a custom randomizer function.
    */
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
    /**
    * Shortcut for creating a new standard 52 card deck (unshuffled).
    */
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
/**
* Creates a new randomizer function using a string or number seed to
* control the sequence cards are dealt.
*/
function seededRandomizer(seed) {
    const rng = new Chance(seed);
    return rng.floating.bind(rng, { min: 0, max: 1 });
}
exports.seededRandomizer = seededRandomizer;
;
//# sourceMappingURL=deck.js.map