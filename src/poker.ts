import { ICardObject } from './card';

const poker = require('../json/poker.json') as {
  suits          : number[];
  ranks          : number[];
  flushes        : number[];
  unique5        : number[];
  products       : number[];
  values         : number[];
  perm7          : number[][];
  handRank       : string[];
  handRankDetail : string[];
};

/**
* Does a binary search on products to find the nearest
* key provided in input.
*/
function findIt(key : number) : number {

  const products = poker.products;

  let
  low  : number = 0,
  high : number = 4887,
  mid  : number, pmid : number;

  while (low <= high) {
    mid  = (high + low) >> 1; // divide by two
    pmid = products[mid];

    if (key < pmid)
      high = mid - 1;
    else if (key > pmid)
      low = mid + 1;
    else
      return mid;
  }

  throw new RangeError(`No match found; key = ${key}`);
}

/**
* Gets the human text description of a hand rank.
*/
export function handRankLabel(rank : HandRank) : string {
  return poker.handRank[rank];
};

/**
* Gets the human text description of a hand rank detail value.
*/
export function handRankDetailLabel(rank : HandRankDetailed) : string {
  return poker.handRankDetail[rank];
};

/**
* Returns the full text description of an evaluation.
*/
export function fullHandRankString(val : number) : string {

  var
  rank       = handRank(val),
  rankStr    = handRankLabel(rank),
  rankDet    = handRankDetailed(val),
  rankDetStr = handRankDetailLabel(rankDet);

  return rankStr + (rankDetStr.length > 0 && rankStr.length > 0 ? ' ' : '') + rankDetStr;
};

/**
* Convert card into it's numerical poker value
*/
export function toValue(card : ICardObject) : number {
  const
  rank = card.rank,
  suit = card.suit;

  return poker.ranks[rank] | (rank << 8) | poker.suits[suit] | (1 << (16 + rank));
};

/**
* Grade 5 cards (as numbers) and get poker hand ranking.
*/
export function rank5num (
  c1 : number,
  c2 : number,
  c3 : number,
  c4 : number,
  c5 : number
) : number {

  const
  q = (c1|c2|c3|c4|c5) >> 16;

  // check for Flushes and StraightFlushes
  if(c1 & c2 & c3 & c4 & c5 & 0xF000)
    return poker.flushes[q];

  // check for Straights and HighCard hands
  const s = poker.unique5[q];
  if(s) return s;

  const
  v = findIt((c1 & 0xFF)
    * (c2 & 0xFF)
    * (c3 & 0xFF)
    * (c4 & 0xFF)
    * (c5 & 0xFF)); // do hard-way check

  return poker.values[v];
};

/**
* Grade 5 cards and get poker hand ranking.
*/
export function rank5(
  c1 : ICardObject,
  c2 : ICardObject,
  c3 : ICardObject,
  c4 : ICardObject,
  c5 : ICardObject
) : number {
  return rank5num(toValue(c1), toValue(c2), toValue(c3), toValue(c4), toValue(c5));
};

/**
* Grade 7 cards (as numbers) and get best 5 card poker hand ranking.
*/
export function rank7num (
  c1 : number,
  c2 : number,
  c3 : number,
  c4 : number,
  c5 : number,
  c6 : number,
  c7 : number
) : number {
  // const args = [c1,c2,c3,c4,c5,c6,c7];
  return poker.perm7.reduce((low,permutation) => Math.min(low, rank5num(
    arguments[ permutation[0] ],
    arguments[ permutation[1] ],
    arguments[ permutation[2] ],
    arguments[ permutation[3] ],
    arguments[ permutation[4] ]
  )), 9999);
};

/**
* Grade 7 cards and get poker hand ranking.
*/
export function rank7(
  c1 : ICardObject,
  c2 : ICardObject,
  c3 : ICardObject,
  c4 : ICardObject,
  c5 : ICardObject,
  c6 : ICardObject,
  c7 : ICardObject
) : number {
  return rank7num(toValue(c1), toValue(c2), toValue(c3), toValue(c4), toValue(c5), toValue(c6), toValue(c7));
};

/**
* ENUM for basic poker hand rank
*/
export enum HandRank {
  ROYAL_FLUSH,
  STRAIGHT_FLUSH,
  FOUR_OF_A_KIND,
  FULL_HOUSE,
  FLUSH,
  STRAIGHT,
  THREE_OF_A_KIND,
  TWO_PAIR,
  ONE_PAIR,
  HIGH_CARD
};

