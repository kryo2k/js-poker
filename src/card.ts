
/**
* Card suit unum for standard playing cards
*/
export enum Suit {
  CLUB,
  DIAMOND,
  HEART,
  SPADE
};

/**
* Card rank unum for standard playing cards (no jokers)
*/
export enum Rank {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE
};

/**
* Primitive card object.
*/
export interface ICardObject { suit: Suit; rank: Rank; };

/**
* A two card hand
*/
export interface I2CardHand {
  0 : ICardObject;
  1 : ICardObject;
};

/**
* A five card hand
*/
export interface I5CardHand extends Array<ICardObject>{
  0 : ICardObject;
  1 : ICardObject;
  2 : ICardObject;
  3 : ICardObject;
  4 : ICardObject;
};

/**
* A seven card hand
*/
export interface I7CardHand extends Array<ICardObject>{
  0 : ICardObject;
  1 : ICardObject;
  2 : ICardObject;
  3 : ICardObject;
  4 : ICardObject;
  5 : ICardObject;
  6 : ICardObject;
};

const
SUITNUMS   = [32768,16384,8192,4096],
RANKPRIMES = [2,3,5,7,11,13,17,19,23,29,31,37,41],
SUITCHR    = 'CDHS',
RANKCHR    = '23456789TJQKA',
SUITLAST   = true;

/**
* Convert a suit and rank to a card object
*/
export function toObject(suit: Suit, rank: Rank) : ICardObject {
  return { suit, rank };
};

/**
* Convert a suit and rank to a long card string (i.e. ACE OF DIAMONDS)
*/
export function toLongString(suit: Suit, rank: Rank) : string {
  return `${Rank[rank]} OF ${Suit[suit]}S`;
};

/**
* Convert a suit and rank to a number (using prime numbers)
*/
export function toNumber(suit: Suit, rank: Rank) : number {
  return RANKPRIMES[rank] | (rank << 8) | SUITNUMS[suit] | (1 << (16 + rank));
};

/**
* Determine if argument is a valid card object.
*/
export function isCardObject(v : any) : v is ICardObject {
  return (typeof v === 'object'
    && typeof v.suit === 'number'
    && typeof v.rank === 'number'
  )
};

/**
* Is a 5 carded hand.
*/
export function isHand5(v : any) : v is I5CardHand {
  return Array.isArray(v) && v.length === 5
    && isCardObject(v[0])
    && isCardObject(v[1])
    && isCardObject(v[2])
    && isCardObject(v[3])
    && isCardObject(v[4]);
};

/**
* Is a 7 carded hand.
*/
export function isHand7(v : any) : v is I7CardHand {
  return Array.isArray(v) && v.length === 7
    && isCardObject(v[0])
    && isCardObject(v[1])
    && isCardObject(v[2])
    && isCardObject(v[3])
    && isCardObject(v[4])
    && isCardObject(v[5])
    && isCardObject(v[6]);
};

/**
* Convert a number into a card object, or return FALSE if invalid.
*/
export function fromNumber(num: number) : ICardObject|false {

  let
  suit : Suit|undefined,
  rank : Rank = (num >> 8) & 0xF;

  if((num & SUITNUMS[0])) suit = Suit.CLUB;
  if((num & SUITNUMS[1])) suit = Suit.DIAMOND;
  if((num & SUITNUMS[2])) suit = Suit.HEART;
  if((num & SUITNUMS[3])) suit = Suit.SPADE;

  if(typeof suit === 'undefined' || Suit[suit] === undefined || Rank[rank] === undefined)
    return false;

  return { suit, rank };
};

/**
* convert a suit and rank into a short string (i.e. AC)
*/
export function toShortString(suit: Suit, rank: Rank) : string {
  const rankChr = RANKCHR[rank], suitChr = SUITCHR[suit];
  return SUITLAST ? rankChr + suitChr : suitChr + rankChr;
};

/**
* Convert a short string back into a card object, or returns FALSE if invalid.
*/
export function fromShortString(str: string) : ICardObject|false {
  if(!str || str.length < 2) return false;

  const
  rankChr = str[SUITLAST ? 0 : 1],
  rankIdx = RANKCHR.indexOf(rankChr.toUpperCase()),
  suitChr = str[SUITLAST ? 1 : 0],
  suitIdx = SUITCHR.indexOf(suitChr.toUpperCase());

  if(rankIdx === -1 || suitIdx === -1)
    return false;

  return { suit: suitIdx, rank: rankIdx };
};

/**
* Delimiter to use in handString/stringHand operations.
*/
export var DELIMITER : string = '|';

/**
* Hand string function converts card objects into a string (i.e. AC|JC|TC|KC|QC)
*/
export function handString(... cards : ICardObject[]) : string {
  return cards.map(c => toShortString(c.suit, c.rank)).join(DELIMITER);
};

/**
* Converts a hand string back into an array of card objects
*/
export function stringHand(hand : string) : ICardObject[] {
  return hand.split(DELIMITER).reduce((p, c) => {
    const d = fromShortString(c);
    if(d === false) return p;
    p.push(d);
    return p;
  }, [] as ICardObject[]);
};

/**
* Create a 2 carded hand from string.
*/
export function str2(str : string) : I2CardHand {
  const  h : any = stringHand(str).slice(0, 2);

  if(h.length < 2)
    throw new RangeError(`str2 should have at least 2 cards; found = ${h.length}`);

  if(isCardObject(h[0])
  && isCardObject(h[1]))
    return h as I2CardHand;

  throw new Error('Invalid 2 card hand.');
};

/**
* Create a 5 carded hand from string.
*/
export function str5(str : string) : I5CardHand {
  const  h = stringHand(str).slice(0, 5);

  if(!isHand5(h))
    throw new RangeError(`Invalid 5 card hand: ${JSON.stringify(str)}.`);

  return h;
};

/**
* Create a 7 carded hand from string.
*/
export function str7(str : string) : I7CardHand {
  const  h : any = stringHand(str).slice(0, 7);

  if(!isHand7(h))
    throw new RangeError(`Invalid 7 card hand: ${JSON.stringify(str)}.`);

  return h;
};
