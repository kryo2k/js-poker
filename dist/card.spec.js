"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const card_1 = require("./card");
describe('Card', () => {
    ;
    const allCards = [
        [card_1.Suit.CLUB, card_1.Rank.TWO],
        [card_1.Suit.CLUB, card_1.Rank.THREE],
        [card_1.Suit.CLUB, card_1.Rank.FOUR],
        [card_1.Suit.CLUB, card_1.Rank.FIVE],
        [card_1.Suit.CLUB, card_1.Rank.SIX],
        [card_1.Suit.CLUB, card_1.Rank.SEVEN],
        [card_1.Suit.CLUB, card_1.Rank.EIGHT],
        [card_1.Suit.CLUB, card_1.Rank.NINE],
        [card_1.Suit.CLUB, card_1.Rank.TEN],
        [card_1.Suit.CLUB, card_1.Rank.JACK],
        [card_1.Suit.CLUB, card_1.Rank.QUEEN],
        [card_1.Suit.CLUB, card_1.Rank.KING],
        [card_1.Suit.CLUB, card_1.Rank.ACE],
        [card_1.Suit.DIAMOND, card_1.Rank.TWO],
        [card_1.Suit.DIAMOND, card_1.Rank.THREE],
        [card_1.Suit.DIAMOND, card_1.Rank.FOUR],
        [card_1.Suit.DIAMOND, card_1.Rank.FIVE],
        [card_1.Suit.DIAMOND, card_1.Rank.SIX],
        [card_1.Suit.DIAMOND, card_1.Rank.SEVEN],
        [card_1.Suit.DIAMOND, card_1.Rank.EIGHT],
        [card_1.Suit.DIAMOND, card_1.Rank.NINE],
        [card_1.Suit.DIAMOND, card_1.Rank.TEN],
        [card_1.Suit.DIAMOND, card_1.Rank.JACK],
        [card_1.Suit.DIAMOND, card_1.Rank.QUEEN],
        [card_1.Suit.DIAMOND, card_1.Rank.KING],
        [card_1.Suit.DIAMOND, card_1.Rank.ACE],
        [card_1.Suit.HEART, card_1.Rank.TWO],
        [card_1.Suit.HEART, card_1.Rank.THREE],
        [card_1.Suit.HEART, card_1.Rank.FOUR],
        [card_1.Suit.HEART, card_1.Rank.FIVE],
        [card_1.Suit.HEART, card_1.Rank.SIX],
        [card_1.Suit.HEART, card_1.Rank.SEVEN],
        [card_1.Suit.HEART, card_1.Rank.EIGHT],
        [card_1.Suit.HEART, card_1.Rank.NINE],
        [card_1.Suit.HEART, card_1.Rank.TEN],
        [card_1.Suit.HEART, card_1.Rank.JACK],
        [card_1.Suit.HEART, card_1.Rank.QUEEN],
        [card_1.Suit.HEART, card_1.Rank.KING],
        [card_1.Suit.HEART, card_1.Rank.ACE],
        [card_1.Suit.SPADE, card_1.Rank.TWO],
        [card_1.Suit.SPADE, card_1.Rank.THREE],
        [card_1.Suit.SPADE, card_1.Rank.FOUR],
        [card_1.Suit.SPADE, card_1.Rank.FIVE],
        [card_1.Suit.SPADE, card_1.Rank.SIX],
        [card_1.Suit.SPADE, card_1.Rank.SEVEN],
        [card_1.Suit.SPADE, card_1.Rank.EIGHT],
        [card_1.Suit.SPADE, card_1.Rank.NINE],
        [card_1.Suit.SPADE, card_1.Rank.TEN],
        [card_1.Suit.SPADE, card_1.Rank.JACK],
        [card_1.Suit.SPADE, card_1.Rank.QUEEN],
        [card_1.Suit.SPADE, card_1.Rank.KING],
        [card_1.Suit.SPADE, card_1.Rank.ACE]
    ];
    describe('toObject()', () => {
        allCards.forEach(cardSpec => {
            const suit = cardSpec[0], rank = cardSpec[1], label = card_1.toShortString(suit, rank);
            it(`should process card: ${label}`, () => {
                const t = card_1.toObject(suit, rank);
                chai_1.expect(t.suit).to.eq(suit);
                chai_1.expect(t.rank).to.eq(rank);
            });
        });
    });
    describe('toNumber()', () => {
        allCards.forEach(cardSpec => {
            const suit = cardSpec[0], rank = cardSpec[1], label = card_1.toShortString(suit, rank);
            it(`should process card: ${label}`, () => {
                const t = card_1.toNumber(suit, rank);
                chai_1.expect(t).to.be.a('number');
                chai_1.expect(isNaN(t)).to.eq(false);
                chai_1.expect(isFinite(t)).to.eq(true);
                chai_1.expect(t).to.be.gt(0);
            });
        });
    });
    describe('fromNumber()', () => {
        allCards.forEach(cardSpec => {
            const suit = cardSpec[0], rank = cardSpec[1], label = card_1.toShortString(suit, rank);
            it(`should process card: ${label}`, () => {
                const n = card_1.toNumber(suit, rank), t = card_1.fromNumber(n);
                chai_1.expect(t).to.not.be.a('boolean');
                if (t !== false) {
                    chai_1.expect(t.suit).to.eq(suit);
                    chai_1.expect(t.rank).to.eq(rank);
                }
            });
        });
    });
    describe('fromShortString()', () => {
        allCards.forEach(cardSpec => {
            const suit = cardSpec[0], rank = cardSpec[1], label = card_1.toShortString(suit, rank);
            it(`should process card: ${label}`, () => {
                const t = card_1.fromShortString(label);
                chai_1.expect(t).to.not.be.a('boolean');
                if (t !== false) {
                    chai_1.expect(t.suit).to.eq(suit);
                    chai_1.expect(t.rank).to.eq(rank);
                }
            });
        });
    });
    describe('handString()', () => {
        ;
        const tests = [
            [
                [
                    [card_1.Suit.CLUB, card_1.Rank.ACE],
                    [card_1.Suit.HEART, card_1.Rank.KING]
                ],
                'AC|KH'
            ],
            [
                [
                    [card_1.Suit.SPADE, card_1.Rank.NINE],
                    [card_1.Suit.CLUB, card_1.Rank.JACK],
                    [card_1.Suit.CLUB, card_1.Rank.SEVEN],
                    [card_1.Suit.HEART, card_1.Rank.TWO],
                    [card_1.Suit.SPADE, card_1.Rank.EIGHT]
                ],
                '9S|JC|7C|2H|8S'
            ]
        ];
        tests.forEach(test => {
            const cards = test[0].map(s => card_1.toObject(s[0], s[1])), expectResult = test[1];
            it(`should map ${cards.length} card(s) to: ${expectResult}`, () => {
                chai_1.expect(card_1.handString(...cards)).to.eq(expectResult);
            });
        });
    });
    describe('stringHand()', () => {
        ;
        const tests = [
            [
                'AC|KH',
                [
                    [card_1.Suit.CLUB, card_1.Rank.ACE],
                    [card_1.Suit.HEART, card_1.Rank.KING]
                ]
            ],
            [
                '9S|JC|7C|2H|8S',
                [
                    [card_1.Suit.SPADE, card_1.Rank.NINE],
                    [card_1.Suit.CLUB, card_1.Rank.JACK],
                    [card_1.Suit.CLUB, card_1.Rank.SEVEN],
                    [card_1.Suit.HEART, card_1.Rank.TWO],
                    [card_1.Suit.SPADE, card_1.Rank.EIGHT]
                ]
            ]
        ];
        tests.forEach(test => {
            const str = test[0], expectResult = test[1].map(s => card_1.toObject(s[0], s[1]));
            it(`should map hand ${str} back into ${expectResult.length} card(s)`, () => {
                chai_1.expect(card_1.stringHand(str)).to.deep.eq(expectResult);
            });
        });
    });
});
//# sourceMappingURL=card.spec.js.map