/**
* ENUM for detailed poker hand rank
*/
export enum HandRankDetailed {
  HC_SEVEN,
  HC_EIGHT,
  HC_NINE,
  HC_TEN,
  HC_JACK,
  HC_QUEEN,
  HC_KING,
  HC_ACE,
  PR_TWOS,
  PR_THREES,
  PR_FOURS,
  PR_FIVES,
  PR_SIXES,
  PR_SEVENS,
  PR_EIGHTS,
  PR_NINES,
  PR_TENS,
  PR_JACKS,
  PR_QUEENS,
  PR_KINGS,
  PR_ACES,
  TP_THREES_TWOS,
  TP_FOURS_TWOS,
  TP_FOURS_THREES,
  TP_FIVES_TWOS,
  TP_FIVES_THREES,
  TP_FIVES_FOURS,
  TP_SIXES_TWOS,
  TP_SIXES_THREES,
  TP_SIXES_FOURS,
  TP_SIXES_FIVES,
  TP_SEVENS_TWOS,
  TP_SEVENS_THREES,
  TP_SEVENS_FOURS,
  TP_SEVENS_FIVES,
  TP_SEVENS_SIXES,
  TP_EIGHTS_TWOS,
  TP_EIGHTS_THREES,
  TP_EIGHTS_FOURS,
  TP_EIGHTS_FIVES,
  TP_EIGHTS_SIXES,
  TP_EIGHTS_SEVENS,
  TP_NINES_TWOS,
  TP_NINES_THREES,
  TP_NINES_FOURS,
  TP_NINES_FIVES,
  TP_NINES_SIXES,
  TP_NINES_SEVENS,
  TP_NINES_EIGHTS,
  TP_TENS_TWOS,
  TP_TENS_THREES,
  TP_TENS_FOURS,
  TP_TENS_FIVES,
  TP_TENS_SIXES,
  TP_TENS_SEVENS,
  TP_TENS_EIGHTS,
  TP_TENS_NINES,
  TP_JACKS_TWOS,
  TP_JACKS_THREES,
  TP_JACKS_FOURS,
  TP_JACKS_FIVES,
  TP_JACKS_SIXES,
  TP_JACKS_SEVENS,
  TP_JACKS_EIGHTS,
  TP_JACKS_NINES,
  TP_JACKS_TENS,
  TP_QUEENS_TWOS,
  TP_QUEENS_THREES,
  TP_QUEENS_FOURS,
  TP_QUEENS_FIVES,
  TP_QUEENS_SIXES,
  TP_QUEENS_SEVENS,
  TP_QUEENS_EIGHTS,
  TP_QUEENS_NINES,
  TP_QUEENS_TENS,
  TP_QUEENS_JACKS,
  TP_KINGS_TWOS,
  TP_KINGS_THREES,
  TP_KINGS_FOURS,
  TP_KINGS_FIVES,
  TP_KINGS_SIXES,
  TP_KINGS_SEVENS,
  TP_KINGS_EIGHTS,
  TP_KINGS_NINES,
  TP_KINGS_TENS,
  TP_KINGS_JACKS,
  TP_KINGS_QUEENS,
  TP_ACES_TWOS,
  TP_ACES_THREES,
  TP_ACES_FOURS,
  TP_ACES_FIVES,
  TP_ACES_SIXES,
  TP_ACES_SEVENS,
  TP_ACES_EIGHTS,
  TP_ACES_NINES,
  TP_ACES_TENS,
  TP_ACES_JACKS,
  TP_ACES_QUEENS,
  TP_ACES_KINGS,
  TK_TWOS_FOUR,
  TK_TWOS_FIVE,
  TK_TWOS_SIX,
  TK_TWOS_SEVEN,
  TK_TWOS_EIGHT,
  TK_TWOS_NINE,
  TK_TWOS_TEN,
  TK_TWOS_JACK,
  TK_TWOS_QUEEN,
  TK_TWOS_KING,
  TK_TWOS_ACE,
  TK_THREES_FOUR,
  TK_THREES_FIVE,
  TK_THREES_SIX,
  TK_THREES_SEVEN,
  TK_THREES_EIGHT,
  TK_THREES_NINE,
  TK_THREES_TEN,
  TK_THREES_JACK,
  TK_THREES_QUEEN,
  TK_THREES_KING,
  TK_THREES_ACE,
  TK_FOURS_THREE,
  TK_FOURS_FIVE,
  TK_FOURS_SIX,
  TK_FOURS_SEVEN,
  TK_FOURS_EIGHT,
  TK_FOURS_NINE,
  TK_FOURS_TEN,
  TK_FOURS_JACK,
  TK_FOURS_QUEEN,
  TK_FOURS_KING,
  TK_FOURS_ACE,
  TK_FIVES_THREE,
  TK_FIVES_FOUR,
  TK_FIVES_SIX,
  TK_FIVES_SEVEN,
  TK_FIVES_EIGHT,
  TK_FIVES_NINE,
  TK_FIVES_TEN,
  TK_FIVES_JACK,
  TK_FIVES_QUEEN,
  TK_FIVES_KING,
  TK_FIVES_ACE,
  TK_SIXES_THREE,
  TK_SIXES_FOUR,
  TK_SIXES_FIVE,
  TK_SIXES_SEVEN,
  TK_SIXES_EIGHT,
  TK_SIXES_NINE,
  TK_SIXES_TEN,
  TK_SIXES_JACK,
  TK_SIXES_QUEEN,
  TK_SIXES_KING,
  TK_SIXES_ACE,
  TK_SEVENS_THREE,
  TK_SEVENS_FOUR,
  TK_SEVENS_FIVE,
  TK_SEVENS_SIX,
  TK_SEVENS_EIGHT,
  TK_SEVENS_NINE,
  TK_SEVENS_TEN,
  TK_SEVENS_JACK,
  TK_SEVENS_QUEEN,
  TK_SEVENS_KING,
  TK_SEVENS_ACE,
  TK_EIGHTS_THREE,
  TK_EIGHTS_FOUR,
  TK_EIGHTS_FIVE,
  TK_EIGHTS_SIX,
  TK_EIGHTS_SEVEN,
  TK_EIGHTS_NINE,
  TK_EIGHTS_TEN,
  TK_EIGHTS_JACK,
  TK_EIGHTS_QUEEN,
  TK_EIGHTS_KING,
  TK_EIGHTS_ACE,
  TK_NINES_THREE,
  TK_NINES_FOUR,
  TK_NINES_FIVE,
  TK_NINES_SIX,
  TK_NINES_SEVEN,
  TK_NINES_EIGHT,
  TK_NINES_TEN,
  TK_NINES_JACK,
  TK_NINES_QUEEN,
  TK_NINES_KING,
  TK_NINES_ACE,
  TK_TENS_THREE,
  TK_TENS_FOUR,
  TK_TENS_FIVE,
  TK_TENS_SIX,
  TK_TENS_SEVEN,
  TK_TENS_EIGHT,
  TK_TENS_NINE,
  TK_TENS_JACK,
  TK_TENS_QUEEN,
  TK_TENS_KING,
  TK_TENS_ACE,
  TK_JACKS_THREE,
  TK_JACKS_FOUR,
  TK_JACKS_FIVE,
  TK_JACKS_SIX,
  TK_JACKS_SEVEN,
  TK_JACKS_EIGHT,
  TK_JACKS_NINE,
  TK_JACKS_TEN,
  TK_JACKS_QUEEN,
  TK_JACKS_KING,
  TK_JACKS_ACE,
  TK_QUEENS_THREE,
  TK_QUEENS_FOUR,
  TK_QUEENS_FIVE,
  TK_QUEENS_SIX,
  TK_QUEENS_SEVEN,
  TK_QUEENS_EIGHT,
  TK_QUEENS_NINE,
  TK_QUEENS_TEN,
  TK_QUEENS_JACK,
  TK_QUEENS_KING,
  TK_QUEENS_ACE,
  TK_KINGS_THREE,
  TK_KINGS_FOUR,
  TK_KINGS_FIVE,
  TK_KINGS_SIX,
  TK_KINGS_SEVEN,
  TK_KINGS_EIGHT,
  TK_KINGS_NINE,
  TK_KINGS_TEN,
  TK_KINGS_JACK,
  TK_KINGS_QUEEN,
  TK_KINGS_ACE,
  TK_ACES_THREE,
  TK_ACES_FOUR,
  TK_ACES_FIVE,
  TK_ACES_SIX,
  TK_ACES_SEVEN,
  TK_ACES_EIGHT,
  TK_ACES_NINE,
  TK_ACES_TEN,
  TK_ACES_JACK,
  TK_ACES_QUEEN,
  TK_ACES_KING,
  ST_FIVE,
  ST_SIX,
  ST_SEVEN,
  ST_EIGHT,
  ST_NINE,
  ST_TEN,
  ST_JACK,
  ST_QUEEN,
  ST_KING,
  ST_ACE,
  FL_SEVEN,
  FL_EIGHT,
  FL_NINE,
  FL_TEN,
  FL_JACK,
  FL_QUEEN,
  FL_KING,
  FL_ACE,
  FH_TWOS_THREES,
  FH_TWOS_FOURS,
  FH_TWOS_FIVES,
  FH_TWOS_SIXES,
  FH_TWOS_SEVENS,
  FH_TWOS_EIGHTS,
  FH_TWOS_NINES,
  FH_TWOS_TENS,
  FH_TWOS_JACKS,
  FH_TWOS_QUEENS,
  FH_TWOS_KINGS,
  FH_TWOS_ACES,
  FH_THREES_TWOS,
  FH_THREES_FOURS,
  FH_THREES_FIVES,
  FH_THREES_SIXES,
  FH_THREES_SEVENS,
  FH_THREES_EIGHTS,
  FH_THREES_NINES,
  FH_THREES_TENS,
  FH_THREES_JACKS,
  FH_THREES_QUEENS,
  FH_THREES_KINGS,
  FH_THREES_ACES,
  FH_FOURS_TWOS,
  FH_FOURS_THREES,
  FH_FOURS_FIVES,
  FH_FOURS_SIXES,
  FH_FOURS_SEVENS,
  FH_FOURS_EIGHTS,
  FH_FOURS_NINES,
  FH_FOURS_TENS,
  FH_FOURS_JACKS,
  FH_FOURS_QUEENS,
  FH_FOURS_KINGS,
  FH_FOURS_ACES,
  FH_FIVES_TWOS,
  FH_FIVES_THREES,
  FH_FIVES_FOURS,
  FH_FIVES_SIXES,
  FH_FIVES_SEVENS,
  FH_FIVES_EIGHTS,
  FH_FIVES_NINES,
  FH_FIVES_TENS,
  FH_FIVES_JACKS,
  FH_FIVES_QUEENS,
  FH_FIVES_KINGS,
  FH_FIVES_ACES,
  FH_SIXES_TWOS,
  FH_SIXES_THREES,
  FH_SIXES_FOURS,
  FH_SIXES_FIVES,
  FH_SIXES_SEVENS,
  FH_SIXES_EIGHTS,
  FH_SIXES_NINES,
  FH_SIXES_TENS,
  FH_SIXES_JACKS,
  FH_SIXES_QUEENS,
  FH_SIXES_KINGS,
  FH_SIXES_ACES,
  FH_SEVENS_TWOS,
  FH_SEVENS_THREES,
  FH_SEVENS_FOURS,
  FH_SEVENS_FIVES,
  FH_SEVENS_SIXES,
  FH_SEVENS_EIGHTS,
  FH_SEVENS_NINES,
  FH_SEVENS_TENS,
  FH_SEVENS_JACKS,
  FH_SEVENS_QUEENS,
  FH_SEVENS_KINGS,
  FH_SEVENS_ACES,
  FH_EIGHTS_TWOS,
  FH_EIGHTS_THREES,
  FH_EIGHTS_FOURS,
  FH_EIGHTS_FIVES,
  FH_EIGHTS_SIXES,
  FH_EIGHTS_SEVENS,
  FH_EIGHTS_NINES,
  FH_EIGHTS_TENS,
  FH_EIGHTS_JACKS,
  FH_EIGHTS_QUEENS,
  FH_EIGHTS_KINGS,
  FH_EIGHTS_ACES,
  FH_NINES_TWOS,
  FH_NINES_THREES,
  FH_NINES_FOURS,
  FH_NINES_FIVES,
  FH_NINES_SIXES,
  FH_NINES_SEVENS,
  FH_NINES_EIGHTS,
  FH_NINES_TENS,
  FH_NINES_JACKS,
  FH_NINES_QUEENS,
  FH_NINES_KINGS,
  FH_NINES_ACES,
  FH_TENS_TWOS,
  FH_TENS_THREES,
  FH_TENS_FOURS,
  FH_TENS_FIVES,
  FH_TENS_SIXES,
  FH_TENS_SEVENS,
  FH_TENS_EIGHTS,
  FH_TENS_NINES,
  FH_TENS_JACKS,
  FH_TENS_QUEENS,
  FH_TENS_KINGS,
  FH_TENS_ACES,
  FH_JACKS_TWOS,
  FH_JACKS_THREES,
  FH_JACKS_FOURS,
  FH_JACKS_FIVES,
  FH_JACKS_SIXES,
  FH_JACKS_SEVENS,
  FH_JACKS_EIGHTS,
  FH_JACKS_NINES,
  FH_JACKS_TENS,
  FH_JACKS_QUEENS,
  FH_JACKS_KINGS,
  FH_JACKS_ACES,
  FH_QUEENS_TWOS,
  FH_QUEENS_THREES,
  FH_QUEENS_FOURS,
  FH_QUEENS_FIVES,
  FH_QUEENS_SIXES,
  FH_QUEENS_SEVENS,
  FH_QUEENS_EIGHTS,
  FH_QUEENS_NINES,
  FH_QUEENS_TENS,
  FH_QUEENS_JACKS,
  FH_QUEENS_KINGS,
  FH_QUEENS_ACES,
  FH_KINGS_TWOS,
  FH_KINGS_THREES,
  FH_KINGS_FOURS,
  FH_KINGS_FIVES,
  FH_KINGS_SIXES,
  FH_KINGS_SEVENS,
  FH_KINGS_EIGHTS,
  FH_KINGS_NINES,
  FH_KINGS_TENS,
  FH_KINGS_JACKS,
  FH_KINGS_QUEENS,
  FH_KINGS_ACES,
  FH_ACES_TWOS,
  FH_ACES_THREES,
  FH_ACES_FOURS,
  FH_ACES_FIVES,
  FH_ACES_SIXES,
  FH_ACES_SEVENS,
  FH_ACES_EIGHTS,
  FH_ACES_NINES,
  FH_ACES_TENS,
  FH_ACES_JACKS,
  FH_ACES_QUEENS,
  FH_ACES_KINGS,
  FK_TWOS_THREE,
  FK_TWOS_FOUR,
  FK_TWOS_FIVE,
  FK_TWOS_SIX,
  FK_TWOS_SEVEN,
  FK_TWOS_EIGHT,
  FK_TWOS_NINE,
  FK_TWOS_TEN,
  FK_TWOS_JACK,
  FK_TWOS_QUEEN,
  FK_TWOS_KING,
  FK_TWOS_ACE,
  FK_THREES_TWO,
  FK_THREES_FOUR,
  FK_THREES_FIVE,
  FK_THREES_SIX,
  FK_THREES_SEVEN,
  FK_THREES_EIGHT,
  FK_THREES_NINE,
  FK_THREES_TEN,
  FK_THREES_JACK,
  FK_THREES_QUEEN,
  FK_THREES_KING,
  FK_THREES_ACE,
  FK_FOURS_TWO,
  FK_FOURS_THREE,
  FK_FOURS_FIVE,
  FK_FOURS_SIX,
  FK_FOURS_SEVEN,
  FK_FOURS_EIGHT,
  FK_FOURS_NINE,
  FK_FOURS_TEN,
  FK_FOURS_JACK,
  FK_FOURS_QUEEN,
  FK_FOURS_KING,
  FK_FOURS_ACE,
  FK_FIVES_TWO,
  FK_FIVES_THREE,
  FK_FIVES_FOUR,
  FK_FIVES_SIX,
  FK_FIVES_SEVEN,
  FK_FIVES_EIGHT,
  FK_FIVES_NINE,
  FK_FIVES_TEN,
  FK_FIVES_JACK,
  FK_FIVES_QUEEN,
  FK_FIVES_KING,
  FK_FIVES_ACE,
  FK_SIXES_TWO,
  FK_SIXES_THREE,
  FK_SIXES_FOUR,
  FK_SIXES_FIVE,
  FK_SIXES_SEVEN,
  FK_SIXES_EIGHT,
  FK_SIXES_NINE,
  FK_SIXES_TEN,
  FK_SIXES_JACK,
  FK_SIXES_QUEEN,
  FK_SIXES_KING,
  FK_SIXES_ACE,
  FK_SEVENS_TWO,
  FK_SEVENS_THREE,
  FK_SEVENS_FOUR,
  FK_SEVENS_FIVE,
  FK_SEVENS_SIX,
  FK_SEVENS_EIGHT,
  FK_SEVENS_NINE,
  FK_SEVENS_TEN,
  FK_SEVENS_JACK,
  FK_SEVENS_QUEEN,
  FK_SEVENS_KING,
  FK_SEVENS_ACE,
  FK_EIGHTS_TWO,
  FK_EIGHTS_THREE,
  FK_EIGHTS_FOUR,
  FK_EIGHTS_FIVE,
  FK_EIGHTS_SIX,
  FK_EIGHTS_SEVEN,
  FK_EIGHTS_NINE,
  FK_EIGHTS_TEN,
  FK_EIGHTS_JACK,
  FK_EIGHTS_QUEEN,
  FK_EIGHTS_KING,
  FK_EIGHTS_ACE,
  FK_NINES_TWO,
  FK_NINES_THREE,
  FK_NINES_FOUR,
  FK_NINES_FIVE,
  FK_NINES_SIX,
  FK_NINES_SEVEN,
  FK_NINES_EIGHT,
  FK_NINES_TEN,
  FK_NINES_JACK,
  FK_NINES_QUEEN,
  FK_NINES_KING,
  FK_NINES_ACE,
  FK_TENS_TWO,
  FK_TENS_THREE,
  FK_TENS_FOUR,
  FK_TENS_FIVE,
  FK_TENS_SIX,
  FK_TENS_SEVEN,
  FK_TENS_EIGHT,
  FK_TENS_NINE,
  FK_TENS_JACK,
  FK_TENS_QUEEN,
  FK_TENS_KING,
  FK_TENS_ACE,
  FK_JACKS_TWO,
  FK_JACKS_THREE,
  FK_JACKS_FOUR,
  FK_JACKS_FIVE,
  FK_JACKS_SIX,
  FK_JACKS_SEVEN,
  FK_JACKS_EIGHT,
  FK_JACKS_NINE,
  FK_JACKS_TEN,
  FK_JACKS_QUEEN,
  FK_JACKS_KING,
  FK_JACKS_ACE,
  FK_QUEENS_TWO,
  FK_QUEENS_THREE,
  FK_QUEENS_FOUR,
  FK_QUEENS_FIVE,
  FK_QUEENS_SIX,
  FK_QUEENS_SEVEN,
  FK_QUEENS_EIGHT,
  FK_QUEENS_NINE,
  FK_QUEENS_TEN,
  FK_QUEENS_JACK,
  FK_QUEENS_KING,
  FK_QUEENS_ACE,
  FK_KINGS_TWO,
  FK_KINGS_THREE,
  FK_KINGS_FOUR,
  FK_KINGS_FIVE,
  FK_KINGS_SIX,
  FK_KINGS_SEVEN,
  FK_KINGS_EIGHT,
  FK_KINGS_NINE,
  FK_KINGS_TEN,
  FK_KINGS_JACK,
  FK_KINGS_QUEEN,
  FK_KINGS_ACE,
  FK_ACES_TWO,
  FK_ACES_THREE,
  FK_ACES_FOUR,
  FK_ACES_FIVE,
  FK_ACES_SIX,
  FK_ACES_SEVEN,
  FK_ACES_EIGHT,
  FK_ACES_NINE,
  FK_ACES_TEN,
  FK_ACES_JACK,
  FK_ACES_QUEEN,
  FK_ACES_KING,
  SF_FIVE,
  SF_SIX,
  SF_SEVEN,
  SF_EIGHT,
  SF_NINE,
  SF_TEN,
  SF_JACK,
  SF_QUEEN,
  SF_KING,
  SF_ROYAL,
};

