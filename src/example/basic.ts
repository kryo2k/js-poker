import { ICardObject, handString, stringHand } from '../card';
import { rank5, rank7, fullHandRankString } from '../poker';

function pad(s:string, p:string, r:boolean = false) {
  if(!s||!p||p.length <= s.length) return s;
  return r ? (s+p).substr(0, p.length) : (p+s).substr(-p.length);
}

function eval5test(c1 : ICardObject, c2 : ICardObject, c3 : ICardObject, c4 : ICardObject, c5 : ICardObject) : number {

  const
  str  = handString(c1,c2,c3,c4,c5),
  rank = rank5(c1,c2,c3,c4,c5);

  console.log('rank5 (%s) -> %s (%s)', str, pad(rank.toString(10),'    '), fullHandRankString(rank));

  return rank;
}

function eval7test(c1 : ICardObject, c2 : ICardObject, c3 : ICardObject, c4 : ICardObject, c5 : ICardObject, c6 : ICardObject, c7 : ICardObject) : number {

  const
  str  = handString(c1,c2,c3,c4,c5,c6,c7),
  rank = rank7(c1,c2,c3,c4,c5,c6,c7);

  console.log('rank7 (%s) -> %s (%s)', str, pad(rank.toString(10),'    '), fullHandRankString(rank));

  return rank;
}

/**
* RANK-5
*/

[
  // jamesma/enova-poker tests
  stringHand('AH|KH|QH|JH|TH'), // royal flush
  stringHand('9C|8C|7C|6C|5C'), // straight flush
  stringHand('AH|AS|AD|AC|KH'), // four of kind
  stringHand('AH|AC|AD|KH|KC'), // full house
  stringHand('AS|TS|7S|6S|2S'), // flush
  stringHand('5C|4D|3S|2H|AH'), // straight
  stringHand('AH|AS|AD|KS|QC'), // three of kind
  stringHand('AH|AS|KC|KH|QS'), // two pairs
  stringHand('AH|AS|KH|QS|JD'), // one pair
  stringHand('AH|KS|QD|JC|9S'), // high card

  // my tests
  stringHand('AD|KD|QD|JD|TD'), // royal flush
  stringHand('AH|2H|3H|4H|5H'), // straight-flush A5H
  stringHand('AH|AC|AS|AD|2H'), // four of a kind AAAA
  stringHand('AH|AC|AS|2D|2H'), // full house AAA22
  stringHand('AH|5H|9H|TH|6H'), // flush AH high
  stringHand('AC|2D|3H|4H|5D'), // straight 5D high
  stringHand('AH|AC|AS|2D|8H'), // trio-AAA
  stringHand('AH|AC|TS|2D|2H'), // two pair AA-22 with TS kicker
  stringHand('AH|AC|6C|2D|8H'), // pair-AA with 8H kicker
  stringHand('AC|2C|6D|9S|QS'), // high card AC,QS,9S,6D,2C
]
.forEach(t => eval5test(t[0],t[1],t[2],t[3],t[4]));

/**
* RANK-7
*/

[
  // jamesma/enova-poker tests
  stringHand('AH|KH|QH|JH|TH|3D|5S'), // royal flush
  stringHand('9C|8C|7C|6C|5C|7S|9D'), // straight flush
  stringHand('AH|AS|AD|AC|KH|3S|2D'), // four of kind
  stringHand('AH|AC|AD|KH|KC|7D|3C'), // full house
  stringHand('AS|TS|7S|6S|2S|8H|9D'), // flush
  stringHand('5C|4D|3S|2H|AH|TH|JD'), // straight
  stringHand('AH|AS|AD|KS|QC|2H|5D'), // three of kind
  stringHand('AH|AS|KC|KH|QS|2S|4D'), // two pairs
  stringHand('AH|AS|KH|QS|JD|5S|7D'), // one pair
  stringHand('AH|KS|QD|JC|9S|2D|6H'), // high card

  // my tests
  stringHand('AD|KD|QD|JD|TD|4C|3S'), // royal flush
  stringHand('AH|2H|3H|4H|5H|9D|JC'), // straight-flush A5H
  stringHand('AH|AC|AS|AD|2H|8H|4C'), // four of a kind AAAA
  stringHand('AH|AC|AS|2D|2H|8C|TD'), // full house AAA22
  stringHand('AH|5H|9H|TH|6H|2C|4H'), // flush AH high
  stringHand('AC|2D|3H|4H|5D|9D|TC'), // straight 5D high
  stringHand('AH|AC|AS|2D|8H|6D|TC'), // trio-AAA
  stringHand('AH|AC|TS|2D|2H|8H|TD'), // two pair AA-22 with TS kicker
  stringHand('AH|AC|6C|2D|8H|3C|5D'), // pair-AA with 8H kicker
  stringHand('AC|2C|6D|9S|QS|8H|4H'), // high card AC,QS,9S,6D,2C
]
.forEach(t => eval7test(t[0],t[1],t[2],t[3],t[4],t[5],t[6]));
