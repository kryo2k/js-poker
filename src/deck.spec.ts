import { expect } from 'chai';
import 'mocha';

import { Suit, Rank, ICardObject } from './card';
import { Deck, seededRandomizer } from './deck';

describe('Deck', () => {
  it('should create an empty deck.', () => {
    const deck = new Deck();
    expect(deck.length).to.eq(0);
  });

  it('should create a standard deck.', () => {
    const deck = Deck.standard();
    expect(deck.length).to.eq(52);
  });

  it('should create a standard deck X4.', () => {
    const deck = Deck.standard(4);
    expect(deck.length).to.eq(208);
  });

  it('should create with array provided.', () => {
    const
    cards : ICardObject[] = [
      { suit: Suit.CLUB, rank: Rank.ACE }
    ],
    deck = new Deck(cards);
    expect(deck.length).to.eq(1);
    expect(deck.cards).to.eq(cards);
  });

  it('should be able to find a card.', () => {
    const
    cards : ICardObject[] = [
      { suit: Suit.CLUB, rank: Rank.ACE },
      { suit: Suit.CLUB, rank: Rank.TWO },
      { suit: Suit.CLUB, rank: Rank.THREE },
      { suit: Suit.CLUB, rank: Rank.FOUR },
      { suit: Suit.CLUB, rank: Rank.FIVE },
      { suit: Suit.CLUB, rank: Rank.FIVE }
    ],
    deck = new Deck(cards);
    expect(deck.indexOf(Suit.DIAMOND,Rank.ACE)).to.eq(-1);
    expect(deck.indexOf(Suit.CLUB,Rank.ACE)).to.eq(0);
    expect(deck.indexOf(Suit.CLUB,Rank.TWO)).to.eq(1);
    expect(deck.indexOf(Suit.CLUB,Rank.THREE)).to.eq(2);
    expect(deck.indexOf(Suit.CLUB,Rank.FOUR)).to.eq(3);

    const indexOf5C = deck.indexOf(Suit.CLUB,Rank.FIVE);

    expect(indexOf5C).to.eq(4);
    expect(deck.indexOf(Suit.CLUB,Rank.FIVE, indexOf5C + 1)).to.eq(5);
  });

  it('should let me deal a card', () => {
    const deck = new Deck([
      { suit: Suit.CLUB, rank: Rank.ACE },
      { suit: Suit.CLUB, rank: Rank.TWO },
      { suit: Suit.CLUB, rank: Rank.THREE }
    ]);

    expect(deck.length).to.eq(3);
    expect(deck.deal()).to.deep.eq({ suit: Suit.CLUB, rank: Rank.ACE });
    expect(deck.length).to.eq(2);
    expect(deck.deal()).to.deep.eq({ suit: Suit.CLUB, rank: Rank.TWO });
    expect(deck.length).to.eq(1);
    expect(deck.deal()).to.deep.eq({ suit: Suit.CLUB, rank: Rank.THREE });
    expect(deck.length).to.eq(0);
    expect(deck.deal()).to.eq(false);
    expect(deck.length).to.eq(0);
  });

  it('should let me shuffle with a custom randomizer', () => {
    const deck = new Deck([
      { suit: Suit.CLUB, rank: Rank.ACE },
      { suit: Suit.CLUB, rank: Rank.TWO },
      { suit: Suit.CLUB, rank: Rank.THREE }
    ]);

    deck.shuffle(undefined, () => 1);

    expect(deck.indexOf(Suit.CLUB, Rank.THREE)).to.eq(0);
    expect(deck.indexOf(Suit.CLUB, Rank.ACE)).to.eq(1);
    expect(deck.indexOf(Suit.CLUB, Rank.TWO)).to.eq(2);

    deck.shuffle(undefined, () => 0.5); // unshuffle it

    expect(deck.indexOf(Suit.CLUB, Rank.ACE)).to.eq(0);
    expect(deck.indexOf(Suit.CLUB, Rank.TWO)).to.eq(1);
    expect(deck.indexOf(Suit.CLUB, Rank.THREE)).to.eq(2);
  });
});
