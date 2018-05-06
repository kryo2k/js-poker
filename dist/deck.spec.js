"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const card_1 = require("./card");
const deck_1 = require("./deck");
describe('Deck', () => {
    it('should create an empty deck.', () => {
        const deck = new deck_1.Deck();
        chai_1.expect(deck.length).to.eq(0);
    });
    it('should create a standard deck.', () => {
        const deck = deck_1.Deck.standard();
        chai_1.expect(deck.length).to.eq(52);
    });
    it('should create a standard deck X4.', () => {
        const deck = deck_1.Deck.standard(4);
        chai_1.expect(deck.length).to.eq(208);
    });
    it('should create with array provided.', () => {
        const cards = [
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.ACE }
        ], deck = new deck_1.Deck(cards);
        chai_1.expect(deck.length).to.eq(1);
        chai_1.expect(deck.cards).to.eq(cards);
    });
    it('should be able to find a card.', () => {
        const cards = [
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.ACE },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.TWO },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.THREE },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.FOUR },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.FIVE },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.FIVE }
        ], deck = new deck_1.Deck(cards);
        chai_1.expect(deck.indexOf(card_1.Suit.DIAMOND, card_1.Rank.ACE)).to.eq(-1);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.ACE)).to.eq(0);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.TWO)).to.eq(1);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.THREE)).to.eq(2);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.FOUR)).to.eq(3);
        const indexOf5C = deck.indexOf(card_1.Suit.CLUB, card_1.Rank.FIVE);
        chai_1.expect(indexOf5C).to.eq(4);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.FIVE, indexOf5C + 1)).to.eq(5);
    });
    it('should let me deal a card', () => {
        const deck = new deck_1.Deck([
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.ACE },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.TWO },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.THREE }
        ]);
        chai_1.expect(deck.length).to.eq(3);
        chai_1.expect(deck.deal()).to.deep.eq({ suit: card_1.Suit.CLUB, rank: card_1.Rank.ACE });
        chai_1.expect(deck.length).to.eq(2);
        chai_1.expect(deck.deal()).to.deep.eq({ suit: card_1.Suit.CLUB, rank: card_1.Rank.TWO });
        chai_1.expect(deck.length).to.eq(1);
        chai_1.expect(deck.deal()).to.deep.eq({ suit: card_1.Suit.CLUB, rank: card_1.Rank.THREE });
        chai_1.expect(deck.length).to.eq(0);
        chai_1.expect(deck.deal()).to.eq(false);
        chai_1.expect(deck.length).to.eq(0);
    });
    it('should let me shuffle with a custom randomizer', () => {
        const deck = new deck_1.Deck([
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.ACE },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.TWO },
            { suit: card_1.Suit.CLUB, rank: card_1.Rank.THREE }
        ]);
        deck.shuffle(undefined, () => 1);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.THREE)).to.eq(0);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.ACE)).to.eq(1);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.TWO)).to.eq(2);
        deck.shuffle(undefined, () => 0.5); // unshuffle it
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.ACE)).to.eq(0);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.TWO)).to.eq(1);
        chai_1.expect(deck.indexOf(card_1.Suit.CLUB, card_1.Rank.THREE)).to.eq(2);
    });
});
//# sourceMappingURL=deck.spec.js.map