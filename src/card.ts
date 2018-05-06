export enum Suit {
  CLUB,
  DIAMOND,
  HEART,
  SPADE
};

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

export interface ICardObject { suit: Suit; rank: Rank; };

export interface I2CardHand {
  0 : ICardObject;
  1 : ICardObject;
};

export interface I5CardHand extends Array<ICardObject>{
  0 : ICardObject;
  1 : ICardObject;
  2 : ICardObject;
  3 : ICardObject;
  4 : ICardObject;
};

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

export function toObject(suit: Suit, rank: Rank) : ICardObject {
  return { suit, rank };
};

export function toLongString(suit: Suit, rank: Rank) : string {
  return `${Rank[rank]} OF ${Suit[suit]}S`;
};

export function toNumber(suit: Suit, rank: Rank) : number {
  return RANKPRIMES[rank] | (rank << 8) | SUITNUMS[suit] | (1 << (16 + rank));
};

export function isCardObject(v : any) : v is ICardObject {
  return (typeof v === 'object'
    && typeof v.suit === 'number'
    && typeof v.rank === 'number'
  )
};

export function isHand5(v : any) : v is I5CardHand {
  return Array.isArray(v) && v.length === 5
    && isCardObject(v[0])
    && isCardObject(v[1])
    && isCardObject(v[2])
    && isCardObject(v[3])
    && isCardObject(v[4]);
};

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

export function toShortString(suit: Suit, rank: Rank) : string {
  const rankChr = RANKCHR[rank], suitChr = SUITCHR[suit];
  return SUITLAST ? rankChr + suitChr : suitChr + rankChr;
};

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

export var DELIMITER : string = '|';

export function handString(... cards : ICardObject[]) : string {
  return cards.map(c => toShortString(c.suit, c.rank)).join(DELIMITER);
};

export function stringHand(hand : string) : ICardObject[] {
  return hand.split(DELIMITER).reduce((p, c) => {
    const d = fromShortString(c);
    if(d === false) return p;
    p.push(d);
    return p;
  }, [] as ICardObject[]);
};

export function str2(str : string) : I2CardHand {
  const  h : any = stringHand(str).slice(0, 2);

  if(h.length < 2)
    throw new RangeError(`str2 should have at least 2 cards; found = ${h.length}`);

  if(isCardObject(h[0])
  && isCardObject(h[1]))
    return h as I2CardHand;

  throw new Error('Invalid 2 card hand.');
};

export function str5(str : string) : I5CardHand {
  const  h = stringHand(str).slice(0, 5);

  if(!isHand5(h))
    throw new RangeError(`Invalid 5 card hand: ${JSON.stringify(str)}.`);

  return h;
};

export function str7(str : string) : I7CardHand {
  const  h : any = stringHand(str).slice(0, 7);

  if(!isHand7(h))
    throw new RangeError(`Invalid 7 card hand: ${JSON.stringify(str)}.`);

  return h;
};
