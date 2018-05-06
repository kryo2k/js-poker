import { expect } from 'chai';
import 'mocha';

import { Suit, Rank, toObject, toNumber, fromNumber, toShortString, fromShortString, handString, stringHand } from './card';

describe('Card', () => {

  interface CardSpecification {
    0: Suit;
    1: Rank;
  };

  const allCards : CardSpecification[] = [
    [Suit.CLUB,    Rank.TWO],
    [Suit.CLUB,    Rank.THREE],
    [Suit.CLUB,    Rank.FOUR],
    [Suit.CLUB,    Rank.FIVE],
    [Suit.CLUB,    Rank.SIX],
    [Suit.CLUB,    Rank.SEVEN],
    [Suit.CLUB,    Rank.EIGHT],
    [Suit.CLUB,    Rank.NINE],
    [Suit.CLUB,    Rank.TEN],
    [Suit.CLUB,    Rank.JACK],
    [Suit.CLUB,    Rank.QUEEN],
    [Suit.CLUB,    Rank.KING],
    [Suit.CLUB,    Rank.ACE],
    [Suit.DIAMOND, Rank.TWO],
    [Suit.DIAMOND, Rank.THREE],
    [Suit.DIAMOND, Rank.FOUR],
    [Suit.DIAMOND, Rank.FIVE],
    [Suit.DIAMOND, Rank.SIX],
    [Suit.DIAMOND, Rank.SEVEN],
    [Suit.DIAMOND, Rank.EIGHT],
    [Suit.DIAMOND, Rank.NINE],
    [Suit.DIAMOND, Rank.TEN],
    [Suit.DIAMOND, Rank.JACK],
    [Suit.DIAMOND, Rank.QUEEN],
    [Suit.DIAMOND, Rank.KING],
    [Suit.DIAMOND, Rank.ACE],
    [Suit.HEART,   Rank.TWO],
    [Suit.HEART,   Rank.THREE],
    [Suit.HEART,   Rank.FOUR],
    [Suit.HEART,   Rank.FIVE],
    [Suit.HEART,   Rank.SIX],
    [Suit.HEART,   Rank.SEVEN],
    [Suit.HEART,   Rank.EIGHT],
    [Suit.HEART,   Rank.NINE],
    [Suit.HEART,   Rank.TEN],
    [Suit.HEART,   Rank.JACK],
    [Suit.HEART,   Rank.QUEEN],
    [Suit.HEART,   Rank.KING],
    [Suit.HEART,   Rank.ACE],
    [Suit.SPADE,   Rank.TWO],
    [Suit.SPADE,   Rank.THREE],
    [Suit.SPADE,   Rank.FOUR],
    [Suit.SPADE,   Rank.FIVE],
    [Suit.SPADE,   Rank.SIX],
    [Suit.SPADE,   Rank.SEVEN],
    [Suit.SPADE,   Rank.EIGHT],
    [Suit.SPADE,   Rank.NINE],
    [Suit.SPADE,   Rank.TEN],
    [Suit.SPADE,   Rank.JACK],
    [Suit.SPADE,   Rank.QUEEN],
    [Suit.SPADE,   Rank.KING],
    [Suit.SPADE,   Rank.ACE]
  ];

  describe('toObject()', () => {
    allCards.forEach(cardSpec => {
      const suit = cardSpec[0], rank = cardSpec[1], label = toShortString(suit,rank);

      it(`should process card: ${label}`, () => {
        const t = toObject(suit, rank);
        expect(t.suit).to.eq(suit);
        expect(t.rank).to.eq(rank);
      });
    });
  });

  describe('toNumber()', () => {
    allCards.forEach(cardSpec => {
      const suit = cardSpec[0], rank = cardSpec[1], label = toShortString(suit,rank);

      it(`should process card: ${label}`, () => {
        const t = toNumber(suit, rank);

        expect(t).to.be.a('number');
        expect(isNaN(t)).to.eq(false);
        expect(isFinite(t)).to.eq(true);
        expect(t).to.be.gt(0);
      });
    });
  });

  describe('fromNumber()', () => {
    allCards.forEach(cardSpec => {
      const suit = cardSpec[0], rank = cardSpec[1], label = toShortString(suit,rank);

      it(`should process card: ${label}`, () => {
        const
        n = toNumber(suit, rank),
        t = fromNumber(n);

        expect(t).to.not.be.a('boolean');

        if(t !== false) {
          expect(t.suit).to.eq(suit);
          expect(t.rank).to.eq(rank);
        }
      });
    });
  });

  describe('fromShortString()', () => {
    allCards.forEach(cardSpec => {
      const suit = cardSpec[0], rank = cardSpec[1], label = toShortString(suit,rank);

      it(`should process card: ${label}`, () => {
        const t = fromShortString(label);

        expect(t).to.not.be.a('boolean');

        if(t !== false) {
          expect(t.suit).to.eq(suit);
          expect(t.rank).to.eq(rank);
        }
      });
    });
  });

  describe('handString()', () => {

    interface IHandStringTest {
      0 : CardSpecification[],
      1 : string
    };

    const tests : IHandStringTest[] = [
      [
        [
          [Suit.CLUB,  Rank.ACE],
          [Suit.HEART, Rank.KING]
        ],
        'AC|KH'
      ],
      [
        [
          [Suit.SPADE, Rank.NINE],
          [Suit.CLUB,  Rank.JACK],
          [Suit.CLUB,  Rank.SEVEN],
          [Suit.HEART, Rank.TWO],
          [Suit.SPADE, Rank.EIGHT]
        ],
        '9S|JC|7C|2H|8S'
      ]
    ];

    tests.forEach(test => {
      const
      cards = test[0].map(s => toObject(s[0],s[1])),
      expectResult  = test[1];

      it(`should map ${cards.length} card(s) to: ${expectResult}`, () => {
        expect(handString(... cards)).to.eq(expectResult);
      });
    });
  });

  describe('stringHand()', () => {

    interface IStringHandTest {
      0 : string,
      1 : CardSpecification[]
    };

    const tests : IStringHandTest[] = [
      [
        'AC|KH',
        [
          [Suit.CLUB,  Rank.ACE],
          [Suit.HEART, Rank.KING]
        ]
      ],
      [
        '9S|JC|7C|2H|8S',
        [
          [Suit.SPADE, Rank.NINE],
          [Suit.CLUB,  Rank.JACK],
          [Suit.CLUB,  Rank.SEVEN],
          [Suit.HEART, Rank.TWO],
          [Suit.SPADE, Rank.EIGHT]
        ]
      ]
    ];

    tests.forEach(test => {

      const
      str          = test[0],
      expectResult = test[1].map(s => toObject(s[0],s[1]));

      it(`should map hand ${str} back into ${expectResult.length} card(s)`, () => {
        expect(stringHand(str)).to.deep.eq(expectResult);
      });
    });
  });
});
