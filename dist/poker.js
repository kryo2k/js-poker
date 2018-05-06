"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const poker = require('../json/poker.json');
/**
* Does a binary search on products to find the nearest
* key provided in input.
*/
function findIt(key) {
    const products = poker.products;
    let low = 0, high = 4887, mid, pmid;
    while (low <= high) {
        mid = (high + low) >> 1; // divide by two
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
function handRankLabel(rank) {
    return poker.handRank[rank];
}
exports.handRankLabel = handRankLabel;
;
/**
* Gets the human text description of a hand rank detail value.
*/
function handRankDetailLabel(rank) {
    return poker.handRankDetail[rank];
}
exports.handRankDetailLabel = handRankDetailLabel;
;
/**
* Returns the full text description of an evaluation.
*/
function fullHandRankString(val) {
    var rank = handRank(val), rankStr = handRankLabel(rank), rankDet = handRankDetailed(val), rankDetStr = handRankDetailLabel(rankDet);
    return rankStr + (rankDetStr.length > 0 && rankStr.length > 0 ? ' ' : '') + rankDetStr;
}
exports.fullHandRankString = fullHandRankString;
;
/**
* Convert card into it's numerical poker value
*/
function toValue(card) {
    const rank = card.rank, suit = card.suit;
    return poker.ranks[rank] | (rank << 8) | poker.suits[suit] | (1 << (16 + rank));
}
exports.toValue = toValue;
;
/**
* Grade 5 cards (as numbers) and get poker hand ranking.
*/
function rank5num(c1, c2, c3, c4, c5) {
    const q = (c1 | c2 | c3 | c4 | c5) >> 16;
    // check for Flushes and StraightFlushes
    if (c1 & c2 & c3 & c4 & c5 & 0xF000)
        return poker.flushes[q];
    // check for Straights and HighCard hands
    const s = poker.unique5[q];
    if (s)
        return s;
    const v = findIt((c1 & 0xFF)
        * (c2 & 0xFF)
        * (c3 & 0xFF)
        * (c4 & 0xFF)
        * (c5 & 0xFF)); // do hard-way check
    return poker.values[v];
}
exports.rank5num = rank5num;
;
/**
* Grade 5 cards and get poker hand ranking.
*/
function rank5(c1, c2, c3, c4, c5) {
    return rank5num(toValue(c1), toValue(c2), toValue(c3), toValue(c4), toValue(c5));
}
exports.rank5 = rank5;
;
/**
* Grade 7 cards (as numbers) and get best 5 card poker hand ranking.
*/
function rank7num(c1, c2, c3, c4, c5, c6, c7) {
    // const args = [c1,c2,c3,c4,c5,c6,c7];
    return poker.perm7.reduce((low, permutation) => Math.min(low, rank5num(arguments[permutation[0]], arguments[permutation[1]], arguments[permutation[2]], arguments[permutation[3]], arguments[permutation[4]])), 9999);
}
exports.rank7num = rank7num;
;
/**
* Grade 7 cards and get poker hand ranking.
*/
function rank7(c1, c2, c3, c4, c5, c6, c7) {
    return rank7num(toValue(c1), toValue(c2), toValue(c3), toValue(c4), toValue(c5), toValue(c6), toValue(c7));
}
exports.rank7 = rank7;
;
/**
* ENUM for basic poker hand rank
*/
var HandRank;
(function (HandRank) {
    HandRank[HandRank["ROYAL_FLUSH"] = 0] = "ROYAL_FLUSH";
    HandRank[HandRank["STRAIGHT_FLUSH"] = 1] = "STRAIGHT_FLUSH";
    HandRank[HandRank["FOUR_OF_A_KIND"] = 2] = "FOUR_OF_A_KIND";
    HandRank[HandRank["FULL_HOUSE"] = 3] = "FULL_HOUSE";
    HandRank[HandRank["FLUSH"] = 4] = "FLUSH";
    HandRank[HandRank["STRAIGHT"] = 5] = "STRAIGHT";
    HandRank[HandRank["THREE_OF_A_KIND"] = 6] = "THREE_OF_A_KIND";
    HandRank[HandRank["TWO_PAIR"] = 7] = "TWO_PAIR";
    HandRank[HandRank["ONE_PAIR"] = 8] = "ONE_PAIR";
    HandRank[HandRank["HIGH_CARD"] = 9] = "HIGH_CARD";
})(HandRank = exports.HandRank || (exports.HandRank = {}));
;
/**
* ENUM for detailed poker hand rank
*/
var HandRankDetailed;
(function (HandRankDetailed) {
    HandRankDetailed[HandRankDetailed["HC_SEVEN"] = 0] = "HC_SEVEN";
    HandRankDetailed[HandRankDetailed["HC_EIGHT"] = 1] = "HC_EIGHT";
    HandRankDetailed[HandRankDetailed["HC_NINE"] = 2] = "HC_NINE";
    HandRankDetailed[HandRankDetailed["HC_TEN"] = 3] = "HC_TEN";
    HandRankDetailed[HandRankDetailed["HC_JACK"] = 4] = "HC_JACK";
    HandRankDetailed[HandRankDetailed["HC_QUEEN"] = 5] = "HC_QUEEN";
    HandRankDetailed[HandRankDetailed["HC_KING"] = 6] = "HC_KING";
    HandRankDetailed[HandRankDetailed["HC_ACE"] = 7] = "HC_ACE";
    HandRankDetailed[HandRankDetailed["PR_TWOS"] = 8] = "PR_TWOS";
    HandRankDetailed[HandRankDetailed["PR_THREES"] = 9] = "PR_THREES";
    HandRankDetailed[HandRankDetailed["PR_FOURS"] = 10] = "PR_FOURS";
    HandRankDetailed[HandRankDetailed["PR_FIVES"] = 11] = "PR_FIVES";
    HandRankDetailed[HandRankDetailed["PR_SIXES"] = 12] = "PR_SIXES";
    HandRankDetailed[HandRankDetailed["PR_SEVENS"] = 13] = "PR_SEVENS";
    HandRankDetailed[HandRankDetailed["PR_EIGHTS"] = 14] = "PR_EIGHTS";
    HandRankDetailed[HandRankDetailed["PR_NINES"] = 15] = "PR_NINES";
    HandRankDetailed[HandRankDetailed["PR_TENS"] = 16] = "PR_TENS";
    HandRankDetailed[HandRankDetailed["PR_JACKS"] = 17] = "PR_JACKS";
    HandRankDetailed[HandRankDetailed["PR_QUEENS"] = 18] = "PR_QUEENS";
    HandRankDetailed[HandRankDetailed["PR_KINGS"] = 19] = "PR_KINGS";
    HandRankDetailed[HandRankDetailed["PR_ACES"] = 20] = "PR_ACES";
    HandRankDetailed[HandRankDetailed["TP_THREES_TWOS"] = 21] = "TP_THREES_TWOS";
    HandRankDetailed[HandRankDetailed["TP_FOURS_TWOS"] = 22] = "TP_FOURS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_FOURS_THREES"] = 23] = "TP_FOURS_THREES";
    HandRankDetailed[HandRankDetailed["TP_FIVES_TWOS"] = 24] = "TP_FIVES_TWOS";
    HandRankDetailed[HandRankDetailed["TP_FIVES_THREES"] = 25] = "TP_FIVES_THREES";
    HandRankDetailed[HandRankDetailed["TP_FIVES_FOURS"] = 26] = "TP_FIVES_FOURS";
    HandRankDetailed[HandRankDetailed["TP_SIXES_TWOS"] = 27] = "TP_SIXES_TWOS";
    HandRankDetailed[HandRankDetailed["TP_SIXES_THREES"] = 28] = "TP_SIXES_THREES";
    HandRankDetailed[HandRankDetailed["TP_SIXES_FOURS"] = 29] = "TP_SIXES_FOURS";
    HandRankDetailed[HandRankDetailed["TP_SIXES_FIVES"] = 30] = "TP_SIXES_FIVES";
    HandRankDetailed[HandRankDetailed["TP_SEVENS_TWOS"] = 31] = "TP_SEVENS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_SEVENS_THREES"] = 32] = "TP_SEVENS_THREES";
    HandRankDetailed[HandRankDetailed["TP_SEVENS_FOURS"] = 33] = "TP_SEVENS_FOURS";
    HandRankDetailed[HandRankDetailed["TP_SEVENS_FIVES"] = 34] = "TP_SEVENS_FIVES";
    HandRankDetailed[HandRankDetailed["TP_SEVENS_SIXES"] = 35] = "TP_SEVENS_SIXES";
    HandRankDetailed[HandRankDetailed["TP_EIGHTS_TWOS"] = 36] = "TP_EIGHTS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_EIGHTS_THREES"] = 37] = "TP_EIGHTS_THREES";
    HandRankDetailed[HandRankDetailed["TP_EIGHTS_FOURS"] = 38] = "TP_EIGHTS_FOURS";
    HandRankDetailed[HandRankDetailed["TP_EIGHTS_FIVES"] = 39] = "TP_EIGHTS_FIVES";
    HandRankDetailed[HandRankDetailed["TP_EIGHTS_SIXES"] = 40] = "TP_EIGHTS_SIXES";
    HandRankDetailed[HandRankDetailed["TP_EIGHTS_SEVENS"] = 41] = "TP_EIGHTS_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_NINES_TWOS"] = 42] = "TP_NINES_TWOS";
    HandRankDetailed[HandRankDetailed["TP_NINES_THREES"] = 43] = "TP_NINES_THREES";
    HandRankDetailed[HandRankDetailed["TP_NINES_FOURS"] = 44] = "TP_NINES_FOURS";
    HandRankDetailed[HandRankDetailed["TP_NINES_FIVES"] = 45] = "TP_NINES_FIVES";
    HandRankDetailed[HandRankDetailed["TP_NINES_SIXES"] = 46] = "TP_NINES_SIXES";
    HandRankDetailed[HandRankDetailed["TP_NINES_SEVENS"] = 47] = "TP_NINES_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_NINES_EIGHTS"] = 48] = "TP_NINES_EIGHTS";
    HandRankDetailed[HandRankDetailed["TP_TENS_TWOS"] = 49] = "TP_TENS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_TENS_THREES"] = 50] = "TP_TENS_THREES";
    HandRankDetailed[HandRankDetailed["TP_TENS_FOURS"] = 51] = "TP_TENS_FOURS";
    HandRankDetailed[HandRankDetailed["TP_TENS_FIVES"] = 52] = "TP_TENS_FIVES";
    HandRankDetailed[HandRankDetailed["TP_TENS_SIXES"] = 53] = "TP_TENS_SIXES";
    HandRankDetailed[HandRankDetailed["TP_TENS_SEVENS"] = 54] = "TP_TENS_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_TENS_EIGHTS"] = 55] = "TP_TENS_EIGHTS";
    HandRankDetailed[HandRankDetailed["TP_TENS_NINES"] = 56] = "TP_TENS_NINES";
    HandRankDetailed[HandRankDetailed["TP_JACKS_TWOS"] = 57] = "TP_JACKS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_JACKS_THREES"] = 58] = "TP_JACKS_THREES";
    HandRankDetailed[HandRankDetailed["TP_JACKS_FOURS"] = 59] = "TP_JACKS_FOURS";
    HandRankDetailed[HandRankDetailed["TP_JACKS_FIVES"] = 60] = "TP_JACKS_FIVES";
    HandRankDetailed[HandRankDetailed["TP_JACKS_SIXES"] = 61] = "TP_JACKS_SIXES";
    HandRankDetailed[HandRankDetailed["TP_JACKS_SEVENS"] = 62] = "TP_JACKS_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_JACKS_EIGHTS"] = 63] = "TP_JACKS_EIGHTS";
    HandRankDetailed[HandRankDetailed["TP_JACKS_NINES"] = 64] = "TP_JACKS_NINES";
    HandRankDetailed[HandRankDetailed["TP_JACKS_TENS"] = 65] = "TP_JACKS_TENS";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_TWOS"] = 66] = "TP_QUEENS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_THREES"] = 67] = "TP_QUEENS_THREES";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_FOURS"] = 68] = "TP_QUEENS_FOURS";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_FIVES"] = 69] = "TP_QUEENS_FIVES";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_SIXES"] = 70] = "TP_QUEENS_SIXES";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_SEVENS"] = 71] = "TP_QUEENS_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_EIGHTS"] = 72] = "TP_QUEENS_EIGHTS";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_NINES"] = 73] = "TP_QUEENS_NINES";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_TENS"] = 74] = "TP_QUEENS_TENS";
    HandRankDetailed[HandRankDetailed["TP_QUEENS_JACKS"] = 75] = "TP_QUEENS_JACKS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_TWOS"] = 76] = "TP_KINGS_TWOS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_THREES"] = 77] = "TP_KINGS_THREES";
    HandRankDetailed[HandRankDetailed["TP_KINGS_FOURS"] = 78] = "TP_KINGS_FOURS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_FIVES"] = 79] = "TP_KINGS_FIVES";
    HandRankDetailed[HandRankDetailed["TP_KINGS_SIXES"] = 80] = "TP_KINGS_SIXES";
    HandRankDetailed[HandRankDetailed["TP_KINGS_SEVENS"] = 81] = "TP_KINGS_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_EIGHTS"] = 82] = "TP_KINGS_EIGHTS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_NINES"] = 83] = "TP_KINGS_NINES";
    HandRankDetailed[HandRankDetailed["TP_KINGS_TENS"] = 84] = "TP_KINGS_TENS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_JACKS"] = 85] = "TP_KINGS_JACKS";
    HandRankDetailed[HandRankDetailed["TP_KINGS_QUEENS"] = 86] = "TP_KINGS_QUEENS";
    HandRankDetailed[HandRankDetailed["TP_ACES_TWOS"] = 87] = "TP_ACES_TWOS";
    HandRankDetailed[HandRankDetailed["TP_ACES_THREES"] = 88] = "TP_ACES_THREES";
    HandRankDetailed[HandRankDetailed["TP_ACES_FOURS"] = 89] = "TP_ACES_FOURS";
    HandRankDetailed[HandRankDetailed["TP_ACES_FIVES"] = 90] = "TP_ACES_FIVES";
    HandRankDetailed[HandRankDetailed["TP_ACES_SIXES"] = 91] = "TP_ACES_SIXES";
    HandRankDetailed[HandRankDetailed["TP_ACES_SEVENS"] = 92] = "TP_ACES_SEVENS";
    HandRankDetailed[HandRankDetailed["TP_ACES_EIGHTS"] = 93] = "TP_ACES_EIGHTS";
    HandRankDetailed[HandRankDetailed["TP_ACES_NINES"] = 94] = "TP_ACES_NINES";
    HandRankDetailed[HandRankDetailed["TP_ACES_TENS"] = 95] = "TP_ACES_TENS";
    HandRankDetailed[HandRankDetailed["TP_ACES_JACKS"] = 96] = "TP_ACES_JACKS";
    HandRankDetailed[HandRankDetailed["TP_ACES_QUEENS"] = 97] = "TP_ACES_QUEENS";
    HandRankDetailed[HandRankDetailed["TP_ACES_KINGS"] = 98] = "TP_ACES_KINGS";
    HandRankDetailed[HandRankDetailed["TK_TWOS_FOUR"] = 99] = "TK_TWOS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_TWOS_FIVE"] = 100] = "TK_TWOS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_TWOS_SIX"] = 101] = "TK_TWOS_SIX";
    HandRankDetailed[HandRankDetailed["TK_TWOS_SEVEN"] = 102] = "TK_TWOS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_TWOS_EIGHT"] = 103] = "TK_TWOS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_TWOS_NINE"] = 104] = "TK_TWOS_NINE";
    HandRankDetailed[HandRankDetailed["TK_TWOS_TEN"] = 105] = "TK_TWOS_TEN";
    HandRankDetailed[HandRankDetailed["TK_TWOS_JACK"] = 106] = "TK_TWOS_JACK";
    HandRankDetailed[HandRankDetailed["TK_TWOS_QUEEN"] = 107] = "TK_TWOS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_TWOS_KING"] = 108] = "TK_TWOS_KING";
    HandRankDetailed[HandRankDetailed["TK_TWOS_ACE"] = 109] = "TK_TWOS_ACE";
    HandRankDetailed[HandRankDetailed["TK_THREES_FOUR"] = 110] = "TK_THREES_FOUR";
    HandRankDetailed[HandRankDetailed["TK_THREES_FIVE"] = 111] = "TK_THREES_FIVE";
    HandRankDetailed[HandRankDetailed["TK_THREES_SIX"] = 112] = "TK_THREES_SIX";
    HandRankDetailed[HandRankDetailed["TK_THREES_SEVEN"] = 113] = "TK_THREES_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_THREES_EIGHT"] = 114] = "TK_THREES_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_THREES_NINE"] = 115] = "TK_THREES_NINE";
    HandRankDetailed[HandRankDetailed["TK_THREES_TEN"] = 116] = "TK_THREES_TEN";
    HandRankDetailed[HandRankDetailed["TK_THREES_JACK"] = 117] = "TK_THREES_JACK";
    HandRankDetailed[HandRankDetailed["TK_THREES_QUEEN"] = 118] = "TK_THREES_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_THREES_KING"] = 119] = "TK_THREES_KING";
    HandRankDetailed[HandRankDetailed["TK_THREES_ACE"] = 120] = "TK_THREES_ACE";
    HandRankDetailed[HandRankDetailed["TK_FOURS_THREE"] = 121] = "TK_FOURS_THREE";
    HandRankDetailed[HandRankDetailed["TK_FOURS_FIVE"] = 122] = "TK_FOURS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_FOURS_SIX"] = 123] = "TK_FOURS_SIX";
    HandRankDetailed[HandRankDetailed["TK_FOURS_SEVEN"] = 124] = "TK_FOURS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_FOURS_EIGHT"] = 125] = "TK_FOURS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_FOURS_NINE"] = 126] = "TK_FOURS_NINE";
    HandRankDetailed[HandRankDetailed["TK_FOURS_TEN"] = 127] = "TK_FOURS_TEN";
    HandRankDetailed[HandRankDetailed["TK_FOURS_JACK"] = 128] = "TK_FOURS_JACK";
    HandRankDetailed[HandRankDetailed["TK_FOURS_QUEEN"] = 129] = "TK_FOURS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_FOURS_KING"] = 130] = "TK_FOURS_KING";
    HandRankDetailed[HandRankDetailed["TK_FOURS_ACE"] = 131] = "TK_FOURS_ACE";
    HandRankDetailed[HandRankDetailed["TK_FIVES_THREE"] = 132] = "TK_FIVES_THREE";
    HandRankDetailed[HandRankDetailed["TK_FIVES_FOUR"] = 133] = "TK_FIVES_FOUR";
    HandRankDetailed[HandRankDetailed["TK_FIVES_SIX"] = 134] = "TK_FIVES_SIX";
    HandRankDetailed[HandRankDetailed["TK_FIVES_SEVEN"] = 135] = "TK_FIVES_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_FIVES_EIGHT"] = 136] = "TK_FIVES_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_FIVES_NINE"] = 137] = "TK_FIVES_NINE";
    HandRankDetailed[HandRankDetailed["TK_FIVES_TEN"] = 138] = "TK_FIVES_TEN";
    HandRankDetailed[HandRankDetailed["TK_FIVES_JACK"] = 139] = "TK_FIVES_JACK";
    HandRankDetailed[HandRankDetailed["TK_FIVES_QUEEN"] = 140] = "TK_FIVES_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_FIVES_KING"] = 141] = "TK_FIVES_KING";
    HandRankDetailed[HandRankDetailed["TK_FIVES_ACE"] = 142] = "TK_FIVES_ACE";
    HandRankDetailed[HandRankDetailed["TK_SIXES_THREE"] = 143] = "TK_SIXES_THREE";
    HandRankDetailed[HandRankDetailed["TK_SIXES_FOUR"] = 144] = "TK_SIXES_FOUR";
    HandRankDetailed[HandRankDetailed["TK_SIXES_FIVE"] = 145] = "TK_SIXES_FIVE";
    HandRankDetailed[HandRankDetailed["TK_SIXES_SEVEN"] = 146] = "TK_SIXES_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_SIXES_EIGHT"] = 147] = "TK_SIXES_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_SIXES_NINE"] = 148] = "TK_SIXES_NINE";
    HandRankDetailed[HandRankDetailed["TK_SIXES_TEN"] = 149] = "TK_SIXES_TEN";
    HandRankDetailed[HandRankDetailed["TK_SIXES_JACK"] = 150] = "TK_SIXES_JACK";
    HandRankDetailed[HandRankDetailed["TK_SIXES_QUEEN"] = 151] = "TK_SIXES_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_SIXES_KING"] = 152] = "TK_SIXES_KING";
    HandRankDetailed[HandRankDetailed["TK_SIXES_ACE"] = 153] = "TK_SIXES_ACE";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_THREE"] = 154] = "TK_SEVENS_THREE";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_FOUR"] = 155] = "TK_SEVENS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_FIVE"] = 156] = "TK_SEVENS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_SIX"] = 157] = "TK_SEVENS_SIX";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_EIGHT"] = 158] = "TK_SEVENS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_NINE"] = 159] = "TK_SEVENS_NINE";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_TEN"] = 160] = "TK_SEVENS_TEN";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_JACK"] = 161] = "TK_SEVENS_JACK";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_QUEEN"] = 162] = "TK_SEVENS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_KING"] = 163] = "TK_SEVENS_KING";
    HandRankDetailed[HandRankDetailed["TK_SEVENS_ACE"] = 164] = "TK_SEVENS_ACE";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_THREE"] = 165] = "TK_EIGHTS_THREE";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_FOUR"] = 166] = "TK_EIGHTS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_FIVE"] = 167] = "TK_EIGHTS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_SIX"] = 168] = "TK_EIGHTS_SIX";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_SEVEN"] = 169] = "TK_EIGHTS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_NINE"] = 170] = "TK_EIGHTS_NINE";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_TEN"] = 171] = "TK_EIGHTS_TEN";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_JACK"] = 172] = "TK_EIGHTS_JACK";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_QUEEN"] = 173] = "TK_EIGHTS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_KING"] = 174] = "TK_EIGHTS_KING";
    HandRankDetailed[HandRankDetailed["TK_EIGHTS_ACE"] = 175] = "TK_EIGHTS_ACE";
    HandRankDetailed[HandRankDetailed["TK_NINES_THREE"] = 176] = "TK_NINES_THREE";
    HandRankDetailed[HandRankDetailed["TK_NINES_FOUR"] = 177] = "TK_NINES_FOUR";
    HandRankDetailed[HandRankDetailed["TK_NINES_FIVE"] = 178] = "TK_NINES_FIVE";
    HandRankDetailed[HandRankDetailed["TK_NINES_SIX"] = 179] = "TK_NINES_SIX";
    HandRankDetailed[HandRankDetailed["TK_NINES_SEVEN"] = 180] = "TK_NINES_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_NINES_EIGHT"] = 181] = "TK_NINES_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_NINES_TEN"] = 182] = "TK_NINES_TEN";
    HandRankDetailed[HandRankDetailed["TK_NINES_JACK"] = 183] = "TK_NINES_JACK";
    HandRankDetailed[HandRankDetailed["TK_NINES_QUEEN"] = 184] = "TK_NINES_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_NINES_KING"] = 185] = "TK_NINES_KING";
    HandRankDetailed[HandRankDetailed["TK_NINES_ACE"] = 186] = "TK_NINES_ACE";
    HandRankDetailed[HandRankDetailed["TK_TENS_THREE"] = 187] = "TK_TENS_THREE";
    HandRankDetailed[HandRankDetailed["TK_TENS_FOUR"] = 188] = "TK_TENS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_TENS_FIVE"] = 189] = "TK_TENS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_TENS_SIX"] = 190] = "TK_TENS_SIX";
    HandRankDetailed[HandRankDetailed["TK_TENS_SEVEN"] = 191] = "TK_TENS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_TENS_EIGHT"] = 192] = "TK_TENS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_TENS_NINE"] = 193] = "TK_TENS_NINE";
    HandRankDetailed[HandRankDetailed["TK_TENS_JACK"] = 194] = "TK_TENS_JACK";
    HandRankDetailed[HandRankDetailed["TK_TENS_QUEEN"] = 195] = "TK_TENS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_TENS_KING"] = 196] = "TK_TENS_KING";
    HandRankDetailed[HandRankDetailed["TK_TENS_ACE"] = 197] = "TK_TENS_ACE";
    HandRankDetailed[HandRankDetailed["TK_JACKS_THREE"] = 198] = "TK_JACKS_THREE";
    HandRankDetailed[HandRankDetailed["TK_JACKS_FOUR"] = 199] = "TK_JACKS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_JACKS_FIVE"] = 200] = "TK_JACKS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_JACKS_SIX"] = 201] = "TK_JACKS_SIX";
    HandRankDetailed[HandRankDetailed["TK_JACKS_SEVEN"] = 202] = "TK_JACKS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_JACKS_EIGHT"] = 203] = "TK_JACKS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_JACKS_NINE"] = 204] = "TK_JACKS_NINE";
    HandRankDetailed[HandRankDetailed["TK_JACKS_TEN"] = 205] = "TK_JACKS_TEN";
    HandRankDetailed[HandRankDetailed["TK_JACKS_QUEEN"] = 206] = "TK_JACKS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_JACKS_KING"] = 207] = "TK_JACKS_KING";
    HandRankDetailed[HandRankDetailed["TK_JACKS_ACE"] = 208] = "TK_JACKS_ACE";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_THREE"] = 209] = "TK_QUEENS_THREE";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_FOUR"] = 210] = "TK_QUEENS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_FIVE"] = 211] = "TK_QUEENS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_SIX"] = 212] = "TK_QUEENS_SIX";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_SEVEN"] = 213] = "TK_QUEENS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_EIGHT"] = 214] = "TK_QUEENS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_NINE"] = 215] = "TK_QUEENS_NINE";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_TEN"] = 216] = "TK_QUEENS_TEN";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_JACK"] = 217] = "TK_QUEENS_JACK";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_KING"] = 218] = "TK_QUEENS_KING";
    HandRankDetailed[HandRankDetailed["TK_QUEENS_ACE"] = 219] = "TK_QUEENS_ACE";
    HandRankDetailed[HandRankDetailed["TK_KINGS_THREE"] = 220] = "TK_KINGS_THREE";
    HandRankDetailed[HandRankDetailed["TK_KINGS_FOUR"] = 221] = "TK_KINGS_FOUR";
    HandRankDetailed[HandRankDetailed["TK_KINGS_FIVE"] = 222] = "TK_KINGS_FIVE";
    HandRankDetailed[HandRankDetailed["TK_KINGS_SIX"] = 223] = "TK_KINGS_SIX";
    HandRankDetailed[HandRankDetailed["TK_KINGS_SEVEN"] = 224] = "TK_KINGS_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_KINGS_EIGHT"] = 225] = "TK_KINGS_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_KINGS_NINE"] = 226] = "TK_KINGS_NINE";
    HandRankDetailed[HandRankDetailed["TK_KINGS_TEN"] = 227] = "TK_KINGS_TEN";
    HandRankDetailed[HandRankDetailed["TK_KINGS_JACK"] = 228] = "TK_KINGS_JACK";
    HandRankDetailed[HandRankDetailed["TK_KINGS_QUEEN"] = 229] = "TK_KINGS_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_KINGS_ACE"] = 230] = "TK_KINGS_ACE";
    HandRankDetailed[HandRankDetailed["TK_ACES_THREE"] = 231] = "TK_ACES_THREE";
    HandRankDetailed[HandRankDetailed["TK_ACES_FOUR"] = 232] = "TK_ACES_FOUR";
    HandRankDetailed[HandRankDetailed["TK_ACES_FIVE"] = 233] = "TK_ACES_FIVE";
    HandRankDetailed[HandRankDetailed["TK_ACES_SIX"] = 234] = "TK_ACES_SIX";
    HandRankDetailed[HandRankDetailed["TK_ACES_SEVEN"] = 235] = "TK_ACES_SEVEN";
    HandRankDetailed[HandRankDetailed["TK_ACES_EIGHT"] = 236] = "TK_ACES_EIGHT";
    HandRankDetailed[HandRankDetailed["TK_ACES_NINE"] = 237] = "TK_ACES_NINE";
    HandRankDetailed[HandRankDetailed["TK_ACES_TEN"] = 238] = "TK_ACES_TEN";
    HandRankDetailed[HandRankDetailed["TK_ACES_JACK"] = 239] = "TK_ACES_JACK";
    HandRankDetailed[HandRankDetailed["TK_ACES_QUEEN"] = 240] = "TK_ACES_QUEEN";
    HandRankDetailed[HandRankDetailed["TK_ACES_KING"] = 241] = "TK_ACES_KING";
    HandRankDetailed[HandRankDetailed["ST_FIVE"] = 242] = "ST_FIVE";
    HandRankDetailed[HandRankDetailed["ST_SIX"] = 243] = "ST_SIX";
    HandRankDetailed[HandRankDetailed["ST_SEVEN"] = 244] = "ST_SEVEN";
    HandRankDetailed[HandRankDetailed["ST_EIGHT"] = 245] = "ST_EIGHT";
    HandRankDetailed[HandRankDetailed["ST_NINE"] = 246] = "ST_NINE";
    HandRankDetailed[HandRankDetailed["ST_TEN"] = 247] = "ST_TEN";
    HandRankDetailed[HandRankDetailed["ST_JACK"] = 248] = "ST_JACK";
    HandRankDetailed[HandRankDetailed["ST_QUEEN"] = 249] = "ST_QUEEN";
    HandRankDetailed[HandRankDetailed["ST_KING"] = 250] = "ST_KING";
    HandRankDetailed[HandRankDetailed["ST_ACE"] = 251] = "ST_ACE";
    HandRankDetailed[HandRankDetailed["FL_SEVEN"] = 252] = "FL_SEVEN";
    HandRankDetailed[HandRankDetailed["FL_EIGHT"] = 253] = "FL_EIGHT";
    HandRankDetailed[HandRankDetailed["FL_NINE"] = 254] = "FL_NINE";
    HandRankDetailed[HandRankDetailed["FL_TEN"] = 255] = "FL_TEN";
    HandRankDetailed[HandRankDetailed["FL_JACK"] = 256] = "FL_JACK";
    HandRankDetailed[HandRankDetailed["FL_QUEEN"] = 257] = "FL_QUEEN";
    HandRankDetailed[HandRankDetailed["FL_KING"] = 258] = "FL_KING";
    HandRankDetailed[HandRankDetailed["FL_ACE"] = 259] = "FL_ACE";
    HandRankDetailed[HandRankDetailed["FH_TWOS_THREES"] = 260] = "FH_TWOS_THREES";
    HandRankDetailed[HandRankDetailed["FH_TWOS_FOURS"] = 261] = "FH_TWOS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_FIVES"] = 262] = "FH_TWOS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_TWOS_SIXES"] = 263] = "FH_TWOS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_TWOS_SEVENS"] = 264] = "FH_TWOS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_EIGHTS"] = 265] = "FH_TWOS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_NINES"] = 266] = "FH_TWOS_NINES";
    HandRankDetailed[HandRankDetailed["FH_TWOS_TENS"] = 267] = "FH_TWOS_TENS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_JACKS"] = 268] = "FH_TWOS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_QUEENS"] = 269] = "FH_TWOS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_KINGS"] = 270] = "FH_TWOS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_TWOS_ACES"] = 271] = "FH_TWOS_ACES";
    HandRankDetailed[HandRankDetailed["FH_THREES_TWOS"] = 272] = "FH_THREES_TWOS";
    HandRankDetailed[HandRankDetailed["FH_THREES_FOURS"] = 273] = "FH_THREES_FOURS";
    HandRankDetailed[HandRankDetailed["FH_THREES_FIVES"] = 274] = "FH_THREES_FIVES";
    HandRankDetailed[HandRankDetailed["FH_THREES_SIXES"] = 275] = "FH_THREES_SIXES";
    HandRankDetailed[HandRankDetailed["FH_THREES_SEVENS"] = 276] = "FH_THREES_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_THREES_EIGHTS"] = 277] = "FH_THREES_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_THREES_NINES"] = 278] = "FH_THREES_NINES";
    HandRankDetailed[HandRankDetailed["FH_THREES_TENS"] = 279] = "FH_THREES_TENS";
    HandRankDetailed[HandRankDetailed["FH_THREES_JACKS"] = 280] = "FH_THREES_JACKS";
    HandRankDetailed[HandRankDetailed["FH_THREES_QUEENS"] = 281] = "FH_THREES_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_THREES_KINGS"] = 282] = "FH_THREES_KINGS";
    HandRankDetailed[HandRankDetailed["FH_THREES_ACES"] = 283] = "FH_THREES_ACES";
    HandRankDetailed[HandRankDetailed["FH_FOURS_TWOS"] = 284] = "FH_FOURS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_THREES"] = 285] = "FH_FOURS_THREES";
    HandRankDetailed[HandRankDetailed["FH_FOURS_FIVES"] = 286] = "FH_FOURS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_FOURS_SIXES"] = 287] = "FH_FOURS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_FOURS_SEVENS"] = 288] = "FH_FOURS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_EIGHTS"] = 289] = "FH_FOURS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_NINES"] = 290] = "FH_FOURS_NINES";
    HandRankDetailed[HandRankDetailed["FH_FOURS_TENS"] = 291] = "FH_FOURS_TENS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_JACKS"] = 292] = "FH_FOURS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_QUEENS"] = 293] = "FH_FOURS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_KINGS"] = 294] = "FH_FOURS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_FOURS_ACES"] = 295] = "FH_FOURS_ACES";
    HandRankDetailed[HandRankDetailed["FH_FIVES_TWOS"] = 296] = "FH_FIVES_TWOS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_THREES"] = 297] = "FH_FIVES_THREES";
    HandRankDetailed[HandRankDetailed["FH_FIVES_FOURS"] = 298] = "FH_FIVES_FOURS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_SIXES"] = 299] = "FH_FIVES_SIXES";
    HandRankDetailed[HandRankDetailed["FH_FIVES_SEVENS"] = 300] = "FH_FIVES_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_EIGHTS"] = 301] = "FH_FIVES_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_NINES"] = 302] = "FH_FIVES_NINES";
    HandRankDetailed[HandRankDetailed["FH_FIVES_TENS"] = 303] = "FH_FIVES_TENS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_JACKS"] = 304] = "FH_FIVES_JACKS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_QUEENS"] = 305] = "FH_FIVES_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_KINGS"] = 306] = "FH_FIVES_KINGS";
    HandRankDetailed[HandRankDetailed["FH_FIVES_ACES"] = 307] = "FH_FIVES_ACES";
    HandRankDetailed[HandRankDetailed["FH_SIXES_TWOS"] = 308] = "FH_SIXES_TWOS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_THREES"] = 309] = "FH_SIXES_THREES";
    HandRankDetailed[HandRankDetailed["FH_SIXES_FOURS"] = 310] = "FH_SIXES_FOURS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_FIVES"] = 311] = "FH_SIXES_FIVES";
    HandRankDetailed[HandRankDetailed["FH_SIXES_SEVENS"] = 312] = "FH_SIXES_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_EIGHTS"] = 313] = "FH_SIXES_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_NINES"] = 314] = "FH_SIXES_NINES";
    HandRankDetailed[HandRankDetailed["FH_SIXES_TENS"] = 315] = "FH_SIXES_TENS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_JACKS"] = 316] = "FH_SIXES_JACKS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_QUEENS"] = 317] = "FH_SIXES_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_KINGS"] = 318] = "FH_SIXES_KINGS";
    HandRankDetailed[HandRankDetailed["FH_SIXES_ACES"] = 319] = "FH_SIXES_ACES";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_TWOS"] = 320] = "FH_SEVENS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_THREES"] = 321] = "FH_SEVENS_THREES";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_FOURS"] = 322] = "FH_SEVENS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_FIVES"] = 323] = "FH_SEVENS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_SIXES"] = 324] = "FH_SEVENS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_EIGHTS"] = 325] = "FH_SEVENS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_NINES"] = 326] = "FH_SEVENS_NINES";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_TENS"] = 327] = "FH_SEVENS_TENS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_JACKS"] = 328] = "FH_SEVENS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_QUEENS"] = 329] = "FH_SEVENS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_KINGS"] = 330] = "FH_SEVENS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_SEVENS_ACES"] = 331] = "FH_SEVENS_ACES";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_TWOS"] = 332] = "FH_EIGHTS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_THREES"] = 333] = "FH_EIGHTS_THREES";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_FOURS"] = 334] = "FH_EIGHTS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_FIVES"] = 335] = "FH_EIGHTS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_SIXES"] = 336] = "FH_EIGHTS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_SEVENS"] = 337] = "FH_EIGHTS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_NINES"] = 338] = "FH_EIGHTS_NINES";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_TENS"] = 339] = "FH_EIGHTS_TENS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_JACKS"] = 340] = "FH_EIGHTS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_QUEENS"] = 341] = "FH_EIGHTS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_KINGS"] = 342] = "FH_EIGHTS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_EIGHTS_ACES"] = 343] = "FH_EIGHTS_ACES";
    HandRankDetailed[HandRankDetailed["FH_NINES_TWOS"] = 344] = "FH_NINES_TWOS";
    HandRankDetailed[HandRankDetailed["FH_NINES_THREES"] = 345] = "FH_NINES_THREES";
    HandRankDetailed[HandRankDetailed["FH_NINES_FOURS"] = 346] = "FH_NINES_FOURS";
    HandRankDetailed[HandRankDetailed["FH_NINES_FIVES"] = 347] = "FH_NINES_FIVES";
    HandRankDetailed[HandRankDetailed["FH_NINES_SIXES"] = 348] = "FH_NINES_SIXES";
    HandRankDetailed[HandRankDetailed["FH_NINES_SEVENS"] = 349] = "FH_NINES_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_NINES_EIGHTS"] = 350] = "FH_NINES_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_NINES_TENS"] = 351] = "FH_NINES_TENS";
    HandRankDetailed[HandRankDetailed["FH_NINES_JACKS"] = 352] = "FH_NINES_JACKS";
    HandRankDetailed[HandRankDetailed["FH_NINES_QUEENS"] = 353] = "FH_NINES_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_NINES_KINGS"] = 354] = "FH_NINES_KINGS";
    HandRankDetailed[HandRankDetailed["FH_NINES_ACES"] = 355] = "FH_NINES_ACES";
    HandRankDetailed[HandRankDetailed["FH_TENS_TWOS"] = 356] = "FH_TENS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_TENS_THREES"] = 357] = "FH_TENS_THREES";
    HandRankDetailed[HandRankDetailed["FH_TENS_FOURS"] = 358] = "FH_TENS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_TENS_FIVES"] = 359] = "FH_TENS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_TENS_SIXES"] = 360] = "FH_TENS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_TENS_SEVENS"] = 361] = "FH_TENS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_TENS_EIGHTS"] = 362] = "FH_TENS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_TENS_NINES"] = 363] = "FH_TENS_NINES";
    HandRankDetailed[HandRankDetailed["FH_TENS_JACKS"] = 364] = "FH_TENS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_TENS_QUEENS"] = 365] = "FH_TENS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_TENS_KINGS"] = 366] = "FH_TENS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_TENS_ACES"] = 367] = "FH_TENS_ACES";
    HandRankDetailed[HandRankDetailed["FH_JACKS_TWOS"] = 368] = "FH_JACKS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_THREES"] = 369] = "FH_JACKS_THREES";
    HandRankDetailed[HandRankDetailed["FH_JACKS_FOURS"] = 370] = "FH_JACKS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_FIVES"] = 371] = "FH_JACKS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_JACKS_SIXES"] = 372] = "FH_JACKS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_JACKS_SEVENS"] = 373] = "FH_JACKS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_EIGHTS"] = 374] = "FH_JACKS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_NINES"] = 375] = "FH_JACKS_NINES";
    HandRankDetailed[HandRankDetailed["FH_JACKS_TENS"] = 376] = "FH_JACKS_TENS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_QUEENS"] = 377] = "FH_JACKS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_KINGS"] = 378] = "FH_JACKS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_JACKS_ACES"] = 379] = "FH_JACKS_ACES";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_TWOS"] = 380] = "FH_QUEENS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_THREES"] = 381] = "FH_QUEENS_THREES";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_FOURS"] = 382] = "FH_QUEENS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_FIVES"] = 383] = "FH_QUEENS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_SIXES"] = 384] = "FH_QUEENS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_SEVENS"] = 385] = "FH_QUEENS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_EIGHTS"] = 386] = "FH_QUEENS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_NINES"] = 387] = "FH_QUEENS_NINES";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_TENS"] = 388] = "FH_QUEENS_TENS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_JACKS"] = 389] = "FH_QUEENS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_KINGS"] = 390] = "FH_QUEENS_KINGS";
    HandRankDetailed[HandRankDetailed["FH_QUEENS_ACES"] = 391] = "FH_QUEENS_ACES";
    HandRankDetailed[HandRankDetailed["FH_KINGS_TWOS"] = 392] = "FH_KINGS_TWOS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_THREES"] = 393] = "FH_KINGS_THREES";
    HandRankDetailed[HandRankDetailed["FH_KINGS_FOURS"] = 394] = "FH_KINGS_FOURS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_FIVES"] = 395] = "FH_KINGS_FIVES";
    HandRankDetailed[HandRankDetailed["FH_KINGS_SIXES"] = 396] = "FH_KINGS_SIXES";
    HandRankDetailed[HandRankDetailed["FH_KINGS_SEVENS"] = 397] = "FH_KINGS_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_EIGHTS"] = 398] = "FH_KINGS_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_NINES"] = 399] = "FH_KINGS_NINES";
    HandRankDetailed[HandRankDetailed["FH_KINGS_TENS"] = 400] = "FH_KINGS_TENS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_JACKS"] = 401] = "FH_KINGS_JACKS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_QUEENS"] = 402] = "FH_KINGS_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_KINGS_ACES"] = 403] = "FH_KINGS_ACES";
    HandRankDetailed[HandRankDetailed["FH_ACES_TWOS"] = 404] = "FH_ACES_TWOS";
    HandRankDetailed[HandRankDetailed["FH_ACES_THREES"] = 405] = "FH_ACES_THREES";
    HandRankDetailed[HandRankDetailed["FH_ACES_FOURS"] = 406] = "FH_ACES_FOURS";
    HandRankDetailed[HandRankDetailed["FH_ACES_FIVES"] = 407] = "FH_ACES_FIVES";
    HandRankDetailed[HandRankDetailed["FH_ACES_SIXES"] = 408] = "FH_ACES_SIXES";
    HandRankDetailed[HandRankDetailed["FH_ACES_SEVENS"] = 409] = "FH_ACES_SEVENS";
    HandRankDetailed[HandRankDetailed["FH_ACES_EIGHTS"] = 410] = "FH_ACES_EIGHTS";
    HandRankDetailed[HandRankDetailed["FH_ACES_NINES"] = 411] = "FH_ACES_NINES";
    HandRankDetailed[HandRankDetailed["FH_ACES_TENS"] = 412] = "FH_ACES_TENS";
    HandRankDetailed[HandRankDetailed["FH_ACES_JACKS"] = 413] = "FH_ACES_JACKS";
    HandRankDetailed[HandRankDetailed["FH_ACES_QUEENS"] = 414] = "FH_ACES_QUEENS";
    HandRankDetailed[HandRankDetailed["FH_ACES_KINGS"] = 415] = "FH_ACES_KINGS";
    HandRankDetailed[HandRankDetailed["FK_TWOS_THREE"] = 416] = "FK_TWOS_THREE";
    HandRankDetailed[HandRankDetailed["FK_TWOS_FOUR"] = 417] = "FK_TWOS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_TWOS_FIVE"] = 418] = "FK_TWOS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_TWOS_SIX"] = 419] = "FK_TWOS_SIX";
    HandRankDetailed[HandRankDetailed["FK_TWOS_SEVEN"] = 420] = "FK_TWOS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_TWOS_EIGHT"] = 421] = "FK_TWOS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_TWOS_NINE"] = 422] = "FK_TWOS_NINE";
    HandRankDetailed[HandRankDetailed["FK_TWOS_TEN"] = 423] = "FK_TWOS_TEN";
    HandRankDetailed[HandRankDetailed["FK_TWOS_JACK"] = 424] = "FK_TWOS_JACK";
    HandRankDetailed[HandRankDetailed["FK_TWOS_QUEEN"] = 425] = "FK_TWOS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_TWOS_KING"] = 426] = "FK_TWOS_KING";
    HandRankDetailed[HandRankDetailed["FK_TWOS_ACE"] = 427] = "FK_TWOS_ACE";
    HandRankDetailed[HandRankDetailed["FK_THREES_TWO"] = 428] = "FK_THREES_TWO";
    HandRankDetailed[HandRankDetailed["FK_THREES_FOUR"] = 429] = "FK_THREES_FOUR";
    HandRankDetailed[HandRankDetailed["FK_THREES_FIVE"] = 430] = "FK_THREES_FIVE";
    HandRankDetailed[HandRankDetailed["FK_THREES_SIX"] = 431] = "FK_THREES_SIX";
    HandRankDetailed[HandRankDetailed["FK_THREES_SEVEN"] = 432] = "FK_THREES_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_THREES_EIGHT"] = 433] = "FK_THREES_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_THREES_NINE"] = 434] = "FK_THREES_NINE";
    HandRankDetailed[HandRankDetailed["FK_THREES_TEN"] = 435] = "FK_THREES_TEN";
    HandRankDetailed[HandRankDetailed["FK_THREES_JACK"] = 436] = "FK_THREES_JACK";
    HandRankDetailed[HandRankDetailed["FK_THREES_QUEEN"] = 437] = "FK_THREES_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_THREES_KING"] = 438] = "FK_THREES_KING";
    HandRankDetailed[HandRankDetailed["FK_THREES_ACE"] = 439] = "FK_THREES_ACE";
    HandRankDetailed[HandRankDetailed["FK_FOURS_TWO"] = 440] = "FK_FOURS_TWO";
    HandRankDetailed[HandRankDetailed["FK_FOURS_THREE"] = 441] = "FK_FOURS_THREE";
    HandRankDetailed[HandRankDetailed["FK_FOURS_FIVE"] = 442] = "FK_FOURS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_FOURS_SIX"] = 443] = "FK_FOURS_SIX";
    HandRankDetailed[HandRankDetailed["FK_FOURS_SEVEN"] = 444] = "FK_FOURS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_FOURS_EIGHT"] = 445] = "FK_FOURS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_FOURS_NINE"] = 446] = "FK_FOURS_NINE";
    HandRankDetailed[HandRankDetailed["FK_FOURS_TEN"] = 447] = "FK_FOURS_TEN";
    HandRankDetailed[HandRankDetailed["FK_FOURS_JACK"] = 448] = "FK_FOURS_JACK";
    HandRankDetailed[HandRankDetailed["FK_FOURS_QUEEN"] = 449] = "FK_FOURS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_FOURS_KING"] = 450] = "FK_FOURS_KING";
    HandRankDetailed[HandRankDetailed["FK_FOURS_ACE"] = 451] = "FK_FOURS_ACE";
    HandRankDetailed[HandRankDetailed["FK_FIVES_TWO"] = 452] = "FK_FIVES_TWO";
    HandRankDetailed[HandRankDetailed["FK_FIVES_THREE"] = 453] = "FK_FIVES_THREE";
    HandRankDetailed[HandRankDetailed["FK_FIVES_FOUR"] = 454] = "FK_FIVES_FOUR";
    HandRankDetailed[HandRankDetailed["FK_FIVES_SIX"] = 455] = "FK_FIVES_SIX";
    HandRankDetailed[HandRankDetailed["FK_FIVES_SEVEN"] = 456] = "FK_FIVES_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_FIVES_EIGHT"] = 457] = "FK_FIVES_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_FIVES_NINE"] = 458] = "FK_FIVES_NINE";
    HandRankDetailed[HandRankDetailed["FK_FIVES_TEN"] = 459] = "FK_FIVES_TEN";
    HandRankDetailed[HandRankDetailed["FK_FIVES_JACK"] = 460] = "FK_FIVES_JACK";
    HandRankDetailed[HandRankDetailed["FK_FIVES_QUEEN"] = 461] = "FK_FIVES_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_FIVES_KING"] = 462] = "FK_FIVES_KING";
    HandRankDetailed[HandRankDetailed["FK_FIVES_ACE"] = 463] = "FK_FIVES_ACE";
    HandRankDetailed[HandRankDetailed["FK_SIXES_TWO"] = 464] = "FK_SIXES_TWO";
    HandRankDetailed[HandRankDetailed["FK_SIXES_THREE"] = 465] = "FK_SIXES_THREE";
    HandRankDetailed[HandRankDetailed["FK_SIXES_FOUR"] = 466] = "FK_SIXES_FOUR";
    HandRankDetailed[HandRankDetailed["FK_SIXES_FIVE"] = 467] = "FK_SIXES_FIVE";
    HandRankDetailed[HandRankDetailed["FK_SIXES_SEVEN"] = 468] = "FK_SIXES_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_SIXES_EIGHT"] = 469] = "FK_SIXES_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_SIXES_NINE"] = 470] = "FK_SIXES_NINE";
    HandRankDetailed[HandRankDetailed["FK_SIXES_TEN"] = 471] = "FK_SIXES_TEN";
    HandRankDetailed[HandRankDetailed["FK_SIXES_JACK"] = 472] = "FK_SIXES_JACK";
    HandRankDetailed[HandRankDetailed["FK_SIXES_QUEEN"] = 473] = "FK_SIXES_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_SIXES_KING"] = 474] = "FK_SIXES_KING";
    HandRankDetailed[HandRankDetailed["FK_SIXES_ACE"] = 475] = "FK_SIXES_ACE";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_TWO"] = 476] = "FK_SEVENS_TWO";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_THREE"] = 477] = "FK_SEVENS_THREE";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_FOUR"] = 478] = "FK_SEVENS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_FIVE"] = 479] = "FK_SEVENS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_SIX"] = 480] = "FK_SEVENS_SIX";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_EIGHT"] = 481] = "FK_SEVENS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_NINE"] = 482] = "FK_SEVENS_NINE";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_TEN"] = 483] = "FK_SEVENS_TEN";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_JACK"] = 484] = "FK_SEVENS_JACK";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_QUEEN"] = 485] = "FK_SEVENS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_KING"] = 486] = "FK_SEVENS_KING";
    HandRankDetailed[HandRankDetailed["FK_SEVENS_ACE"] = 487] = "FK_SEVENS_ACE";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_TWO"] = 488] = "FK_EIGHTS_TWO";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_THREE"] = 489] = "FK_EIGHTS_THREE";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_FOUR"] = 490] = "FK_EIGHTS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_FIVE"] = 491] = "FK_EIGHTS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_SIX"] = 492] = "FK_EIGHTS_SIX";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_SEVEN"] = 493] = "FK_EIGHTS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_NINE"] = 494] = "FK_EIGHTS_NINE";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_TEN"] = 495] = "FK_EIGHTS_TEN";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_JACK"] = 496] = "FK_EIGHTS_JACK";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_QUEEN"] = 497] = "FK_EIGHTS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_KING"] = 498] = "FK_EIGHTS_KING";
    HandRankDetailed[HandRankDetailed["FK_EIGHTS_ACE"] = 499] = "FK_EIGHTS_ACE";
    HandRankDetailed[HandRankDetailed["FK_NINES_TWO"] = 500] = "FK_NINES_TWO";
    HandRankDetailed[HandRankDetailed["FK_NINES_THREE"] = 501] = "FK_NINES_THREE";
    HandRankDetailed[HandRankDetailed["FK_NINES_FOUR"] = 502] = "FK_NINES_FOUR";
    HandRankDetailed[HandRankDetailed["FK_NINES_FIVE"] = 503] = "FK_NINES_FIVE";
    HandRankDetailed[HandRankDetailed["FK_NINES_SIX"] = 504] = "FK_NINES_SIX";
    HandRankDetailed[HandRankDetailed["FK_NINES_SEVEN"] = 505] = "FK_NINES_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_NINES_EIGHT"] = 506] = "FK_NINES_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_NINES_TEN"] = 507] = "FK_NINES_TEN";
    HandRankDetailed[HandRankDetailed["FK_NINES_JACK"] = 508] = "FK_NINES_JACK";
    HandRankDetailed[HandRankDetailed["FK_NINES_QUEEN"] = 509] = "FK_NINES_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_NINES_KING"] = 510] = "FK_NINES_KING";
    HandRankDetailed[HandRankDetailed["FK_NINES_ACE"] = 511] = "FK_NINES_ACE";
    HandRankDetailed[HandRankDetailed["FK_TENS_TWO"] = 512] = "FK_TENS_TWO";
    HandRankDetailed[HandRankDetailed["FK_TENS_THREE"] = 513] = "FK_TENS_THREE";
    HandRankDetailed[HandRankDetailed["FK_TENS_FOUR"] = 514] = "FK_TENS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_TENS_FIVE"] = 515] = "FK_TENS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_TENS_SIX"] = 516] = "FK_TENS_SIX";
    HandRankDetailed[HandRankDetailed["FK_TENS_SEVEN"] = 517] = "FK_TENS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_TENS_EIGHT"] = 518] = "FK_TENS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_TENS_NINE"] = 519] = "FK_TENS_NINE";
    HandRankDetailed[HandRankDetailed["FK_TENS_JACK"] = 520] = "FK_TENS_JACK";
    HandRankDetailed[HandRankDetailed["FK_TENS_QUEEN"] = 521] = "FK_TENS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_TENS_KING"] = 522] = "FK_TENS_KING";
    HandRankDetailed[HandRankDetailed["FK_TENS_ACE"] = 523] = "FK_TENS_ACE";
    HandRankDetailed[HandRankDetailed["FK_JACKS_TWO"] = 524] = "FK_JACKS_TWO";
    HandRankDetailed[HandRankDetailed["FK_JACKS_THREE"] = 525] = "FK_JACKS_THREE";
    HandRankDetailed[HandRankDetailed["FK_JACKS_FOUR"] = 526] = "FK_JACKS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_JACKS_FIVE"] = 527] = "FK_JACKS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_JACKS_SIX"] = 528] = "FK_JACKS_SIX";
    HandRankDetailed[HandRankDetailed["FK_JACKS_SEVEN"] = 529] = "FK_JACKS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_JACKS_EIGHT"] = 530] = "FK_JACKS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_JACKS_NINE"] = 531] = "FK_JACKS_NINE";
    HandRankDetailed[HandRankDetailed["FK_JACKS_TEN"] = 532] = "FK_JACKS_TEN";
    HandRankDetailed[HandRankDetailed["FK_JACKS_QUEEN"] = 533] = "FK_JACKS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_JACKS_KING"] = 534] = "FK_JACKS_KING";
    HandRankDetailed[HandRankDetailed["FK_JACKS_ACE"] = 535] = "FK_JACKS_ACE";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_TWO"] = 536] = "FK_QUEENS_TWO";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_THREE"] = 537] = "FK_QUEENS_THREE";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_FOUR"] = 538] = "FK_QUEENS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_FIVE"] = 539] = "FK_QUEENS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_SIX"] = 540] = "FK_QUEENS_SIX";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_SEVEN"] = 541] = "FK_QUEENS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_EIGHT"] = 542] = "FK_QUEENS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_NINE"] = 543] = "FK_QUEENS_NINE";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_TEN"] = 544] = "FK_QUEENS_TEN";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_JACK"] = 545] = "FK_QUEENS_JACK";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_KING"] = 546] = "FK_QUEENS_KING";
    HandRankDetailed[HandRankDetailed["FK_QUEENS_ACE"] = 547] = "FK_QUEENS_ACE";
    HandRankDetailed[HandRankDetailed["FK_KINGS_TWO"] = 548] = "FK_KINGS_TWO";
    HandRankDetailed[HandRankDetailed["FK_KINGS_THREE"] = 549] = "FK_KINGS_THREE";
    HandRankDetailed[HandRankDetailed["FK_KINGS_FOUR"] = 550] = "FK_KINGS_FOUR";
    HandRankDetailed[HandRankDetailed["FK_KINGS_FIVE"] = 551] = "FK_KINGS_FIVE";
    HandRankDetailed[HandRankDetailed["FK_KINGS_SIX"] = 552] = "FK_KINGS_SIX";
    HandRankDetailed[HandRankDetailed["FK_KINGS_SEVEN"] = 553] = "FK_KINGS_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_KINGS_EIGHT"] = 554] = "FK_KINGS_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_KINGS_NINE"] = 555] = "FK_KINGS_NINE";
    HandRankDetailed[HandRankDetailed["FK_KINGS_TEN"] = 556] = "FK_KINGS_TEN";
    HandRankDetailed[HandRankDetailed["FK_KINGS_JACK"] = 557] = "FK_KINGS_JACK";
    HandRankDetailed[HandRankDetailed["FK_KINGS_QUEEN"] = 558] = "FK_KINGS_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_KINGS_ACE"] = 559] = "FK_KINGS_ACE";
    HandRankDetailed[HandRankDetailed["FK_ACES_TWO"] = 560] = "FK_ACES_TWO";
    HandRankDetailed[HandRankDetailed["FK_ACES_THREE"] = 561] = "FK_ACES_THREE";
    HandRankDetailed[HandRankDetailed["FK_ACES_FOUR"] = 562] = "FK_ACES_FOUR";
    HandRankDetailed[HandRankDetailed["FK_ACES_FIVE"] = 563] = "FK_ACES_FIVE";
    HandRankDetailed[HandRankDetailed["FK_ACES_SIX"] = 564] = "FK_ACES_SIX";
    HandRankDetailed[HandRankDetailed["FK_ACES_SEVEN"] = 565] = "FK_ACES_SEVEN";
    HandRankDetailed[HandRankDetailed["FK_ACES_EIGHT"] = 566] = "FK_ACES_EIGHT";
    HandRankDetailed[HandRankDetailed["FK_ACES_NINE"] = 567] = "FK_ACES_NINE";
    HandRankDetailed[HandRankDetailed["FK_ACES_TEN"] = 568] = "FK_ACES_TEN";
    HandRankDetailed[HandRankDetailed["FK_ACES_JACK"] = 569] = "FK_ACES_JACK";
    HandRankDetailed[HandRankDetailed["FK_ACES_QUEEN"] = 570] = "FK_ACES_QUEEN";
    HandRankDetailed[HandRankDetailed["FK_ACES_KING"] = 571] = "FK_ACES_KING";
    HandRankDetailed[HandRankDetailed["SF_FIVE"] = 572] = "SF_FIVE";
    HandRankDetailed[HandRankDetailed["SF_SIX"] = 573] = "SF_SIX";
    HandRankDetailed[HandRankDetailed["SF_SEVEN"] = 574] = "SF_SEVEN";
    HandRankDetailed[HandRankDetailed["SF_EIGHT"] = 575] = "SF_EIGHT";
    HandRankDetailed[HandRankDetailed["SF_NINE"] = 576] = "SF_NINE";
    HandRankDetailed[HandRankDetailed["SF_TEN"] = 577] = "SF_TEN";
    HandRankDetailed[HandRankDetailed["SF_JACK"] = 578] = "SF_JACK";
    HandRankDetailed[HandRankDetailed["SF_QUEEN"] = 579] = "SF_QUEEN";
    HandRankDetailed[HandRankDetailed["SF_KING"] = 580] = "SF_KING";
    HandRankDetailed[HandRankDetailed["SF_ROYAL"] = 581] = "SF_ROYAL";
})(HandRankDetailed = exports.HandRankDetailed || (exports.HandRankDetailed = {}));
;
/**
* Classifier for converting a ranked value into a HandRank enum.
*/
function handRank(val) {
    if (val > 6185)
        return HandRank.HIGH_CARD; // 1277 high card
    if (val > 3325)
        return HandRank.ONE_PAIR; // 2860 one pair
    if (val > 2467)
        return HandRank.TWO_PAIR; //  858 two pair
    if (val > 1609)
        return HandRank.THREE_OF_A_KIND; //  858 three-kind
    if (val > 1599)
        return HandRank.STRAIGHT; //   10 straights
    if (val > 322)
        return HandRank.FLUSH; // 1277 flushes
    if (val > 166)
        return HandRank.FULL_HOUSE; //  156 full house
    if (val > 10)
        return HandRank.FOUR_OF_A_KIND; //  156 four-kind
    if (val > 1)
        return HandRank.STRAIGHT_FLUSH; //   10 straight-flushes
    return HandRank.ROYAL_FLUSH; //    1 royal flush
}
exports.handRank = handRank;
;
/**
* Classifier for converting a ranked value into a HandRankDetailed enum.
*/
function handRankDetailed(val) {
    // high-cards
    if (val >= 7459)
        return HandRankDetailed.HC_SEVEN;
    if (val >= 7445)
        return HandRankDetailed.HC_EIGHT;
    if (val >= 7411)
        return HandRankDetailed.HC_NINE;
    if (val >= 7342)
        return HandRankDetailed.HC_TEN;
    if (val >= 7217)
        return HandRankDetailed.HC_JACK;
    if (val >= 7008)
        return HandRankDetailed.HC_QUEEN;
    if (val >= 6679)
        return HandRankDetailed.HC_KING;
    if (val >= 6186)
        return HandRankDetailed.HC_ACE;
    // pairs
    if (val >= 5966)
        return HandRankDetailed.PR_TWOS;
    if (val >= 5746)
        return HandRankDetailed.PR_THREES;
    if (val >= 5526)
        return HandRankDetailed.PR_FOURS;
    if (val >= 5306)
        return HandRankDetailed.PR_FIVES;
    if (val >= 5086)
        return HandRankDetailed.PR_SIXES;
    if (val >= 4866)
        return HandRankDetailed.PR_SEVENS;
    if (val >= 4646)
        return HandRankDetailed.PR_EIGHTS;
    if (val >= 4426)
        return HandRankDetailed.PR_NINES;
    if (val >= 4206)
        return HandRankDetailed.PR_TENS;
    if (val >= 3986)
        return HandRankDetailed.PR_JACKS;
    if (val >= 3766)
        return HandRankDetailed.PR_QUEENS;
    if (val >= 3546)
        return HandRankDetailed.PR_KINGS;
    if (val >= 3326)
        return HandRankDetailed.PR_ACES;
    // two pairs
    if (val >= 3315)
        return HandRankDetailed.TP_THREES_TWOS;
    if (val >= 3304)
        return HandRankDetailed.TP_FOURS_TWOS;
    if (val >= 3293)
        return HandRankDetailed.TP_FOURS_THREES;
    if (val >= 3282)
        return HandRankDetailed.TP_FIVES_TWOS;
    if (val >= 3271)
        return HandRankDetailed.TP_FIVES_THREES;
    if (val >= 3260)
        return HandRankDetailed.TP_FIVES_FOURS;
    if (val >= 3249)
        return HandRankDetailed.TP_SIXES_TWOS;
    if (val >= 3238)
        return HandRankDetailed.TP_SIXES_THREES;
    if (val >= 3227)
        return HandRankDetailed.TP_SIXES_FOURS;
    if (val >= 3216)
        return HandRankDetailed.TP_SIXES_FIVES;
    if (val >= 3205)
        return HandRankDetailed.TP_SEVENS_TWOS;
    if (val >= 3194)
        return HandRankDetailed.TP_SEVENS_THREES;
    if (val >= 3183)
        return HandRankDetailed.TP_SEVENS_FOURS;
    if (val >= 3172)
        return HandRankDetailed.TP_SEVENS_FIVES;
    if (val >= 3161)
        return HandRankDetailed.TP_SEVENS_SIXES;
    if (val >= 3150)
        return HandRankDetailed.TP_EIGHTS_TWOS;
    if (val >= 3139)
        return HandRankDetailed.TP_EIGHTS_THREES;
    if (val >= 3128)
        return HandRankDetailed.TP_EIGHTS_FOURS;
    if (val >= 3117)
        return HandRankDetailed.TP_EIGHTS_FIVES;
    if (val >= 3106)
        return HandRankDetailed.TP_EIGHTS_SIXES;
    if (val >= 3095)
        return HandRankDetailed.TP_EIGHTS_SEVENS;
    if (val >= 3084)
        return HandRankDetailed.TP_NINES_TWOS;
    if (val >= 3073)
        return HandRankDetailed.TP_NINES_THREES;
    if (val >= 3062)
        return HandRankDetailed.TP_NINES_FOURS;
    if (val >= 3051)
        return HandRankDetailed.TP_NINES_FIVES;
    if (val >= 3040)
        return HandRankDetailed.TP_NINES_SIXES;
    if (val >= 3029)
        return HandRankDetailed.TP_NINES_SEVENS;
    if (val >= 3018)
        return HandRankDetailed.TP_NINES_EIGHTS;
    if (val >= 3007)
        return HandRankDetailed.TP_TENS_TWOS;
    if (val >= 2996)
        return HandRankDetailed.TP_TENS_THREES;
    if (val >= 2985)
        return HandRankDetailed.TP_TENS_FOURS;
    if (val >= 2974)
        return HandRankDetailed.TP_TENS_FIVES;
    if (val >= 2963)
        return HandRankDetailed.TP_TENS_SIXES;
    if (val >= 2952)
        return HandRankDetailed.TP_TENS_SEVENS;
    if (val >= 2941)
        return HandRankDetailed.TP_TENS_EIGHTS;
    if (val >= 2930)
        return HandRankDetailed.TP_TENS_NINES;
    if (val >= 2919)
        return HandRankDetailed.TP_JACKS_TWOS;
    if (val >= 2908)
        return HandRankDetailed.TP_JACKS_THREES;
    if (val >= 2897)
        return HandRankDetailed.TP_JACKS_FOURS;
    if (val >= 2886)
        return HandRankDetailed.TP_JACKS_FIVES;
    if (val >= 2875)
        return HandRankDetailed.TP_JACKS_SIXES;
    if (val >= 2864)
        return HandRankDetailed.TP_JACKS_SEVENS;
    if (val >= 2853)
        return HandRankDetailed.TP_JACKS_EIGHTS;
    if (val >= 2842)
        return HandRankDetailed.TP_JACKS_NINES;
    if (val >= 2831)
        return HandRankDetailed.TP_JACKS_TENS;
    if (val >= 2820)
        return HandRankDetailed.TP_QUEENS_TWOS;
    if (val >= 2809)
        return HandRankDetailed.TP_QUEENS_THREES;
    if (val >= 2798)
        return HandRankDetailed.TP_QUEENS_FOURS;
    if (val >= 2787)
        return HandRankDetailed.TP_QUEENS_FIVES;
    if (val >= 2776)
        return HandRankDetailed.TP_QUEENS_SIXES;
    if (val >= 2765)
        return HandRankDetailed.TP_QUEENS_SEVENS;
    if (val >= 2754)
        return HandRankDetailed.TP_QUEENS_EIGHTS;
    if (val >= 2743)
        return HandRankDetailed.TP_QUEENS_NINES;
    if (val >= 2732)
        return HandRankDetailed.TP_QUEENS_TENS;
    if (val >= 2721)
        return HandRankDetailed.TP_QUEENS_JACKS;
    if (val >= 2710)
        return HandRankDetailed.TP_KINGS_TWOS;
    if (val >= 2699)
        return HandRankDetailed.TP_KINGS_THREES;
    if (val >= 2688)
        return HandRankDetailed.TP_KINGS_FOURS;
    if (val >= 2677)
        return HandRankDetailed.TP_KINGS_FIVES;
    if (val >= 2666)
        return HandRankDetailed.TP_KINGS_SIXES;
    if (val >= 2655)
        return HandRankDetailed.TP_KINGS_SEVENS;
    if (val >= 2644)
        return HandRankDetailed.TP_KINGS_EIGHTS;
    if (val >= 2633)
        return HandRankDetailed.TP_KINGS_NINES;
    if (val >= 2622)
        return HandRankDetailed.TP_KINGS_TENS;
    if (val >= 2611)
        return HandRankDetailed.TP_KINGS_JACKS;
    if (val >= 2600)
        return HandRankDetailed.TP_KINGS_QUEENS;
    if (val >= 2589)
        return HandRankDetailed.TP_ACES_TWOS;
    if (val >= 2578)
        return HandRankDetailed.TP_ACES_THREES;
    if (val >= 2567)
        return HandRankDetailed.TP_ACES_FOURS;
    if (val >= 2556)
        return HandRankDetailed.TP_ACES_FIVES;
    if (val >= 2545)
        return HandRankDetailed.TP_ACES_SIXES;
    if (val >= 2534)
        return HandRankDetailed.TP_ACES_SEVENS;
    if (val >= 2523)
        return HandRankDetailed.TP_ACES_EIGHTS;
    if (val >= 2512)
        return HandRankDetailed.TP_ACES_NINES;
    if (val >= 2501)
        return HandRankDetailed.TP_ACES_TENS;
    if (val >= 2490)
        return HandRankDetailed.TP_ACES_JACKS;
    if (val >= 2479)
        return HandRankDetailed.TP_ACES_QUEENS;
    if (val >= 2468)
        return HandRankDetailed.TP_ACES_KINGS;
    // three of a kinds
    if (val === 2467)
        return HandRankDetailed.TK_TWOS_FOUR;
    if (val >= 2465)
        return HandRankDetailed.TK_TWOS_FIVE;
    if (val >= 2462)
        return HandRankDetailed.TK_TWOS_SIX;
    if (val >= 2458)
        return HandRankDetailed.TK_TWOS_SEVEN;
    if (val >= 2453)
        return HandRankDetailed.TK_TWOS_EIGHT;
    if (val >= 2447)
        return HandRankDetailed.TK_TWOS_NINE;
    if (val >= 2440)
        return HandRankDetailed.TK_TWOS_TEN;
    if (val >= 2432)
        return HandRankDetailed.TK_TWOS_JACK;
    if (val >= 2423)
        return HandRankDetailed.TK_TWOS_QUEEN;
    if (val >= 2413)
        return HandRankDetailed.TK_TWOS_KING;
    if (val >= 2402)
        return HandRankDetailed.TK_TWOS_ACE;
    if (val === 2401)
        return HandRankDetailed.TK_THREES_FOUR;
    if (val >= 2399)
        return HandRankDetailed.TK_THREES_FIVE;
    if (val >= 2396)
        return HandRankDetailed.TK_THREES_SIX;
    if (val >= 2392)
        return HandRankDetailed.TK_THREES_SEVEN;
    if (val >= 2387)
        return HandRankDetailed.TK_THREES_EIGHT;
    if (val >= 2381)
        return HandRankDetailed.TK_THREES_NINE;
    if (val >= 2374)
        return HandRankDetailed.TK_THREES_TEN;
    if (val >= 2366)
        return HandRankDetailed.TK_THREES_JACK;
    if (val >= 2357)
        return HandRankDetailed.TK_THREES_QUEEN;
    if (val >= 2347)
        return HandRankDetailed.TK_THREES_KING;
    if (val >= 2336)
        return HandRankDetailed.TK_THREES_ACE;
    if (val === 2335)
        return HandRankDetailed.TK_FOURS_THREE;
    if (val >= 2333)
        return HandRankDetailed.TK_FOURS_FIVE;
    if (val >= 2330)
        return HandRankDetailed.TK_FOURS_SIX;
    if (val >= 2326)
        return HandRankDetailed.TK_FOURS_SEVEN;
    if (val >= 2321)
        return HandRankDetailed.TK_FOURS_EIGHT;
    if (val >= 2315)
        return HandRankDetailed.TK_FOURS_NINE;
    if (val >= 2308)
        return HandRankDetailed.TK_FOURS_TEN;
    if (val >= 2300)
        return HandRankDetailed.TK_FOURS_JACK;
    if (val >= 2291)
        return HandRankDetailed.TK_FOURS_QUEEN;
    if (val >= 2281)
        return HandRankDetailed.TK_FOURS_KING;
    if (val >= 2270)
        return HandRankDetailed.TK_FOURS_ACE;
    if (val === 2269)
        return HandRankDetailed.TK_FIVES_THREE;
    if (val >= 2267)
        return HandRankDetailed.TK_FIVES_FOUR;
    if (val >= 2264)
        return HandRankDetailed.TK_FIVES_SIX;
    if (val >= 2260)
        return HandRankDetailed.TK_FIVES_SEVEN;
    if (val >= 2255)
        return HandRankDetailed.TK_FIVES_EIGHT;
    if (val >= 2249)
        return HandRankDetailed.TK_FIVES_NINE;
    if (val >= 2242)
        return HandRankDetailed.TK_FIVES_TEN;
    if (val >= 2234)
        return HandRankDetailed.TK_FIVES_JACK;
    if (val >= 2225)
        return HandRankDetailed.TK_FIVES_QUEEN;
    if (val >= 2215)
        return HandRankDetailed.TK_FIVES_KING;
    if (val >= 2204)
        return HandRankDetailed.TK_FIVES_ACE;
    if (val === 2203)
        return HandRankDetailed.TK_SIXES_THREE;
    if (val >= 2201)
        return HandRankDetailed.TK_SIXES_FOUR;
    if (val >= 2198)
        return HandRankDetailed.TK_SIXES_FIVE;
    if (val >= 2194)
        return HandRankDetailed.TK_SIXES_SEVEN;
    if (val >= 2189)
        return HandRankDetailed.TK_SIXES_EIGHT;
    if (val >= 2183)
        return HandRankDetailed.TK_SIXES_NINE;
    if (val >= 2176)
        return HandRankDetailed.TK_SIXES_TEN;
    if (val >= 2168)
        return HandRankDetailed.TK_SIXES_JACK;
    if (val >= 2159)
        return HandRankDetailed.TK_SIXES_QUEEN;
    if (val >= 2149)
        return HandRankDetailed.TK_SIXES_KING;
    if (val >= 2138)
        return HandRankDetailed.TK_SIXES_ACE;
    if (val === 2137)
        return HandRankDetailed.TK_SEVENS_THREE;
    if (val >= 2135)
        return HandRankDetailed.TK_SEVENS_FOUR;
    if (val >= 2132)
        return HandRankDetailed.TK_SEVENS_FIVE;
    if (val >= 2128)
        return HandRankDetailed.TK_SEVENS_SIX;
    if (val >= 2123)
        return HandRankDetailed.TK_SEVENS_EIGHT;
    if (val >= 2117)
        return HandRankDetailed.TK_SEVENS_NINE;
    if (val >= 2110)
        return HandRankDetailed.TK_SEVENS_TEN;
    if (val >= 2102)
        return HandRankDetailed.TK_SEVENS_JACK;
    if (val >= 2093)
        return HandRankDetailed.TK_SEVENS_QUEEN;
    if (val >= 2083)
        return HandRankDetailed.TK_SEVENS_KING;
    if (val >= 2072)
        return HandRankDetailed.TK_SEVENS_ACE;
    if (val === 2071)
        return HandRankDetailed.TK_EIGHTS_THREE;
    if (val >= 2069)
        return HandRankDetailed.TK_EIGHTS_FOUR;
    if (val >= 2066)
        return HandRankDetailed.TK_EIGHTS_FIVE;
    if (val >= 2062)
        return HandRankDetailed.TK_EIGHTS_SIX;
    if (val >= 2057)
        return HandRankDetailed.TK_EIGHTS_SEVEN;
    if (val >= 2051)
        return HandRankDetailed.TK_EIGHTS_NINE;
    if (val >= 2044)
        return HandRankDetailed.TK_EIGHTS_TEN;
    if (val >= 2037)
        return HandRankDetailed.TK_EIGHTS_JACK;
    if (val >= 2027)
        return HandRankDetailed.TK_EIGHTS_QUEEN;
    if (val >= 2018)
        return HandRankDetailed.TK_EIGHTS_KING;
    if (val >= 2006)
        return HandRankDetailed.TK_EIGHTS_ACE;
    if (val === 2005)
        return HandRankDetailed.TK_NINES_THREE;
    if (val >= 2003)
        return HandRankDetailed.TK_NINES_FOUR;
    if (val >= 2000)
        return HandRankDetailed.TK_NINES_FIVE;
    if (val >= 1996)
        return HandRankDetailed.TK_NINES_SIX;
    if (val >= 1991)
        return HandRankDetailed.TK_NINES_SEVEN;
    if (val >= 1985)
        return HandRankDetailed.TK_NINES_EIGHT;
    if (val >= 1978)
        return HandRankDetailed.TK_NINES_TEN;
    if (val >= 1970)
        return HandRankDetailed.TK_NINES_JACK;
    if (val >= 1961)
        return HandRankDetailed.TK_NINES_QUEEN;
    if (val >= 1951)
        return HandRankDetailed.TK_NINES_KING;
    if (val >= 1940)
        return HandRankDetailed.TK_NINES_ACE;
    if (val === 1939)
        return HandRankDetailed.TK_TENS_THREE;
    if (val >= 1937)
        return HandRankDetailed.TK_TENS_FOUR;
    if (val >= 1934)
        return HandRankDetailed.TK_TENS_FIVE;
    if (val >= 1930)
        return HandRankDetailed.TK_TENS_SIX;
    if (val >= 1925)
        return HandRankDetailed.TK_TENS_SEVEN;
    if (val >= 1919)
        return HandRankDetailed.TK_TENS_EIGHT;
    if (val >= 1912)
        return HandRankDetailed.TK_TENS_NINE;
    if (val >= 1904)
        return HandRankDetailed.TK_TENS_JACK;
    if (val >= 1895)
        return HandRankDetailed.TK_TENS_QUEEN;
    if (val >= 1885)
        return HandRankDetailed.TK_TENS_KING;
    if (val >= 1874)
        return HandRankDetailed.TK_TENS_ACE;
    if (val === 1873)
        return HandRankDetailed.TK_JACKS_THREE;
    if (val >= 1871)
        return HandRankDetailed.TK_JACKS_FOUR;
    if (val >= 1868)
        return HandRankDetailed.TK_JACKS_FIVE;
    if (val >= 1864)
        return HandRankDetailed.TK_JACKS_SIX;
    if (val >= 1859)
        return HandRankDetailed.TK_JACKS_SEVEN;
    if (val >= 1853)
        return HandRankDetailed.TK_JACKS_EIGHT;
    if (val >= 1846)
        return HandRankDetailed.TK_JACKS_NINE;
    if (val >= 1838)
        return HandRankDetailed.TK_JACKS_TEN;
    if (val >= 1829)
        return HandRankDetailed.TK_JACKS_QUEEN;
    if (val >= 1819)
        return HandRankDetailed.TK_JACKS_KING;
    if (val >= 1808)
        return HandRankDetailed.TK_JACKS_ACE;
    if (val === 1807)
        return HandRankDetailed.TK_QUEENS_THREE;
    if (val >= 1805)
        return HandRankDetailed.TK_QUEENS_FOUR;
    if (val >= 1802)
        return HandRankDetailed.TK_QUEENS_FIVE;
    if (val >= 1798)
        return HandRankDetailed.TK_QUEENS_SIX;
    if (val >= 1793)
        return HandRankDetailed.TK_QUEENS_SEVEN;
    if (val >= 1787)
        return HandRankDetailed.TK_QUEENS_EIGHT;
    if (val >= 1780)
        return HandRankDetailed.TK_QUEENS_NINE;
    if (val >= 1772)
        return HandRankDetailed.TK_QUEENS_TEN;
    if (val >= 1763)
        return HandRankDetailed.TK_QUEENS_JACK;
    if (val >= 1753)
        return HandRankDetailed.TK_QUEENS_KING;
    if (val >= 1742)
        return HandRankDetailed.TK_QUEENS_ACE;
    if (val === 1741)
        return HandRankDetailed.TK_KINGS_THREE;
    if (val >= 1739)
        return HandRankDetailed.TK_KINGS_FOUR;
    if (val >= 1736)
        return HandRankDetailed.TK_KINGS_FIVE;
    if (val >= 1732)
        return HandRankDetailed.TK_KINGS_SIX;
    if (val >= 1727)
        return HandRankDetailed.TK_KINGS_SEVEN;
    if (val >= 1721)
        return HandRankDetailed.TK_KINGS_EIGHT;
    if (val >= 1714)
        return HandRankDetailed.TK_KINGS_NINE;
    if (val >= 1706)
        return HandRankDetailed.TK_KINGS_TEN;
    if (val >= 1697)
        return HandRankDetailed.TK_KINGS_JACK;
    if (val >= 1687)
        return HandRankDetailed.TK_KINGS_QUEEN;
    if (val >= 1676)
        return HandRankDetailed.TK_KINGS_ACE;
    if (val === 1675)
        return HandRankDetailed.TK_ACES_THREE;
    if (val >= 1673)
        return HandRankDetailed.TK_ACES_FOUR;
    if (val >= 1670)
        return HandRankDetailed.TK_ACES_FIVE;
    if (val >= 1666)
        return HandRankDetailed.TK_ACES_SIX;
    if (val >= 1661)
        return HandRankDetailed.TK_ACES_SEVEN;
    if (val >= 1655)
        return HandRankDetailed.TK_ACES_EIGHT;
    if (val >= 1648)
        return HandRankDetailed.TK_ACES_NINE;
    if (val >= 1640)
        return HandRankDetailed.TK_ACES_TEN;
    if (val >= 1631)
        return HandRankDetailed.TK_ACES_JACK;
    if (val >= 1621)
        return HandRankDetailed.TK_ACES_QUEEN;
    if (val >= 1610)
        return HandRankDetailed.TK_ACES_KING;
    // straights
    if (val === 1609)
        return HandRankDetailed.ST_FIVE;
    if (val === 1608)
        return HandRankDetailed.ST_SIX;
    if (val === 1607)
        return HandRankDetailed.ST_SEVEN;
    if (val === 1606)
        return HandRankDetailed.ST_EIGHT;
    if (val === 1605)
        return HandRankDetailed.ST_NINE;
    if (val === 1604)
        return HandRankDetailed.ST_TEN;
    if (val === 1603)
        return HandRankDetailed.ST_JACK;
    if (val === 1602)
        return HandRankDetailed.ST_QUEEN;
    if (val === 1601)
        return HandRankDetailed.ST_KING;
    if (val === 1600)
        return HandRankDetailed.ST_ACE;
    // flushes
    if (val >= 1596)
        return HandRankDetailed.FL_SEVEN;
    if (val >= 1582)
        return HandRankDetailed.FL_EIGHT;
    if (val >= 1548)
        return HandRankDetailed.FL_NINE;
    if (val >= 1479)
        return HandRankDetailed.FL_TEN;
    if (val >= 1354)
        return HandRankDetailed.FL_JACK;
    if (val >= 1145)
        return HandRankDetailed.FL_QUEEN;
    if (val >= 816)
        return HandRankDetailed.FL_KING;
    if (val >= 323)
        return HandRankDetailed.FL_ACE;
    // full houses
    if (val === 322)
        return HandRankDetailed.FH_TWOS_THREES;
    if (val === 321)
        return HandRankDetailed.FH_TWOS_FOURS;
    if (val === 320)
        return HandRankDetailed.FH_TWOS_FIVES;
    if (val === 319)
        return HandRankDetailed.FH_TWOS_SIXES;
    if (val === 318)
        return HandRankDetailed.FH_TWOS_SEVENS;
    if (val === 317)
        return HandRankDetailed.FH_TWOS_EIGHTS;
    if (val === 316)
        return HandRankDetailed.FH_TWOS_NINES;
    if (val === 315)
        return HandRankDetailed.FH_TWOS_TENS;
    if (val === 314)
        return HandRankDetailed.FH_TWOS_JACKS;
    if (val === 313)
        return HandRankDetailed.FH_TWOS_QUEENS;
    if (val === 312)
        return HandRankDetailed.FH_TWOS_KINGS;
    if (val === 311)
        return HandRankDetailed.FH_TWOS_ACES;
    if (val === 310)
        return HandRankDetailed.FH_THREES_TWOS;
    if (val === 309)
        return HandRankDetailed.FH_THREES_FOURS;
    if (val === 308)
        return HandRankDetailed.FH_THREES_FIVES;
    if (val === 307)
        return HandRankDetailed.FH_THREES_SIXES;
    if (val === 306)
        return HandRankDetailed.FH_THREES_SEVENS;
    if (val === 305)
        return HandRankDetailed.FH_THREES_EIGHTS;
    if (val === 304)
        return HandRankDetailed.FH_THREES_NINES;
    if (val === 303)
        return HandRankDetailed.FH_THREES_TENS;
    if (val === 302)
        return HandRankDetailed.FH_THREES_JACKS;
    if (val === 301)
        return HandRankDetailed.FH_THREES_QUEENS;
    if (val === 300)
        return HandRankDetailed.FH_THREES_KINGS;
    if (val === 299)
        return HandRankDetailed.FH_THREES_ACES;
    if (val === 298)
        return HandRankDetailed.FH_FOURS_TWOS;
    if (val === 297)
        return HandRankDetailed.FH_FOURS_THREES;
    if (val === 296)
        return HandRankDetailed.FH_FOURS_FIVES;
    if (val === 295)
        return HandRankDetailed.FH_FOURS_SIXES;
    if (val === 294)
        return HandRankDetailed.FH_FOURS_SEVENS;
    if (val === 293)
        return HandRankDetailed.FH_FOURS_EIGHTS;
    if (val === 292)
        return HandRankDetailed.FH_FOURS_NINES;
    if (val === 291)
        return HandRankDetailed.FH_FOURS_TENS;
    if (val === 290)
        return HandRankDetailed.FH_FOURS_JACKS;
    if (val === 289)
        return HandRankDetailed.FH_FOURS_QUEENS;
    if (val === 288)
        return HandRankDetailed.FH_FOURS_KINGS;
    if (val === 287)
        return HandRankDetailed.FH_FOURS_ACES;
    if (val === 286)
        return HandRankDetailed.FH_FIVES_TWOS;
    if (val === 285)
        return HandRankDetailed.FH_FIVES_THREES;
    if (val === 284)
        return HandRankDetailed.FH_FIVES_FOURS;
    if (val === 283)
        return HandRankDetailed.FH_FIVES_SIXES;
    if (val === 282)
        return HandRankDetailed.FH_FIVES_SEVENS;
    if (val === 281)
        return HandRankDetailed.FH_FIVES_EIGHTS;
    if (val === 280)
        return HandRankDetailed.FH_FIVES_NINES;
    if (val === 279)
        return HandRankDetailed.FH_FIVES_TENS;
    if (val === 278)
        return HandRankDetailed.FH_FIVES_JACKS;
    if (val === 277)
        return HandRankDetailed.FH_FIVES_QUEENS;
    if (val === 276)
        return HandRankDetailed.FH_FIVES_KINGS;
    if (val === 275)
        return HandRankDetailed.FH_FIVES_ACES;
    if (val === 274)
        return HandRankDetailed.FH_SIXES_TWOS;
    if (val === 273)
        return HandRankDetailed.FH_SIXES_THREES;
    if (val === 272)
        return HandRankDetailed.FH_SIXES_FOURS;
    if (val === 271)
        return HandRankDetailed.FH_SIXES_FIVES;
    if (val === 270)
        return HandRankDetailed.FH_SIXES_SEVENS;
    if (val === 269)
        return HandRankDetailed.FH_SIXES_EIGHTS;
    if (val === 268)
        return HandRankDetailed.FH_SIXES_NINES;
    if (val === 267)
        return HandRankDetailed.FH_SIXES_TENS;
    if (val === 266)
        return HandRankDetailed.FH_SIXES_JACKS;
    if (val === 265)
        return HandRankDetailed.FH_SIXES_QUEENS;
    if (val === 264)
        return HandRankDetailed.FH_SIXES_KINGS;
    if (val === 263)
        return HandRankDetailed.FH_SIXES_ACES;
    if (val === 262)
        return HandRankDetailed.FH_SEVENS_TWOS;
    if (val === 261)
        return HandRankDetailed.FH_SEVENS_THREES;
    if (val === 260)
        return HandRankDetailed.FH_SEVENS_FOURS;
    if (val === 259)
        return HandRankDetailed.FH_SEVENS_FIVES;
    if (val === 258)
        return HandRankDetailed.FH_SEVENS_SIXES;
    if (val === 257)
        return HandRankDetailed.FH_SEVENS_EIGHTS;
    if (val === 256)
        return HandRankDetailed.FH_SEVENS_NINES;
    if (val === 255)
        return HandRankDetailed.FH_SEVENS_TENS;
    if (val === 254)
        return HandRankDetailed.FH_SEVENS_JACKS;
    if (val === 253)
        return HandRankDetailed.FH_SEVENS_QUEENS;
    if (val === 252)
        return HandRankDetailed.FH_SEVENS_KINGS;
    if (val === 251)
        return HandRankDetailed.FH_SEVENS_ACES;
    if (val === 250)
        return HandRankDetailed.FH_EIGHTS_TWOS;
    if (val === 249)
        return HandRankDetailed.FH_EIGHTS_THREES;
    if (val === 248)
        return HandRankDetailed.FH_EIGHTS_FOURS;
    if (val === 247)
        return HandRankDetailed.FH_EIGHTS_FIVES;
    if (val === 246)
        return HandRankDetailed.FH_EIGHTS_SIXES;
    if (val === 245)
        return HandRankDetailed.FH_EIGHTS_SEVENS;
    if (val === 244)
        return HandRankDetailed.FH_EIGHTS_NINES;
    if (val === 243)
        return HandRankDetailed.FH_EIGHTS_TENS;
    if (val === 242)
        return HandRankDetailed.FH_EIGHTS_JACKS;
    if (val === 241)
        return HandRankDetailed.FH_EIGHTS_QUEENS;
    if (val === 240)
        return HandRankDetailed.FH_EIGHTS_KINGS;
    if (val === 239)
        return HandRankDetailed.FH_EIGHTS_ACES;
    if (val === 238)
        return HandRankDetailed.FH_NINES_TWOS;
    if (val === 237)
        return HandRankDetailed.FH_NINES_THREES;
    if (val === 236)
        return HandRankDetailed.FH_NINES_FOURS;
    if (val === 235)
        return HandRankDetailed.FH_NINES_FIVES;
    if (val === 234)
        return HandRankDetailed.FH_NINES_SIXES;
    if (val === 233)
        return HandRankDetailed.FH_NINES_SEVENS;
    if (val === 232)
        return HandRankDetailed.FH_NINES_EIGHTS;
    if (val === 231)
        return HandRankDetailed.FH_NINES_TENS;
    if (val === 230)
        return HandRankDetailed.FH_NINES_JACKS;
    if (val === 229)
        return HandRankDetailed.FH_NINES_QUEENS;
    if (val === 228)
        return HandRankDetailed.FH_NINES_KINGS;
    if (val === 227)
        return HandRankDetailed.FH_NINES_ACES;
    if (val === 226)
        return HandRankDetailed.FH_TENS_TWOS;
    if (val === 225)
        return HandRankDetailed.FH_TENS_THREES;
    if (val === 224)
        return HandRankDetailed.FH_TENS_FOURS;
    if (val === 223)
        return HandRankDetailed.FH_TENS_FIVES;
    if (val === 222)
        return HandRankDetailed.FH_TENS_SIXES;
    if (val === 221)
        return HandRankDetailed.FH_TENS_SEVENS;
    if (val === 220)
        return HandRankDetailed.FH_TENS_EIGHTS;
    if (val === 219)
        return HandRankDetailed.FH_TENS_NINES;
    if (val === 218)
        return HandRankDetailed.FH_TENS_JACKS;
    if (val === 217)
        return HandRankDetailed.FH_TENS_QUEENS;
    if (val === 216)
        return HandRankDetailed.FH_TENS_KINGS;
    if (val === 215)
        return HandRankDetailed.FH_TENS_ACES;
    if (val === 214)
        return HandRankDetailed.FH_JACKS_TWOS;
    if (val === 213)
        return HandRankDetailed.FH_JACKS_THREES;
    if (val === 212)
        return HandRankDetailed.FH_JACKS_FOURS;
    if (val === 211)
        return HandRankDetailed.FH_JACKS_FIVES;
    if (val === 210)
        return HandRankDetailed.FH_JACKS_SIXES;
    if (val === 209)
        return HandRankDetailed.FH_JACKS_SEVENS;
    if (val === 208)
        return HandRankDetailed.FH_JACKS_EIGHTS;
    if (val === 207)
        return HandRankDetailed.FH_JACKS_NINES;
    if (val === 206)
        return HandRankDetailed.FH_JACKS_TENS;
    if (val === 205)
        return HandRankDetailed.FH_JACKS_QUEENS;
    if (val === 204)
        return HandRankDetailed.FH_JACKS_KINGS;
    if (val === 203)
        return HandRankDetailed.FH_JACKS_ACES;
    if (val === 202)
        return HandRankDetailed.FH_QUEENS_TWOS;
    if (val === 201)
        return HandRankDetailed.FH_QUEENS_THREES;
    if (val === 200)
        return HandRankDetailed.FH_QUEENS_FOURS;
    if (val === 199)
        return HandRankDetailed.FH_QUEENS_FIVES;
    if (val === 198)
        return HandRankDetailed.FH_QUEENS_SIXES;
    if (val === 197)
        return HandRankDetailed.FH_QUEENS_SEVENS;
    if (val === 196)
        return HandRankDetailed.FH_QUEENS_EIGHTS;
    if (val === 195)
        return HandRankDetailed.FH_QUEENS_NINES;
    if (val === 194)
        return HandRankDetailed.FH_QUEENS_TENS;
    if (val === 193)
        return HandRankDetailed.FH_QUEENS_JACKS;
    if (val === 192)
        return HandRankDetailed.FH_QUEENS_KINGS;
    if (val === 191)
        return HandRankDetailed.FH_QUEENS_ACES;
    if (val === 190)
        return HandRankDetailed.FH_KINGS_TWOS;
    if (val === 189)
        return HandRankDetailed.FH_KINGS_THREES;
    if (val === 188)
        return HandRankDetailed.FH_KINGS_FOURS;
    if (val === 187)
        return HandRankDetailed.FH_KINGS_FIVES;
    if (val === 186)
        return HandRankDetailed.FH_KINGS_SIXES;
    if (val === 185)
        return HandRankDetailed.FH_KINGS_SEVENS;
    if (val === 184)
        return HandRankDetailed.FH_KINGS_EIGHTS;
    if (val === 183)
        return HandRankDetailed.FH_KINGS_NINES;
    if (val === 182)
        return HandRankDetailed.FH_KINGS_TENS;
    if (val === 181)
        return HandRankDetailed.FH_KINGS_JACKS;
    if (val === 180)
        return HandRankDetailed.FH_KINGS_QUEENS;
    if (val === 179)
        return HandRankDetailed.FH_KINGS_ACES;
    if (val === 178)
        return HandRankDetailed.FH_ACES_TWOS;
    if (val === 177)
        return HandRankDetailed.FH_ACES_THREES;
    if (val === 176)
        return HandRankDetailed.FH_ACES_FOURS;
    if (val === 175)
        return HandRankDetailed.FH_ACES_FIVES;
    if (val === 174)
        return HandRankDetailed.FH_ACES_SIXES;
    if (val === 173)
        return HandRankDetailed.FH_ACES_SEVENS;
    if (val === 172)
        return HandRankDetailed.FH_ACES_EIGHTS;
    if (val === 171)
        return HandRankDetailed.FH_ACES_NINES;
    if (val === 170)
        return HandRankDetailed.FH_ACES_TENS;
    if (val === 169)
        return HandRankDetailed.FH_ACES_JACKS;
    if (val === 168)
        return HandRankDetailed.FH_ACES_QUEENS;
    if (val === 167)
        return HandRankDetailed.FH_ACES_KINGS;
    // four of a kinds
    if (val === 166)
        return HandRankDetailed.FK_TWOS_THREE;
    if (val === 165)
        return HandRankDetailed.FK_TWOS_FOUR;
    if (val === 164)
        return HandRankDetailed.FK_TWOS_FIVE;
    if (val === 163)
        return HandRankDetailed.FK_TWOS_SIX;
    if (val === 162)
        return HandRankDetailed.FK_TWOS_SEVEN;
    if (val === 161)
        return HandRankDetailed.FK_TWOS_EIGHT;
    if (val === 160)
        return HandRankDetailed.FK_TWOS_NINE;
    if (val === 159)
        return HandRankDetailed.FK_TWOS_TEN;
    if (val === 158)
        return HandRankDetailed.FK_TWOS_JACK;
    if (val === 157)
        return HandRankDetailed.FK_TWOS_QUEEN;
    if (val === 156)
        return HandRankDetailed.FK_TWOS_KING;
    if (val === 155)
        return HandRankDetailed.FK_TWOS_ACE;
    if (val === 154)
        return HandRankDetailed.FK_THREES_TWO;
    if (val === 153)
        return HandRankDetailed.FK_THREES_FOUR;
    if (val === 152)
        return HandRankDetailed.FK_THREES_FIVE;
    if (val === 151)
        return HandRankDetailed.FK_THREES_SIX;
    if (val === 150)
        return HandRankDetailed.FK_THREES_SEVEN;
    if (val === 149)
        return HandRankDetailed.FK_THREES_EIGHT;
    if (val === 148)
        return HandRankDetailed.FK_THREES_NINE;
    if (val === 147)
        return HandRankDetailed.FK_THREES_TEN;
    if (val === 146)
        return HandRankDetailed.FK_THREES_JACK;
    if (val === 145)
        return HandRankDetailed.FK_THREES_QUEEN;
    if (val === 144)
        return HandRankDetailed.FK_THREES_KING;
    if (val === 143)
        return HandRankDetailed.FK_THREES_ACE;
    if (val === 142)
        return HandRankDetailed.FK_FOURS_TWO;
    if (val === 141)
        return HandRankDetailed.FK_FOURS_THREE;
    if (val === 140)
        return HandRankDetailed.FK_FOURS_FIVE;
    if (val === 139)
        return HandRankDetailed.FK_FOURS_SIX;
    if (val === 138)
        return HandRankDetailed.FK_FOURS_SEVEN;
    if (val === 137)
        return HandRankDetailed.FK_FOURS_EIGHT;
    if (val === 136)
        return HandRankDetailed.FK_FOURS_NINE;
    if (val === 135)
        return HandRankDetailed.FK_FOURS_TEN;
    if (val === 134)
        return HandRankDetailed.FK_FOURS_JACK;
    if (val === 133)
        return HandRankDetailed.FK_FOURS_QUEEN;
    if (val === 132)
        return HandRankDetailed.FK_FOURS_KING;
    if (val === 131)
        return HandRankDetailed.FK_FOURS_ACE;
    if (val === 130)
        return HandRankDetailed.FK_FIVES_TWO;
    if (val === 129)
        return HandRankDetailed.FK_FIVES_THREE;
    if (val === 128)
        return HandRankDetailed.FK_FIVES_FOUR;
    if (val === 127)
        return HandRankDetailed.FK_FIVES_SIX;
    if (val === 126)
        return HandRankDetailed.FK_FIVES_SEVEN;
    if (val === 125)
        return HandRankDetailed.FK_FIVES_EIGHT;
    if (val === 124)
        return HandRankDetailed.FK_FIVES_NINE;
    if (val === 123)
        return HandRankDetailed.FK_FIVES_TEN;
    if (val === 122)
        return HandRankDetailed.FK_FIVES_JACK;
    if (val === 121)
        return HandRankDetailed.FK_FIVES_QUEEN;
    if (val === 120)
        return HandRankDetailed.FK_FIVES_KING;
    if (val === 119)
        return HandRankDetailed.FK_FIVES_ACE;
    if (val === 118)
        return HandRankDetailed.FK_SIXES_TWO;
    if (val === 117)
        return HandRankDetailed.FK_SIXES_THREE;
    if (val === 116)
        return HandRankDetailed.FK_SIXES_FOUR;
    if (val === 115)
        return HandRankDetailed.FK_SIXES_FIVE;
    if (val === 114)
        return HandRankDetailed.FK_SIXES_SEVEN;
    if (val === 113)
        return HandRankDetailed.FK_SIXES_EIGHT;
    if (val === 112)
        return HandRankDetailed.FK_SIXES_NINE;
    if (val === 111)
        return HandRankDetailed.FK_SIXES_TEN;
    if (val === 110)
        return HandRankDetailed.FK_SIXES_JACK;
    if (val === 109)
        return HandRankDetailed.FK_SIXES_QUEEN;
    if (val === 108)
        return HandRankDetailed.FK_SIXES_KING;
    if (val === 107)
        return HandRankDetailed.FK_SIXES_ACE;
    if (val === 106)
        return HandRankDetailed.FK_SEVENS_TWO;
    if (val === 105)
        return HandRankDetailed.FK_SEVENS_THREE;
    if (val === 104)
        return HandRankDetailed.FK_SEVENS_FOUR;
    if (val === 103)
        return HandRankDetailed.FK_SEVENS_FIVE;
    if (val === 102)
        return HandRankDetailed.FK_SEVENS_SIX;
    if (val === 101)
        return HandRankDetailed.FK_SEVENS_EIGHT;
    if (val === 100)
        return HandRankDetailed.FK_SEVENS_NINE;
    if (val === 99)
        return HandRankDetailed.FK_SEVENS_TEN;
    if (val === 98)
        return HandRankDetailed.FK_SEVENS_JACK;
    if (val === 97)
        return HandRankDetailed.FK_SEVENS_QUEEN;
    if (val === 96)
        return HandRankDetailed.FK_SEVENS_KING;
    if (val === 95)
        return HandRankDetailed.FK_SEVENS_ACE;
    if (val === 94)
        return HandRankDetailed.FK_EIGHTS_TWO;
    if (val === 93)
        return HandRankDetailed.FK_EIGHTS_THREE;
    if (val === 92)
        return HandRankDetailed.FK_EIGHTS_FOUR;
    if (val === 91)
        return HandRankDetailed.FK_EIGHTS_FIVE;
    if (val === 90)
        return HandRankDetailed.FK_EIGHTS_SIX;
    if (val === 89)
        return HandRankDetailed.FK_EIGHTS_SEVEN;
    if (val === 88)
        return HandRankDetailed.FK_EIGHTS_NINE;
    if (val === 87)
        return HandRankDetailed.FK_EIGHTS_TEN;
    if (val === 86)
        return HandRankDetailed.FK_EIGHTS_JACK;
    if (val === 85)
        return HandRankDetailed.FK_EIGHTS_QUEEN;
    if (val === 84)
        return HandRankDetailed.FK_EIGHTS_KING;
    if (val === 83)
        return HandRankDetailed.FK_EIGHTS_ACE;
    if (val === 82)
        return HandRankDetailed.FK_NINES_TWO;
    if (val === 81)
        return HandRankDetailed.FK_NINES_THREE;
    if (val === 80)
        return HandRankDetailed.FK_NINES_FOUR;
    if (val === 79)
        return HandRankDetailed.FK_NINES_FIVE;
    if (val === 78)
        return HandRankDetailed.FK_NINES_SIX;
    if (val === 77)
        return HandRankDetailed.FK_NINES_SEVEN;
    if (val === 76)
        return HandRankDetailed.FK_NINES_EIGHT;
    if (val === 75)
        return HandRankDetailed.FK_NINES_TEN;
    if (val === 74)
        return HandRankDetailed.FK_NINES_JACK;
    if (val === 73)
        return HandRankDetailed.FK_NINES_QUEEN;
    if (val === 72)
        return HandRankDetailed.FK_NINES_KING;
    if (val === 71)
        return HandRankDetailed.FK_NINES_ACE;
    if (val === 70)
        return HandRankDetailed.FK_TENS_TWO;
    if (val === 69)
        return HandRankDetailed.FK_TENS_THREE;
    if (val === 68)
        return HandRankDetailed.FK_TENS_FOUR;
    if (val === 67)
        return HandRankDetailed.FK_TENS_FIVE;
    if (val === 66)
        return HandRankDetailed.FK_TENS_SIX;
    if (val === 65)
        return HandRankDetailed.FK_TENS_SEVEN;
    if (val === 64)
        return HandRankDetailed.FK_TENS_EIGHT;
    if (val === 63)
        return HandRankDetailed.FK_TENS_NINE;
    if (val === 62)
        return HandRankDetailed.FK_TENS_JACK;
    if (val === 61)
        return HandRankDetailed.FK_TENS_QUEEN;
    if (val === 60)
        return HandRankDetailed.FK_TENS_KING;
    if (val === 59)
        return HandRankDetailed.FK_TENS_ACE;
    if (val === 58)
        return HandRankDetailed.FK_JACKS_TWO;
    if (val === 57)
        return HandRankDetailed.FK_JACKS_THREE;
    if (val === 56)
        return HandRankDetailed.FK_JACKS_FOUR;
    if (val === 55)
        return HandRankDetailed.FK_JACKS_FIVE;
    if (val === 54)
        return HandRankDetailed.FK_JACKS_SIX;
    if (val === 53)
        return HandRankDetailed.FK_JACKS_SEVEN;
    if (val === 52)
        return HandRankDetailed.FK_JACKS_EIGHT;
    if (val === 51)
        return HandRankDetailed.FK_JACKS_NINE;
    if (val === 50)
        return HandRankDetailed.FK_JACKS_TEN;
    if (val === 49)
        return HandRankDetailed.FK_JACKS_QUEEN;
    if (val === 48)
        return HandRankDetailed.FK_JACKS_KING;
    if (val === 47)
        return HandRankDetailed.FK_JACKS_ACE;
    if (val === 46)
        return HandRankDetailed.FK_QUEENS_TWO;
    if (val === 45)
        return HandRankDetailed.FK_QUEENS_THREE;
    if (val === 44)
        return HandRankDetailed.FK_QUEENS_FOUR;
    if (val === 43)
        return HandRankDetailed.FK_QUEENS_FIVE;
    if (val === 42)
        return HandRankDetailed.FK_QUEENS_SIX;
    if (val === 41)
        return HandRankDetailed.FK_QUEENS_SEVEN;
    if (val === 40)
        return HandRankDetailed.FK_QUEENS_EIGHT;
    if (val === 39)
        return HandRankDetailed.FK_QUEENS_NINE;
    if (val === 38)
        return HandRankDetailed.FK_QUEENS_TEN;
    if (val === 37)
        return HandRankDetailed.FK_QUEENS_JACK;
    if (val === 36)
        return HandRankDetailed.FK_QUEENS_KING;
    if (val === 35)
        return HandRankDetailed.FK_QUEENS_ACE;
    if (val === 34)
        return HandRankDetailed.FK_KINGS_TWO;
    if (val === 33)
        return HandRankDetailed.FK_KINGS_THREE;
    if (val === 32)
        return HandRankDetailed.FK_KINGS_FOUR;
    if (val === 31)
        return HandRankDetailed.FK_KINGS_FIVE;
    if (val === 30)
        return HandRankDetailed.FK_KINGS_SIX;
    if (val === 29)
        return HandRankDetailed.FK_KINGS_SEVEN;
    if (val === 28)
        return HandRankDetailed.FK_KINGS_EIGHT;
    if (val === 27)
        return HandRankDetailed.FK_KINGS_NINE;
    if (val === 26)
        return HandRankDetailed.FK_KINGS_TEN;
    if (val === 25)
        return HandRankDetailed.FK_KINGS_JACK;
    if (val === 24)
        return HandRankDetailed.FK_KINGS_QUEEN;
    if (val === 23)
        return HandRankDetailed.FK_KINGS_ACE;
    if (val === 22)
        return HandRankDetailed.FK_ACES_TWO;
    if (val === 21)
        return HandRankDetailed.FK_ACES_THREE;
    if (val === 20)
        return HandRankDetailed.FK_ACES_FOUR;
    if (val === 19)
        return HandRankDetailed.FK_ACES_FIVE;
    if (val === 18)
        return HandRankDetailed.FK_ACES_SIX;
    if (val === 17)
        return HandRankDetailed.FK_ACES_SEVEN;
    if (val === 16)
        return HandRankDetailed.FK_ACES_EIGHT;
    if (val === 15)
        return HandRankDetailed.FK_ACES_NINE;
    if (val === 14)
        return HandRankDetailed.FK_ACES_TEN;
    if (val === 13)
        return HandRankDetailed.FK_ACES_JACK;
    if (val === 12)
        return HandRankDetailed.FK_ACES_QUEEN;
    if (val === 11)
        return HandRankDetailed.FK_ACES_KING;
    // straight flushes
    if (val === 10)
        return HandRankDetailed.SF_FIVE;
    if (val === 9)
        return HandRankDetailed.SF_SIX;
    if (val === 8)
        return HandRankDetailed.SF_SEVEN;
    if (val === 7)
        return HandRankDetailed.SF_EIGHT;
    if (val === 6)
        return HandRankDetailed.SF_NINE;
    if (val === 5)
        return HandRankDetailed.SF_TEN;
    if (val === 4)
        return HandRankDetailed.SF_JACK;
    if (val === 3)
        return HandRankDetailed.SF_QUEEN;
    if (val === 2)
        return HandRankDetailed.SF_KING;
    // royal flush
    return HandRankDetailed.SF_ROYAL;
}
exports.handRankDetailed = handRankDetailed;
;
//# sourceMappingURL=poker.js.map