/**
* Classifier for converting a ranked value into a HandRank enum.
*/
export function handRank(val : number) : HandRank {
  if (val > 6185) return HandRank.HIGH_CARD;        // 1277 high card
  if (val > 3325) return HandRank.ONE_PAIR;         // 2860 one pair
  if (val > 2467) return HandRank.TWO_PAIR;         //  858 two pair
  if (val > 1609) return HandRank.THREE_OF_A_KIND;  //  858 three-kind
  if (val > 1599) return HandRank.STRAIGHT;         //   10 straights
  if (val > 322)  return HandRank.FLUSH;            // 1277 flushes
  if (val > 166)  return HandRank.FULL_HOUSE;       //  156 full house
  if (val > 10)   return HandRank.FOUR_OF_A_KIND;   //  156 four-kind
  if (val > 1)    return HandRank.STRAIGHT_FLUSH;   //   10 straight-flushes
  return HandRank.ROYAL_FLUSH;                      //    1 royal flush
};

/**
* Classifier for converting a ranked value into a HandRankDetailed enum.
*/
export function handRankDetailed(val : number) : HandRankDetailed {

  // high-cards
  if(val >= 7459)  return HandRankDetailed.HC_SEVEN;
  if(val >= 7445)  return HandRankDetailed.HC_EIGHT;
  if(val >= 7411)  return HandRankDetailed.HC_NINE;
  if(val >= 7342)  return HandRankDetailed.HC_TEN;
  if(val >= 7217)  return HandRankDetailed.HC_JACK;
  if(val >= 7008)  return HandRankDetailed.HC_QUEEN;
  if(val >= 6679)  return HandRankDetailed.HC_KING;
  if(val >= 6186)  return HandRankDetailed.HC_ACE;

  // pairs
  if(val >= 5966)  return HandRankDetailed.PR_TWOS;
  if(val >= 5746)  return HandRankDetailed.PR_THREES;
  if(val >= 5526)  return HandRankDetailed.PR_FOURS;
  if(val >= 5306)  return HandRankDetailed.PR_FIVES;
  if(val >= 5086)  return HandRankDetailed.PR_SIXES;
  if(val >= 4866)  return HandRankDetailed.PR_SEVENS;
  if(val >= 4646)  return HandRankDetailed.PR_EIGHTS;
  if(val >= 4426)  return HandRankDetailed.PR_NINES;
  if(val >= 4206)  return HandRankDetailed.PR_TENS;
  if(val >= 3986)  return HandRankDetailed.PR_JACKS;
  if(val >= 3766)  return HandRankDetailed.PR_QUEENS;
  if(val >= 3546)  return HandRankDetailed.PR_KINGS;
  if(val >= 3326)  return HandRankDetailed.PR_ACES;

  // two pairs
  if(val >= 3315)  return HandRankDetailed.TP_THREES_TWOS;
  if(val >= 3304)  return HandRankDetailed.TP_FOURS_TWOS;
  if(val >= 3293)  return HandRankDetailed.TP_FOURS_THREES;
  if(val >= 3282)  return HandRankDetailed.TP_FIVES_TWOS;
  if(val >= 3271)  return HandRankDetailed.TP_FIVES_THREES;
  if(val >= 3260)  return HandRankDetailed.TP_FIVES_FOURS;
  if(val >= 3249)  return HandRankDetailed.TP_SIXES_TWOS;
  if(val >= 3238)  return HandRankDetailed.TP_SIXES_THREES;
  if(val >= 3227)  return HandRankDetailed.TP_SIXES_FOURS;
  if(val >= 3216)  return HandRankDetailed.TP_SIXES_FIVES;
  if(val >= 3205)  return HandRankDetailed.TP_SEVENS_TWOS;
  if(val >= 3194)  return HandRankDetailed.TP_SEVENS_THREES;
  if(val >= 3183)  return HandRankDetailed.TP_SEVENS_FOURS;
  if(val >= 3172)  return HandRankDetailed.TP_SEVENS_FIVES;
  if(val >= 3161)  return HandRankDetailed.TP_SEVENS_SIXES;
  if(val >= 3150)  return HandRankDetailed.TP_EIGHTS_TWOS;
  if(val >= 3139)  return HandRankDetailed.TP_EIGHTS_THREES;
  if(val >= 3128)  return HandRankDetailed.TP_EIGHTS_FOURS;
  if(val >= 3117)  return HandRankDetailed.TP_EIGHTS_FIVES;
  if(val >= 3106)  return HandRankDetailed.TP_EIGHTS_SIXES;
  if(val >= 3095)  return HandRankDetailed.TP_EIGHTS_SEVENS;
  if(val >= 3084)  return HandRankDetailed.TP_NINES_TWOS;
  if(val >= 3073)  return HandRankDetailed.TP_NINES_THREES;
  if(val >= 3062)  return HandRankDetailed.TP_NINES_FOURS;
  if(val >= 3051)  return HandRankDetailed.TP_NINES_FIVES;
  if(val >= 3040)  return HandRankDetailed.TP_NINES_SIXES;
  if(val >= 3029)  return HandRankDetailed.TP_NINES_SEVENS;
  if(val >= 3018)  return HandRankDetailed.TP_NINES_EIGHTS;
  if(val >= 3007)  return HandRankDetailed.TP_TENS_TWOS;
  if(val >= 2996)  return HandRankDetailed.TP_TENS_THREES;
  if(val >= 2985)  return HandRankDetailed.TP_TENS_FOURS;
  if(val >= 2974)  return HandRankDetailed.TP_TENS_FIVES;
  if(val >= 2963)  return HandRankDetailed.TP_TENS_SIXES;
  if(val >= 2952)  return HandRankDetailed.TP_TENS_SEVENS;
  if(val >= 2941)  return HandRankDetailed.TP_TENS_EIGHTS;
  if(val >= 2930)  return HandRankDetailed.TP_TENS_NINES;
  if(val >= 2919)  return HandRankDetailed.TP_JACKS_TWOS;
  if(val >= 2908)  return HandRankDetailed.TP_JACKS_THREES;
  if(val >= 2897)  return HandRankDetailed.TP_JACKS_FOURS;
  if(val >= 2886)  return HandRankDetailed.TP_JACKS_FIVES;
  if(val >= 2875)  return HandRankDetailed.TP_JACKS_SIXES;
  if(val >= 2864)  return HandRankDetailed.TP_JACKS_SEVENS;
  if(val >= 2853)  return HandRankDetailed.TP_JACKS_EIGHTS;
  if(val >= 2842)  return HandRankDetailed.TP_JACKS_NINES;
  if(val >= 2831)  return HandRankDetailed.TP_JACKS_TENS;
  if(val >= 2820)  return HandRankDetailed.TP_QUEENS_TWOS;
  if(val >= 2809)  return HandRankDetailed.TP_QUEENS_THREES;
  if(val >= 2798)  return HandRankDetailed.TP_QUEENS_FOURS;
  if(val >= 2787)  return HandRankDetailed.TP_QUEENS_FIVES;
  if(val >= 2776)  return HandRankDetailed.TP_QUEENS_SIXES;
  if(val >= 2765)  return HandRankDetailed.TP_QUEENS_SEVENS;
  if(val >= 2754)  return HandRankDetailed.TP_QUEENS_EIGHTS;
  if(val >= 2743)  return HandRankDetailed.TP_QUEENS_NINES;
  if(val >= 2732)  return HandRankDetailed.TP_QUEENS_TENS;
  if(val >= 2721)  return HandRankDetailed.TP_QUEENS_JACKS;
  if(val >= 2710)  return HandRankDetailed.TP_KINGS_TWOS;
  if(val >= 2699)  return HandRankDetailed.TP_KINGS_THREES;
  if(val >= 2688)  return HandRankDetailed.TP_KINGS_FOURS;
  if(val >= 2677)  return HandRankDetailed.TP_KINGS_FIVES;
  if(val >= 2666)  return HandRankDetailed.TP_KINGS_SIXES;
  if(val >= 2655)  return HandRankDetailed.TP_KINGS_SEVENS;
  if(val >= 2644)  return HandRankDetailed.TP_KINGS_EIGHTS;
  if(val >= 2633)  return HandRankDetailed.TP_KINGS_NINES;
  if(val >= 2622)  return HandRankDetailed.TP_KINGS_TENS;
  if(val >= 2611)  return HandRankDetailed.TP_KINGS_JACKS;
  if(val >= 2600)  return HandRankDetailed.TP_KINGS_QUEENS;
  if(val >= 2589)  return HandRankDetailed.TP_ACES_TWOS;
  if(val >= 2578)  return HandRankDetailed.TP_ACES_THREES;
  if(val >= 2567)  return HandRankDetailed.TP_ACES_FOURS;
  if(val >= 2556)  return HandRankDetailed.TP_ACES_FIVES;
  if(val >= 2545)  return HandRankDetailed.TP_ACES_SIXES;
  if(val >= 2534)  return HandRankDetailed.TP_ACES_SEVENS;
  if(val >= 2523)  return HandRankDetailed.TP_ACES_EIGHTS;
  if(val >= 2512)  return HandRankDetailed.TP_ACES_NINES;
  if(val >= 2501)  return HandRankDetailed.TP_ACES_TENS;
  if(val >= 2490)  return HandRankDetailed.TP_ACES_JACKS;
  if(val >= 2479)  return HandRankDetailed.TP_ACES_QUEENS;
  if(val >= 2468)  return HandRankDetailed.TP_ACES_KINGS;

  // three of a kinds
  if(val === 2467) return HandRankDetailed.TK_TWOS_FOUR;
  if(val >= 2465)  return HandRankDetailed.TK_TWOS_FIVE;
  if(val >= 2462)  return HandRankDetailed.TK_TWOS_SIX;
  if(val >= 2458)  return HandRankDetailed.TK_TWOS_SEVEN;
  if(val >= 2453)  return HandRankDetailed.TK_TWOS_EIGHT;
  if(val >= 2447)  return HandRankDetailed.TK_TWOS_NINE;
  if(val >= 2440)  return HandRankDetailed.TK_TWOS_TEN;
  if(val >= 2432)  return HandRankDetailed.TK_TWOS_JACK;
  if(val >= 2423)  return HandRankDetailed.TK_TWOS_QUEEN;
  if(val >= 2413)  return HandRankDetailed.TK_TWOS_KING;
  if(val >= 2402)  return HandRankDetailed.TK_TWOS_ACE;
  if(val === 2401) return HandRankDetailed.TK_THREES_FOUR;
  if(val >= 2399)  return HandRankDetailed.TK_THREES_FIVE;
  if(val >= 2396)  return HandRankDetailed.TK_THREES_SIX;
  if(val >= 2392)  return HandRankDetailed.TK_THREES_SEVEN;
  if(val >= 2387)  return HandRankDetailed.TK_THREES_EIGHT;
  if(val >= 2381)  return HandRankDetailed.TK_THREES_NINE;
  if(val >= 2374)  return HandRankDetailed.TK_THREES_TEN;
  if(val >= 2366)  return HandRankDetailed.TK_THREES_JACK;
  if(val >= 2357)  return HandRankDetailed.TK_THREES_QUEEN;
  if(val >= 2347)  return HandRankDetailed.TK_THREES_KING;
  if(val >= 2336)  return HandRankDetailed.TK_THREES_ACE;
  if(val === 2335) return HandRankDetailed.TK_FOURS_THREE;
  if(val >= 2333)  return HandRankDetailed.TK_FOURS_FIVE;
  if(val >= 2330)  return HandRankDetailed.TK_FOURS_SIX;
  if(val >= 2326)  return HandRankDetailed.TK_FOURS_SEVEN;
  if(val >= 2321)  return HandRankDetailed.TK_FOURS_EIGHT;
  if(val >= 2315)  return HandRankDetailed.TK_FOURS_NINE;
  if(val >= 2308)  return HandRankDetailed.TK_FOURS_TEN;
  if(val >= 2300)  return HandRankDetailed.TK_FOURS_JACK;
  if(val >= 2291)  return HandRankDetailed.TK_FOURS_QUEEN;
  if(val >= 2281)  return HandRankDetailed.TK_FOURS_KING;
  if(val >= 2270)  return HandRankDetailed.TK_FOURS_ACE;
  if(val === 2269) return HandRankDetailed.TK_FIVES_THREE;
  if(val >= 2267)  return HandRankDetailed.TK_FIVES_FOUR;
  if(val >= 2264)  return HandRankDetailed.TK_FIVES_SIX;
  if(val >= 2260)  return HandRankDetailed.TK_FIVES_SEVEN;
  if(val >= 2255)  return HandRankDetailed.TK_FIVES_EIGHT;
  if(val >= 2249)  return HandRankDetailed.TK_FIVES_NINE;
  if(val >= 2242)  return HandRankDetailed.TK_FIVES_TEN;
  if(val >= 2234)  return HandRankDetailed.TK_FIVES_JACK;
  if(val >= 2225)  return HandRankDetailed.TK_FIVES_QUEEN;
  if(val >= 2215)  return HandRankDetailed.TK_FIVES_KING;
  if(val >= 2204)  return HandRankDetailed.TK_FIVES_ACE;
  if(val === 2203) return HandRankDetailed.TK_SIXES_THREE;
  if(val >= 2201)  return HandRankDetailed.TK_SIXES_FOUR;
  if(val >= 2198)  return HandRankDetailed.TK_SIXES_FIVE;
  if(val >= 2194)  return HandRankDetailed.TK_SIXES_SEVEN;
  if(val >= 2189)  return HandRankDetailed.TK_SIXES_EIGHT;
  if(val >= 2183)  return HandRankDetailed.TK_SIXES_NINE;
  if(val >= 2176)  return HandRankDetailed.TK_SIXES_TEN;
  if(val >= 2168)  return HandRankDetailed.TK_SIXES_JACK;
  if(val >= 2159)  return HandRankDetailed.TK_SIXES_QUEEN;
  if(val >= 2149)  return HandRankDetailed.TK_SIXES_KING;
  if(val >= 2138)  return HandRankDetailed.TK_SIXES_ACE;
  if(val === 2137) return HandRankDetailed.TK_SEVENS_THREE;
  if(val >= 2135)  return HandRankDetailed.TK_SEVENS_FOUR;
  if(val >= 2132)  return HandRankDetailed.TK_SEVENS_FIVE;
  if(val >= 2128)  return HandRankDetailed.TK_SEVENS_SIX;
  if(val >= 2123)  return HandRankDetailed.TK_SEVENS_EIGHT;
  if(val >= 2117)  return HandRankDetailed.TK_SEVENS_NINE;
  if(val >= 2110)  return HandRankDetailed.TK_SEVENS_TEN;
  if(val >= 2102)  return HandRankDetailed.TK_SEVENS_JACK;
  if(val >= 2093)  return HandRankDetailed.TK_SEVENS_QUEEN;
  if(val >= 2083)  return HandRankDetailed.TK_SEVENS_KING;
  if(val >= 2072)  return HandRankDetailed.TK_SEVENS_ACE;
  if(val === 2071) return HandRankDetailed.TK_EIGHTS_THREE;
  if(val >= 2069)  return HandRankDetailed.TK_EIGHTS_FOUR;
  if(val >= 2066)  return HandRankDetailed.TK_EIGHTS_FIVE;
  if(val >= 2062)  return HandRankDetailed.TK_EIGHTS_SIX;
  if(val >= 2057)  return HandRankDetailed.TK_EIGHTS_SEVEN;
  if(val >= 2051)  return HandRankDetailed.TK_EIGHTS_NINE;
  if(val >= 2044)  return HandRankDetailed.TK_EIGHTS_TEN;
  if(val >= 2037)  return HandRankDetailed.TK_EIGHTS_JACK;
  if(val >= 2027)  return HandRankDetailed.TK_EIGHTS_QUEEN;
  if(val >= 2018)  return HandRankDetailed.TK_EIGHTS_KING;
  if(val >= 2006)  return HandRankDetailed.TK_EIGHTS_ACE;
  if(val === 2005) return HandRankDetailed.TK_NINES_THREE;
  if(val >= 2003)  return HandRankDetailed.TK_NINES_FOUR;
  if(val >= 2000)  return HandRankDetailed.TK_NINES_FIVE;
  if(val >= 1996)  return HandRankDetailed.TK_NINES_SIX;
  if(val >= 1991)  return HandRankDetailed.TK_NINES_SEVEN;
  if(val >= 1985)  return HandRankDetailed.TK_NINES_EIGHT;
  if(val >= 1978)  return HandRankDetailed.TK_NINES_TEN;
  if(val >= 1970)  return HandRankDetailed.TK_NINES_JACK;
  if(val >= 1961)  return HandRankDetailed.TK_NINES_QUEEN;
  if(val >= 1951)  return HandRankDetailed.TK_NINES_KING;
  if(val >= 1940)  return HandRankDetailed.TK_NINES_ACE;
  if(val === 1939) return HandRankDetailed.TK_TENS_THREE;
  if(val >= 1937)  return HandRankDetailed.TK_TENS_FOUR;
  if(val >= 1934)  return HandRankDetailed.TK_TENS_FIVE;
  if(val >= 1930)  return HandRankDetailed.TK_TENS_SIX;
  if(val >= 1925)  return HandRankDetailed.TK_TENS_SEVEN;
  if(val >= 1919)  return HandRankDetailed.TK_TENS_EIGHT;
  if(val >= 1912)  return HandRankDetailed.TK_TENS_NINE;
  if(val >= 1904)  return HandRankDetailed.TK_TENS_JACK;
  if(val >= 1895)  return HandRankDetailed.TK_TENS_QUEEN;
  if(val >= 1885)  return HandRankDetailed.TK_TENS_KING;
  if(val >= 1874)  return HandRankDetailed.TK_TENS_ACE;
  if(val === 1873) return HandRankDetailed.TK_JACKS_THREE;
  if(val >= 1871)  return HandRankDetailed.TK_JACKS_FOUR;
  if(val >= 1868)  return HandRankDetailed.TK_JACKS_FIVE;
  if(val >= 1864)  return HandRankDetailed.TK_JACKS_SIX;
  if(val >= 1859)  return HandRankDetailed.TK_JACKS_SEVEN;
  if(val >= 1853)  return HandRankDetailed.TK_JACKS_EIGHT;
  if(val >= 1846)  return HandRankDetailed.TK_JACKS_NINE;
  if(val >= 1838)  return HandRankDetailed.TK_JACKS_TEN;
  if(val >= 1829)  return HandRankDetailed.TK_JACKS_QUEEN;
  if(val >= 1819)  return HandRankDetailed.TK_JACKS_KING;
  if(val >= 1808)  return HandRankDetailed.TK_JACKS_ACE;
  if(val === 1807) return HandRankDetailed.TK_QUEENS_THREE;
  if(val >= 1805)  return HandRankDetailed.TK_QUEENS_FOUR;
  if(val >= 1802)  return HandRankDetailed.TK_QUEENS_FIVE;
  if(val >= 1798)  return HandRankDetailed.TK_QUEENS_SIX;
  if(val >= 1793)  return HandRankDetailed.TK_QUEENS_SEVEN;
  if(val >= 1787)  return HandRankDetailed.TK_QUEENS_EIGHT;
  if(val >= 1780)  return HandRankDetailed.TK_QUEENS_NINE;
  if(val >= 1772)  return HandRankDetailed.TK_QUEENS_TEN;
  if(val >= 1763)  return HandRankDetailed.TK_QUEENS_JACK;
  if(val >= 1753)  return HandRankDetailed.TK_QUEENS_KING;
  if(val >= 1742)  return HandRankDetailed.TK_QUEENS_ACE;
  if(val === 1741) return HandRankDetailed.TK_KINGS_THREE;
  if(val >= 1739)  return HandRankDetailed.TK_KINGS_FOUR;
  if(val >= 1736)  return HandRankDetailed.TK_KINGS_FIVE;
  if(val >= 1732)  return HandRankDetailed.TK_KINGS_SIX;
  if(val >= 1727)  return HandRankDetailed.TK_KINGS_SEVEN;
  if(val >= 1721)  return HandRankDetailed.TK_KINGS_EIGHT;
  if(val >= 1714)  return HandRankDetailed.TK_KINGS_NINE;
  if(val >= 1706)  return HandRankDetailed.TK_KINGS_TEN;
  if(val >= 1697)  return HandRankDetailed.TK_KINGS_JACK;
  if(val >= 1687)  return HandRankDetailed.TK_KINGS_QUEEN;
  if(val >= 1676)  return HandRankDetailed.TK_KINGS_ACE;
  if(val === 1675) return HandRankDetailed.TK_ACES_THREE;
  if(val >= 1673)  return HandRankDetailed.TK_ACES_FOUR;
  if(val >= 1670)  return HandRankDetailed.TK_ACES_FIVE;
  if(val >= 1666)  return HandRankDetailed.TK_ACES_SIX;
  if(val >= 1661)  return HandRankDetailed.TK_ACES_SEVEN;
  if(val >= 1655)  return HandRankDetailed.TK_ACES_EIGHT;
  if(val >= 1648)  return HandRankDetailed.TK_ACES_NINE;
  if(val >= 1640)  return HandRankDetailed.TK_ACES_TEN;
  if(val >= 1631)  return HandRankDetailed.TK_ACES_JACK;
  if(val >= 1621)  return HandRankDetailed.TK_ACES_QUEEN;
  if(val >= 1610)  return HandRankDetailed.TK_ACES_KING;

  // straights
  if(val === 1609) return HandRankDetailed.ST_FIVE;
  if(val === 1608) return HandRankDetailed.ST_SIX;
  if(val === 1607) return HandRankDetailed.ST_SEVEN;
  if(val === 1606) return HandRankDetailed.ST_EIGHT;
  if(val === 1605) return HandRankDetailed.ST_NINE;
  if(val === 1604) return HandRankDetailed.ST_TEN;
  if(val === 1603) return HandRankDetailed.ST_JACK;
  if(val === 1602) return HandRankDetailed.ST_QUEEN;
  if(val === 1601) return HandRankDetailed.ST_KING;
  if(val === 1600) return HandRankDetailed.ST_ACE;

  // flushes
  if(val >= 1596)  return HandRankDetailed.FL_SEVEN;
  if(val >= 1582)  return HandRankDetailed.FL_EIGHT;
  if(val >= 1548)  return HandRankDetailed.FL_NINE;
  if(val >= 1479)  return HandRankDetailed.FL_TEN;
  if(val >= 1354)  return HandRankDetailed.FL_JACK;
  if(val >= 1145)  return HandRankDetailed.FL_QUEEN;
  if(val >= 816)   return HandRankDetailed.FL_KING;
  if(val >= 323)   return HandRankDetailed.FL_ACE;

  // full houses
  if(val === 322)  return HandRankDetailed.FH_TWOS_THREES;
  if(val === 321)  return HandRankDetailed.FH_TWOS_FOURS;
  if(val === 320)  return HandRankDetailed.FH_TWOS_FIVES;
  if(val === 319)  return HandRankDetailed.FH_TWOS_SIXES;
  if(val === 318)  return HandRankDetailed.FH_TWOS_SEVENS;
  if(val === 317)  return HandRankDetailed.FH_TWOS_EIGHTS;
  if(val === 316)  return HandRankDetailed.FH_TWOS_NINES;
  if(val === 315)  return HandRankDetailed.FH_TWOS_TENS;
  if(val === 314)  return HandRankDetailed.FH_TWOS_JACKS;
  if(val === 313)  return HandRankDetailed.FH_TWOS_QUEENS;
  if(val === 312)  return HandRankDetailed.FH_TWOS_KINGS;
  if(val === 311)  return HandRankDetailed.FH_TWOS_ACES;
  if(val === 310)  return HandRankDetailed.FH_THREES_TWOS;
  if(val === 309)  return HandRankDetailed.FH_THREES_FOURS;
  if(val === 308)  return HandRankDetailed.FH_THREES_FIVES;
  if(val === 307)  return HandRankDetailed.FH_THREES_SIXES;
  if(val === 306)  return HandRankDetailed.FH_THREES_SEVENS;
  if(val === 305)  return HandRankDetailed.FH_THREES_EIGHTS;
  if(val === 304)  return HandRankDetailed.FH_THREES_NINES;
  if(val === 303)  return HandRankDetailed.FH_THREES_TENS;
  if(val === 302)  return HandRankDetailed.FH_THREES_JACKS;
  if(val === 301)  return HandRankDetailed.FH_THREES_QUEENS;
  if(val === 300)  return HandRankDetailed.FH_THREES_KINGS;
  if(val === 299)  return HandRankDetailed.FH_THREES_ACES;
  if(val === 298)  return HandRankDetailed.FH_FOURS_TWOS;
  if(val === 297)  return HandRankDetailed.FH_FOURS_THREES;
  if(val === 296)  return HandRankDetailed.FH_FOURS_FIVES;
  if(val === 295)  return HandRankDetailed.FH_FOURS_SIXES;
  if(val === 294)  return HandRankDetailed.FH_FOURS_SEVENS;
  if(val === 293)  return HandRankDetailed.FH_FOURS_EIGHTS;
  if(val === 292)  return HandRankDetailed.FH_FOURS_NINES;
  if(val === 291)  return HandRankDetailed.FH_FOURS_TENS;
  if(val === 290)  return HandRankDetailed.FH_FOURS_JACKS;
  if(val === 289)  return HandRankDetailed.FH_FOURS_QUEENS;
  if(val === 288)  return HandRankDetailed.FH_FOURS_KINGS;
  if(val === 287)  return HandRankDetailed.FH_FOURS_ACES;
  if(val === 286)  return HandRankDetailed.FH_FIVES_TWOS;
  if(val === 285)  return HandRankDetailed.FH_FIVES_THREES;
  if(val === 284)  return HandRankDetailed.FH_FIVES_FOURS;
  if(val === 283)  return HandRankDetailed.FH_FIVES_SIXES;
  if(val === 282)  return HandRankDetailed.FH_FIVES_SEVENS;
  if(val === 281)  return HandRankDetailed.FH_FIVES_EIGHTS;
  if(val === 280)  return HandRankDetailed.FH_FIVES_NINES;
  if(val === 279)  return HandRankDetailed.FH_FIVES_TENS;
  if(val === 278)  return HandRankDetailed.FH_FIVES_JACKS;
  if(val === 277)  return HandRankDetailed.FH_FIVES_QUEENS;
  if(val === 276)  return HandRankDetailed.FH_FIVES_KINGS;
  if(val === 275)  return HandRankDetailed.FH_FIVES_ACES;
  if(val === 274)  return HandRankDetailed.FH_SIXES_TWOS;
  if(val === 273)  return HandRankDetailed.FH_SIXES_THREES;
  if(val === 272)  return HandRankDetailed.FH_SIXES_FOURS;
  if(val === 271)  return HandRankDetailed.FH_SIXES_FIVES;
  if(val === 270)  return HandRankDetailed.FH_SIXES_SEVENS;
  if(val === 269)  return HandRankDetailed.FH_SIXES_EIGHTS;
  if(val === 268)  return HandRankDetailed.FH_SIXES_NINES;
  if(val === 267)  return HandRankDetailed.FH_SIXES_TENS;
  if(val === 266)  return HandRankDetailed.FH_SIXES_JACKS;
  if(val === 265)  return HandRankDetailed.FH_SIXES_QUEENS;
  if(val === 264)  return HandRankDetailed.FH_SIXES_KINGS;
  if(val === 263)  return HandRankDetailed.FH_SIXES_ACES;
  if(val === 262)  return HandRankDetailed.FH_SEVENS_TWOS;
  if(val === 261)  return HandRankDetailed.FH_SEVENS_THREES;
  if(val === 260)  return HandRankDetailed.FH_SEVENS_FOURS;
  if(val === 259)  return HandRankDetailed.FH_SEVENS_FIVES;
  if(val === 258)  return HandRankDetailed.FH_SEVENS_SIXES;
  if(val === 257)  return HandRankDetailed.FH_SEVENS_EIGHTS;
  if(val === 256)  return HandRankDetailed.FH_SEVENS_NINES;
  if(val === 255)  return HandRankDetailed.FH_SEVENS_TENS;
  if(val === 254)  return HandRankDetailed.FH_SEVENS_JACKS;
  if(val === 253)  return HandRankDetailed.FH_SEVENS_QUEENS;
  if(val === 252)  return HandRankDetailed.FH_SEVENS_KINGS;
  if(val === 251)  return HandRankDetailed.FH_SEVENS_ACES;
  if(val === 250)  return HandRankDetailed.FH_EIGHTS_TWOS;
  if(val === 249)  return HandRankDetailed.FH_EIGHTS_THREES;
  if(val === 248)  return HandRankDetailed.FH_EIGHTS_FOURS;
  if(val === 247)  return HandRankDetailed.FH_EIGHTS_FIVES;
  if(val === 246)  return HandRankDetailed.FH_EIGHTS_SIXES;
  if(val === 245)  return HandRankDetailed.FH_EIGHTS_SEVENS;
  if(val === 244)  return HandRankDetailed.FH_EIGHTS_NINES;
  if(val === 243)  return HandRankDetailed.FH_EIGHTS_TENS;
  if(val === 242)  return HandRankDetailed.FH_EIGHTS_JACKS;
  if(val === 241)  return HandRankDetailed.FH_EIGHTS_QUEENS;
  if(val === 240)  return HandRankDetailed.FH_EIGHTS_KINGS;
  if(val === 239)  return HandRankDetailed.FH_EIGHTS_ACES;
  if(val === 238)  return HandRankDetailed.FH_NINES_TWOS;
  if(val === 237)  return HandRankDetailed.FH_NINES_THREES;
  if(val === 236)  return HandRankDetailed.FH_NINES_FOURS;
  if(val === 235)  return HandRankDetailed.FH_NINES_FIVES;
  if(val === 234)  return HandRankDetailed.FH_NINES_SIXES;
  if(val === 233)  return HandRankDetailed.FH_NINES_SEVENS;
  if(val === 232)  return HandRankDetailed.FH_NINES_EIGHTS;
  if(val === 231)  return HandRankDetailed.FH_NINES_TENS;
  if(val === 230)  return HandRankDetailed.FH_NINES_JACKS;
  if(val === 229)  return HandRankDetailed.FH_NINES_QUEENS;
  if(val === 228)  return HandRankDetailed.FH_NINES_KINGS;
  if(val === 227)  return HandRankDetailed.FH_NINES_ACES;
  if(val === 226)  return HandRankDetailed.FH_TENS_TWOS;
  if(val === 225)  return HandRankDetailed.FH_TENS_THREES;
  if(val === 224)  return HandRankDetailed.FH_TENS_FOURS;
  if(val === 223)  return HandRankDetailed.FH_TENS_FIVES;
  if(val === 222)  return HandRankDetailed.FH_TENS_SIXES;
  if(val === 221)  return HandRankDetailed.FH_TENS_SEVENS;
  if(val === 220)  return HandRankDetailed.FH_TENS_EIGHTS;
  if(val === 219)  return HandRankDetailed.FH_TENS_NINES;
  if(val === 218)  return HandRankDetailed.FH_TENS_JACKS;
  if(val === 217)  return HandRankDetailed.FH_TENS_QUEENS;
  if(val === 216)  return HandRankDetailed.FH_TENS_KINGS;
  if(val === 215)  return HandRankDetailed.FH_TENS_ACES;
  if(val === 214)  return HandRankDetailed.FH_JACKS_TWOS;
  if(val === 213)  return HandRankDetailed.FH_JACKS_THREES;
  if(val === 212)  return HandRankDetailed.FH_JACKS_FOURS;
  if(val === 211)  return HandRankDetailed.FH_JACKS_FIVES;
  if(val === 210)  return HandRankDetailed.FH_JACKS_SIXES;
  if(val === 209)  return HandRankDetailed.FH_JACKS_SEVENS;
  if(val === 208)  return HandRankDetailed.FH_JACKS_EIGHTS;
  if(val === 207)  return HandRankDetailed.FH_JACKS_NINES;
  if(val === 206)  return HandRankDetailed.FH_JACKS_TENS;
  if(val === 205)  return HandRankDetailed.FH_JACKS_QUEENS;
  if(val === 204)  return HandRankDetailed.FH_JACKS_KINGS;
  if(val === 203)  return HandRankDetailed.FH_JACKS_ACES;
  if(val === 202)  return HandRankDetailed.FH_QUEENS_TWOS;
  if(val === 201)  return HandRankDetailed.FH_QUEENS_THREES;
  if(val === 200)  return HandRankDetailed.FH_QUEENS_FOURS;
  if(val === 199)  return HandRankDetailed.FH_QUEENS_FIVES;
  if(val === 198)  return HandRankDetailed.FH_QUEENS_SIXES;
  if(val === 197)  return HandRankDetailed.FH_QUEENS_SEVENS;
  if(val === 196)  return HandRankDetailed.FH_QUEENS_EIGHTS;
  if(val === 195)  return HandRankDetailed.FH_QUEENS_NINES;
  if(val === 194)  return HandRankDetailed.FH_QUEENS_TENS;
  if(val === 193)  return HandRankDetailed.FH_QUEENS_JACKS;
  if(val === 192)  return HandRankDetailed.FH_QUEENS_KINGS;
  if(val === 191)  return HandRankDetailed.FH_QUEENS_ACES;
  if(val === 190)  return HandRankDetailed.FH_KINGS_TWOS;
  if(val === 189)  return HandRankDetailed.FH_KINGS_THREES;
  if(val === 188)  return HandRankDetailed.FH_KINGS_FOURS;
  if(val === 187)  return HandRankDetailed.FH_KINGS_FIVES;
  if(val === 186)  return HandRankDetailed.FH_KINGS_SIXES;
  if(val === 185)  return HandRankDetailed.FH_KINGS_SEVENS;
  if(val === 184)  return HandRankDetailed.FH_KINGS_EIGHTS;
  if(val === 183)  return HandRankDetailed.FH_KINGS_NINES;
  if(val === 182)  return HandRankDetailed.FH_KINGS_TENS;
  if(val === 181)  return HandRankDetailed.FH_KINGS_JACKS;
  if(val === 180)  return HandRankDetailed.FH_KINGS_QUEENS;
  if(val === 179)  return HandRankDetailed.FH_KINGS_ACES;
  if(val === 178)  return HandRankDetailed.FH_ACES_TWOS;
  if(val === 177)  return HandRankDetailed.FH_ACES_THREES;
  if(val === 176)  return HandRankDetailed.FH_ACES_FOURS;
  if(val === 175)  return HandRankDetailed.FH_ACES_FIVES;
  if(val === 174)  return HandRankDetailed.FH_ACES_SIXES;
  if(val === 173)  return HandRankDetailed.FH_ACES_SEVENS;
  if(val === 172)  return HandRankDetailed.FH_ACES_EIGHTS;
  if(val === 171)  return HandRankDetailed.FH_ACES_NINES;
  if(val === 170)  return HandRankDetailed.FH_ACES_TENS;
  if(val === 169)  return HandRankDetailed.FH_ACES_JACKS;
  if(val === 168)  return HandRankDetailed.FH_ACES_QUEENS;
  if(val === 167)  return HandRankDetailed.FH_ACES_KINGS;

  // four of a kinds
  if(val === 166)  return HandRankDetailed.FK_TWOS_THREE;
  if(val === 165)  return HandRankDetailed.FK_TWOS_FOUR;
  if(val === 164)  return HandRankDetailed.FK_TWOS_FIVE;
  if(val === 163)  return HandRankDetailed.FK_TWOS_SIX;
  if(val === 162)  return HandRankDetailed.FK_TWOS_SEVEN;
  if(val === 161)  return HandRankDetailed.FK_TWOS_EIGHT;
  if(val === 160)  return HandRankDetailed.FK_TWOS_NINE;
  if(val === 159)  return HandRankDetailed.FK_TWOS_TEN;
  if(val === 158)  return HandRankDetailed.FK_TWOS_JACK;
  if(val === 157)  return HandRankDetailed.FK_TWOS_QUEEN;
  if(val === 156)  return HandRankDetailed.FK_TWOS_KING;
  if(val === 155)  return HandRankDetailed.FK_TWOS_ACE;
  if(val === 154)  return HandRankDetailed.FK_THREES_TWO;
  if(val === 153)  return HandRankDetailed.FK_THREES_FOUR;
  if(val === 152)  return HandRankDetailed.FK_THREES_FIVE;
  if(val === 151)  return HandRankDetailed.FK_THREES_SIX;
  if(val === 150)  return HandRankDetailed.FK_THREES_SEVEN;
  if(val === 149)  return HandRankDetailed.FK_THREES_EIGHT;
  if(val === 148)  return HandRankDetailed.FK_THREES_NINE;
  if(val === 147)  return HandRankDetailed.FK_THREES_TEN;
  if(val === 146)  return HandRankDetailed.FK_THREES_JACK;
  if(val === 145)  return HandRankDetailed.FK_THREES_QUEEN;
  if(val === 144)  return HandRankDetailed.FK_THREES_KING;
  if(val === 143)  return HandRankDetailed.FK_THREES_ACE;
  if(val === 142)  return HandRankDetailed.FK_FOURS_TWO;
  if(val === 141)  return HandRankDetailed.FK_FOURS_THREE;
  if(val === 140)  return HandRankDetailed.FK_FOURS_FIVE;
  if(val === 139)  return HandRankDetailed.FK_FOURS_SIX;
  if(val === 138)  return HandRankDetailed.FK_FOURS_SEVEN;
  if(val === 137)  return HandRankDetailed.FK_FOURS_EIGHT;
  if(val === 136)  return HandRankDetailed.FK_FOURS_NINE;
  if(val === 135)  return HandRankDetailed.FK_FOURS_TEN;
  if(val === 134)  return HandRankDetailed.FK_FOURS_JACK;
  if(val === 133)  return HandRankDetailed.FK_FOURS_QUEEN;
  if(val === 132)  return HandRankDetailed.FK_FOURS_KING;
  if(val === 131)  return HandRankDetailed.FK_FOURS_ACE;
  if(val === 130)  return HandRankDetailed.FK_FIVES_TWO;
  if(val === 129)  return HandRankDetailed.FK_FIVES_THREE;
  if(val === 128)  return HandRankDetailed.FK_FIVES_FOUR;
  if(val === 127)  return HandRankDetailed.FK_FIVES_SIX;
  if(val === 126)  return HandRankDetailed.FK_FIVES_SEVEN;
  if(val === 125)  return HandRankDetailed.FK_FIVES_EIGHT;
  if(val === 124)  return HandRankDetailed.FK_FIVES_NINE;
  if(val === 123)  return HandRankDetailed.FK_FIVES_TEN;
  if(val === 122)  return HandRankDetailed.FK_FIVES_JACK;
  if(val === 121)  return HandRankDetailed.FK_FIVES_QUEEN;
  if(val === 120)  return HandRankDetailed.FK_FIVES_KING;
  if(val === 119)  return HandRankDetailed.FK_FIVES_ACE;
  if(val === 118)  return HandRankDetailed.FK_SIXES_TWO;
  if(val === 117)  return HandRankDetailed.FK_SIXES_THREE;
  if(val === 116)  return HandRankDetailed.FK_SIXES_FOUR;
  if(val === 115)  return HandRankDetailed.FK_SIXES_FIVE;
  if(val === 114)  return HandRankDetailed.FK_SIXES_SEVEN;
  if(val === 113)  return HandRankDetailed.FK_SIXES_EIGHT;
  if(val === 112)  return HandRankDetailed.FK_SIXES_NINE;
  if(val === 111)  return HandRankDetailed.FK_SIXES_TEN;
  if(val === 110)  return HandRankDetailed.FK_SIXES_JACK;
  if(val === 109)  return HandRankDetailed.FK_SIXES_QUEEN;
  if(val === 108)  return HandRankDetailed.FK_SIXES_KING;
  if(val === 107)  return HandRankDetailed.FK_SIXES_ACE;
  if(val === 106)  return HandRankDetailed.FK_SEVENS_TWO;
  if(val === 105)  return HandRankDetailed.FK_SEVENS_THREE;
  if(val === 104)  return HandRankDetailed.FK_SEVENS_FOUR;
  if(val === 103)  return HandRankDetailed.FK_SEVENS_FIVE;
  if(val === 102)  return HandRankDetailed.FK_SEVENS_SIX;
  if(val === 101)  return HandRankDetailed.FK_SEVENS_EIGHT;
  if(val === 100)  return HandRankDetailed.FK_SEVENS_NINE;
  if(val === 99)   return HandRankDetailed.FK_SEVENS_TEN;
  if(val === 98)   return HandRankDetailed.FK_SEVENS_JACK;
  if(val === 97)   return HandRankDetailed.FK_SEVENS_QUEEN;
  if(val === 96)   return HandRankDetailed.FK_SEVENS_KING;
  if(val === 95)   return HandRankDetailed.FK_SEVENS_ACE;
  if(val === 94)   return HandRankDetailed.FK_EIGHTS_TWO;
  if(val === 93)   return HandRankDetailed.FK_EIGHTS_THREE;
  if(val === 92)   return HandRankDetailed.FK_EIGHTS_FOUR;
  if(val === 91)   return HandRankDetailed.FK_EIGHTS_FIVE;
  if(val === 90)   return HandRankDetailed.FK_EIGHTS_SIX;
  if(val === 89)   return HandRankDetailed.FK_EIGHTS_SEVEN;
  if(val === 88)   return HandRankDetailed.FK_EIGHTS_NINE;
  if(val === 87)   return HandRankDetailed.FK_EIGHTS_TEN;
  if(val === 86)   return HandRankDetailed.FK_EIGHTS_JACK;
  if(val === 85)   return HandRankDetailed.FK_EIGHTS_QUEEN;
  if(val === 84)   return HandRankDetailed.FK_EIGHTS_KING;
  if(val === 83)   return HandRankDetailed.FK_EIGHTS_ACE;
  if(val === 82)   return HandRankDetailed.FK_NINES_TWO;
  if(val === 81)   return HandRankDetailed.FK_NINES_THREE;
  if(val === 80)   return HandRankDetailed.FK_NINES_FOUR;
  if(val === 79)   return HandRankDetailed.FK_NINES_FIVE;
  if(val === 78)   return HandRankDetailed.FK_NINES_SIX;
  if(val === 77)   return HandRankDetailed.FK_NINES_SEVEN;
  if(val === 76)   return HandRankDetailed.FK_NINES_EIGHT;
  if(val === 75)   return HandRankDetailed.FK_NINES_TEN;
  if(val === 74)   return HandRankDetailed.FK_NINES_JACK;
  if(val === 73)   return HandRankDetailed.FK_NINES_QUEEN;
  if(val === 72)   return HandRankDetailed.FK_NINES_KING;
  if(val === 71)   return HandRankDetailed.FK_NINES_ACE;
  if(val === 70)   return HandRankDetailed.FK_TENS_TWO;
  if(val === 69)   return HandRankDetailed.FK_TENS_THREE;
  if(val === 68)   return HandRankDetailed.FK_TENS_FOUR;
  if(val === 67)   return HandRankDetailed.FK_TENS_FIVE;
  if(val === 66)   return HandRankDetailed.FK_TENS_SIX;
  if(val === 65)   return HandRankDetailed.FK_TENS_SEVEN;
  if(val === 64)   return HandRankDetailed.FK_TENS_EIGHT;
  if(val === 63)   return HandRankDetailed.FK_TENS_NINE;
  if(val === 62)   return HandRankDetailed.FK_TENS_JACK;
  if(val === 61)   return HandRankDetailed.FK_TENS_QUEEN;
  if(val === 60)   return HandRankDetailed.FK_TENS_KING;
  if(val === 59)   return HandRankDetailed.FK_TENS_ACE;
  if(val === 58)   return HandRankDetailed.FK_JACKS_TWO;
  if(val === 57)   return HandRankDetailed.FK_JACKS_THREE;
  if(val === 56)   return HandRankDetailed.FK_JACKS_FOUR;
  if(val === 55)   return HandRankDetailed.FK_JACKS_FIVE;
  if(val === 54)   return HandRankDetailed.FK_JACKS_SIX;
  if(val === 53)   return HandRankDetailed.FK_JACKS_SEVEN;
  if(val === 52)   return HandRankDetailed.FK_JACKS_EIGHT;
  if(val === 51)   return HandRankDetailed.FK_JACKS_NINE;
  if(val === 50)   return HandRankDetailed.FK_JACKS_TEN;
  if(val === 49)   return HandRankDetailed.FK_JACKS_QUEEN;
  if(val === 48)   return HandRankDetailed.FK_JACKS_KING;
  if(val === 47)   return HandRankDetailed.FK_JACKS_ACE;
  if(val === 46)   return HandRankDetailed.FK_QUEENS_TWO;
  if(val === 45)   return HandRankDetailed.FK_QUEENS_THREE;
  if(val === 44)   return HandRankDetailed.FK_QUEENS_FOUR;
  if(val === 43)   return HandRankDetailed.FK_QUEENS_FIVE;
  if(val === 42)   return HandRankDetailed.FK_QUEENS_SIX;
  if(val === 41)   return HandRankDetailed.FK_QUEENS_SEVEN;
  if(val === 40)   return HandRankDetailed.FK_QUEENS_EIGHT;
  if(val === 39)   return HandRankDetailed.FK_QUEENS_NINE;
  if(val === 38)   return HandRankDetailed.FK_QUEENS_TEN;
  if(val === 37)   return HandRankDetailed.FK_QUEENS_JACK;
  if(val === 36)   return HandRankDetailed.FK_QUEENS_KING;
  if(val === 35)   return HandRankDetailed.FK_QUEENS_ACE;
  if(val === 34)   return HandRankDetailed.FK_KINGS_TWO;
  if(val === 33)   return HandRankDetailed.FK_KINGS_THREE;
  if(val === 32)   return HandRankDetailed.FK_KINGS_FOUR;
  if(val === 31)   return HandRankDetailed.FK_KINGS_FIVE;
  if(val === 30)   return HandRankDetailed.FK_KINGS_SIX;
  if(val === 29)   return HandRankDetailed.FK_KINGS_SEVEN;
  if(val === 28)   return HandRankDetailed.FK_KINGS_EIGHT;
  if(val === 27)   return HandRankDetailed.FK_KINGS_NINE;
  if(val === 26)   return HandRankDetailed.FK_KINGS_TEN;
  if(val === 25)   return HandRankDetailed.FK_KINGS_JACK;
  if(val === 24)   return HandRankDetailed.FK_KINGS_QUEEN;
  if(val === 23)   return HandRankDetailed.FK_KINGS_ACE;
  if(val === 22)   return HandRankDetailed.FK_ACES_TWO;
  if(val === 21)   return HandRankDetailed.FK_ACES_THREE;
  if(val === 20)   return HandRankDetailed.FK_ACES_FOUR;
  if(val === 19)   return HandRankDetailed.FK_ACES_FIVE;
  if(val === 18)   return HandRankDetailed.FK_ACES_SIX;
  if(val === 17)   return HandRankDetailed.FK_ACES_SEVEN;
  if(val === 16)   return HandRankDetailed.FK_ACES_EIGHT;
  if(val === 15)   return HandRankDetailed.FK_ACES_NINE;
  if(val === 14)   return HandRankDetailed.FK_ACES_TEN;
  if(val === 13)   return HandRankDetailed.FK_ACES_JACK;
  if(val === 12)   return HandRankDetailed.FK_ACES_QUEEN;
  if(val === 11)   return HandRankDetailed.FK_ACES_KING;

  // straight flushes
  if(val === 10)   return HandRankDetailed.SF_FIVE;
  if(val === 9)    return HandRankDetailed.SF_SIX;
  if(val === 8)    return HandRankDetailed.SF_SEVEN;
  if(val === 7)    return HandRankDetailed.SF_EIGHT;
  if(val === 6)    return HandRankDetailed.SF_NINE;
  if(val === 5)    return HandRankDetailed.SF_TEN;
  if(val === 4)    return HandRankDetailed.SF_JACK;
  if(val === 3)    return HandRankDetailed.SF_QUEEN;
  if(val === 2)    return HandRankDetailed.SF_KING;

  // royal flush
  return HandRankDetailed.SF_ROYAL;
};
