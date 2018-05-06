import { expect } from 'chai';
import 'mocha';

import { ICardObject, I5CardHand, I7CardHand, isCardObject, isHand5, isHand7, str5, str7, handString } from './card';
import { rank5, rank7, fullHandRankString, HandRank, handRank, handRankLabel } from './poker';

describe('Poker', () => {

  const hands = require('../json/test-hands.json') as {
    flushRoyal_5    : string[];
    flushStraight_5 : string[];
    fourOfKind_5    : string[];
    fullHouse_5     : string[];
    flush_5         : string[];
    straight_5      : string[];
    threeOfKind_5   : string[];
    twoPair_5       : string[];
    onePair_5       : string[];
    highCard_5      : string[];
    flushRoyal_7    : string[];
    flushStraight_7 : string[];
    fourOfKind_7    : string[];
    fullHouse_7     : string[];
    flush_7         : string[];
    straight_7      : string[];
    threeOfKind_7   : string[];
    twoPair_7       : string[];
    onePair_7       : string[];
    highCard_7      : string[];
  };

  function assertHandRank(hand : I5CardHand|I7CardHand, rank : HandRank) : void {
    let grade : number = 9999;

    if(isHand7(hand))
      grade = rank7(hand[0],hand[1],hand[2],hand[3],hand[4],hand[5],hand[6]);
    else if(isHand5(hand))
      grade = rank5(hand[0],hand[1],hand[2],hand[3],hand[4]);

    expect(grade).to.not.eq(9999);

    const handRanking = handRank(grade);

    expect(handRanking).to.eq(rank, `Expected ${HandRank[handRanking]} to equal ${HandRank[rank]}`);
  };

  function factory(set : (I5CardHand|I7CardHand)[], expectRank : HandRank) {
    const expectRankLabel = handRankLabel(expectRank);

    set.forEach(hand => it(
      `should validate ${expectRankLabel} (${isHand7(hand)?7:5}): ${handString(... hand)}`,
      () => assertHandRank(hand, expectRank)
    ));
  }

  factory(hands.flushRoyal_5.map(str5),     HandRank.ROYAL_FLUSH);
  factory(hands.flushStraight_5.map(str5),  HandRank.STRAIGHT_FLUSH);
  factory(hands.fourOfKind_5.map(str5),     HandRank.FOUR_OF_A_KIND);
  factory(hands.fullHouse_5.map(str5),      HandRank.FULL_HOUSE);
  factory(hands.flush_5.map(str5),          HandRank.FLUSH);
  factory(hands.straight_5.map(str5),       HandRank.STRAIGHT);
  factory(hands.threeOfKind_5.map(str5),    HandRank.THREE_OF_A_KIND);
  factory(hands.twoPair_5.map(str5),        HandRank.TWO_PAIR);
  factory(hands.onePair_5.map(str5),        HandRank.ONE_PAIR);
  factory(hands.highCard_5.map(str5),       HandRank.HIGH_CARD);

  factory(hands.flushRoyal_7.map(str7),     HandRank.ROYAL_FLUSH);
  factory(hands.flushStraight_7.map(str7),  HandRank.STRAIGHT_FLUSH);
  factory(hands.fourOfKind_7.map(str7),     HandRank.FOUR_OF_A_KIND);
  factory(hands.fullHouse_7.map(str7),      HandRank.FULL_HOUSE);
  factory(hands.flush_7.map(str7),          HandRank.FLUSH);
  factory(hands.straight_7.map(str7),       HandRank.STRAIGHT);
  factory(hands.threeOfKind_7.map(str7),    HandRank.THREE_OF_A_KIND);
  factory(hands.twoPair_7.map(str7),        HandRank.TWO_PAIR);
  factory(hands.onePair_7.map(str7),        HandRank.ONE_PAIR);
  factory(hands.highCard_7.map(str7),       HandRank.HIGH_CARD);
});
