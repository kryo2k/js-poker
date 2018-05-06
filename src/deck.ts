import { ICardObject, toObject, Suit, Rank } from './card';
import Chance = require('chance');

export class Deck {
  constructor(
    public cards : ICardObject[] = []
  ) {}

  get length () : number {
    return this.cards.length;
  }

  deal () : ICardObject|false {
    const next = this.cards.shift();
    return (typeof next === 'undefined') ? false : next;
  }

  shuffle (times ?: number, randomizer ?: () => number) : Deck {
    Deck.shuffle(this.cards, times, randomizer);
    return this;
  }

  indexOf (suit : Suit, rank : Rank, fromIndex ?: number) : number {

    const
    cards  = this.cards,
    length = cards.length;

    let
    current : ICardObject,
    cursor  : number = (typeof fromIndex === 'undefined' || !cards.hasOwnProperty(fromIndex)) ? 0 : fromIndex;

    while(cursor < length) {
      current = cards[cursor];

      if(typeof current === 'object' && current.rank === rank && current.suit === suit)
        return cursor;

      cursor++;
    }

    return -1;
  }

  indexOfObject (card: ICardObject, fromIndex ?: number) : number {
    return this.indexOf(card.suit, card.rank, fromIndex);
  }

  static shuffle<T>(arr : T[], times: number = 1, randomizer : () => number = Math.random) : T[] {

    times = (isNaN(times)||!isFinite(times)||times<1) ? 1 : times;

    const length = arr.length;
    let i : number, j : number;

    for(i=0; i < times; i++)
    for(j=0; j < length; j++) {
      let
      s = arr[j],
      k = Math.floor(randomizer()*length) % length;
      arr[j] = arr[k];
      arr[k] = s;
    }

    return arr;
  }

  static standard(times : number = 1) : Deck {

    times = (isNaN(times)||!isFinite(times)||times<1) ? 1 : times;

    var x, y, z, cards : ICardObject[] = [];
    for(x=0; x<times; x++)
    for(y=0; y<4; y++)
    for(z=0; z<13; z++)
      cards.push(toObject(y,z));

    return new Deck(cards);
  }
};

export function seededRandomizer(seed : Chance.Seed) : () => number {
  const rng = new Chance(seed);
  return rng.floating.bind(rng, { min : 0, max: 1 });
};
