"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("mocha");
const card_1 = require("./card");
const poker_1 = require("./poker");
describe('Poker', () => {
    const hands = require('../json/test-hands.json');
    function assertHandRank(hand, rank) {
        let grade = 9999;
        if (card_1.isHand7(hand))
            grade = poker_1.rank7(hand[0], hand[1], hand[2], hand[3], hand[4], hand[5], hand[6]);
        else if (card_1.isHand5(hand))
            grade = poker_1.rank5(hand[0], hand[1], hand[2], hand[3], hand[4]);
        chai_1.expect(grade).to.not.eq(9999);
        const handRanking = poker_1.handRank(grade);
        chai_1.expect(handRanking).to.eq(rank, `Expected ${poker_1.HandRank[handRanking]} to equal ${poker_1.HandRank[rank]}`);
    }
    ;
    function factory(set, expectRank) {
        const expectRankLabel = poker_1.handRankLabel(expectRank);
        set.forEach(hand => it(`should validate ${expectRankLabel} (${card_1.isHand7(hand) ? 7 : 5}): ${card_1.handString(...hand)}`, () => assertHandRank(hand, expectRank)));
    }
    factory(hands.flushRoyal_5.map(card_1.str5), poker_1.HandRank.ROYAL_FLUSH);
    factory(hands.flushStraight_5.map(card_1.str5), poker_1.HandRank.STRAIGHT_FLUSH);
    factory(hands.fourOfKind_5.map(card_1.str5), poker_1.HandRank.FOUR_OF_A_KIND);
    factory(hands.fullHouse_5.map(card_1.str5), poker_1.HandRank.FULL_HOUSE);
    factory(hands.flush_5.map(card_1.str5), poker_1.HandRank.FLUSH);
    factory(hands.straight_5.map(card_1.str5), poker_1.HandRank.STRAIGHT);
    factory(hands.threeOfKind_5.map(card_1.str5), poker_1.HandRank.THREE_OF_A_KIND);
    factory(hands.twoPair_5.map(card_1.str5), poker_1.HandRank.TWO_PAIR);
    factory(hands.onePair_5.map(card_1.str5), poker_1.HandRank.ONE_PAIR);
    factory(hands.highCard_5.map(card_1.str5), poker_1.HandRank.HIGH_CARD);
    factory(hands.flushRoyal_7.map(card_1.str7), poker_1.HandRank.ROYAL_FLUSH);
    factory(hands.flushStraight_7.map(card_1.str7), poker_1.HandRank.STRAIGHT_FLUSH);
    factory(hands.fourOfKind_7.map(card_1.str7), poker_1.HandRank.FOUR_OF_A_KIND);
    factory(hands.fullHouse_7.map(card_1.str7), poker_1.HandRank.FULL_HOUSE);
    factory(hands.flush_7.map(card_1.str7), poker_1.HandRank.FLUSH);
    factory(hands.straight_7.map(card_1.str7), poker_1.HandRank.STRAIGHT);
    factory(hands.threeOfKind_7.map(card_1.str7), poker_1.HandRank.THREE_OF_A_KIND);
    factory(hands.twoPair_7.map(card_1.str7), poker_1.HandRank.TWO_PAIR);
    factory(hands.onePair_7.map(card_1.str7), poker_1.HandRank.ONE_PAIR);
    factory(hands.highCard_7.map(card_1.str7), poker_1.HandRank.HIGH_CARD);
});
//# sourceMappingURL=poker.spec.js.map