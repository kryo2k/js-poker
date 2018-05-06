"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* Card suit unum for standard playing cards
*/
var Suit;
(function (Suit) {
    Suit[Suit["CLUB"] = 0] = "CLUB";
    Suit[Suit["DIAMOND"] = 1] = "DIAMOND";
    Suit[Suit["HEART"] = 2] = "HEART";
    Suit[Suit["SPADE"] = 3] = "SPADE";
})(Suit = exports.Suit || (exports.Suit = {}));
;
/**
* Card rank unum for standard playing cards (no jokers)
*/
var Rank;
(function (Rank) {
    Rank[Rank["TWO"] = 0] = "TWO";
    Rank[Rank["THREE"] = 1] = "THREE";
    Rank[Rank["FOUR"] = 2] = "FOUR";
    Rank[Rank["FIVE"] = 3] = "FIVE";
    Rank[Rank["SIX"] = 4] = "SIX";
    Rank[Rank["SEVEN"] = 5] = "SEVEN";
    Rank[Rank["EIGHT"] = 6] = "EIGHT";
    Rank[Rank["NINE"] = 7] = "NINE";
    Rank[Rank["TEN"] = 8] = "TEN";
    Rank[Rank["JACK"] = 9] = "JACK";
    Rank[Rank["QUEEN"] = 10] = "QUEEN";
    Rank[Rank["KING"] = 11] = "KING";
    Rank[Rank["ACE"] = 12] = "ACE";
})(Rank = exports.Rank || (exports.Rank = {}));
;
;
;
;
;
const SUITNUMS = [32768, 16384, 8192, 4096], RANKPRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41], SUITCHR = 'CDHS', RANKCHR = '23456789TJQKA', SUITLAST = true;
/**
* Convert a suit and rank to a card object
*/
function toObject(suit, rank) {
    return { suit, rank };
}
exports.toObject = toObject;
;
/**
* Convert a suit and rank to a long card string (i.e. ACE OF DIAMONDS)
*/
function toLongString(suit, rank) {
    return `${Rank[rank]} OF ${Suit[suit]}S`;
}
exports.toLongString = toLongString;
;
/**
* Convert a suit and rank to a number (using prime numbers)
*/
function toNumber(suit, rank) {
    return RANKPRIMES[rank] | (rank << 8) | SUITNUMS[suit] | (1 << (16 + rank));
}
exports.toNumber = toNumber;
;
/**
* Determine if argument is a valid card object.
*/
function isCardObject(v) {
    return (typeof v === 'object'
        && typeof v.suit === 'number'
        && typeof v.rank === 'number');
}
exports.isCardObject = isCardObject;
;
/**
* Is a 5 carded hand.
*/
function isHand5(v) {
    return Array.isArray(v) && v.length === 5
        && isCardObject(v[0])
        && isCardObject(v[1])
        && isCardObject(v[2])
        && isCardObject(v[3])
        && isCardObject(v[4]);
}
exports.isHand5 = isHand5;
;
/**
* Is a 7 carded hand.
*/
function isHand7(v) {
    return Array.isArray(v) && v.length === 7
        && isCardObject(v[0])
        && isCardObject(v[1])
        && isCardObject(v[2])
        && isCardObject(v[3])
        && isCardObject(v[4])
        && isCardObject(v[5])
        && isCardObject(v[6]);
}
exports.isHand7 = isHand7;
;
/**
* Convert a number into a card object, or return FALSE if invalid.
*/
function fromNumber(num) {
    let suit, rank = (num >> 8) & 0xF;
    if ((num & SUITNUMS[0]))
        suit = Suit.CLUB;
    if ((num & SUITNUMS[1]))
        suit = Suit.DIAMOND;
    if ((num & SUITNUMS[2]))
        suit = Suit.HEART;
    if ((num & SUITNUMS[3]))
        suit = Suit.SPADE;
    if (typeof suit === 'undefined' || Suit[suit] === undefined || Rank[rank] === undefined)
        return false;
    return { suit, rank };
}
exports.fromNumber = fromNumber;
;
/**
* convert a suit and rank into a short string (i.e. AC)
*/
function toShortString(suit, rank) {
    const rankChr = RANKCHR[rank], suitChr = SUITCHR[suit];
    return SUITLAST ? rankChr + suitChr : suitChr + rankChr;
}
exports.toShortString = toShortString;
;
/**
* Convert a short string back into a card object, or returns FALSE if invalid.
*/
function fromShortString(str) {
    if (!str || str.length < 2)
        return false;
    const rankChr = str[SUITLAST ? 0 : 1], rankIdx = RANKCHR.indexOf(rankChr.toUpperCase()), suitChr = str[SUITLAST ? 1 : 0], suitIdx = SUITCHR.indexOf(suitChr.toUpperCase());
    if (rankIdx === -1 || suitIdx === -1)
        return false;
    return { suit: suitIdx, rank: rankIdx };
}
exports.fromShortString = fromShortString;
;
/**
* Delimiter to use in handString/stringHand operations.
*/
exports.DELIMITER = '|';
/**
* Hand string function converts card objects into a string (i.e. AC|JC|TC|KC|QC)
*/
function handString(...cards) {
    return cards.map(c => toShortString(c.suit, c.rank)).join(exports.DELIMITER);
}
exports.handString = handString;
;
/**
* Converts a hand string back into an array of card objects
*/
function stringHand(hand) {
    return hand.split(exports.DELIMITER).reduce((p, c) => {
        const d = fromShortString(c);
        if (d === false)
            return p;
        p.push(d);
        return p;
    }, []);
}
exports.stringHand = stringHand;
;
/**
* Create a 2 carded hand from string.
*/
function str2(str) {
    const h = stringHand(str).slice(0, 2);
    if (h.length < 2)
        throw new RangeError(`str2 should have at least 2 cards; found = ${h.length}`);
    if (isCardObject(h[0])
        && isCardObject(h[1]))
        return h;
    throw new Error('Invalid 2 card hand.');
}
exports.str2 = str2;
;
/**
* Create a 5 carded hand from string.
*/
function str5(str) {
    const h = stringHand(str).slice(0, 5);
    if (!isHand5(h))
        throw new RangeError(`Invalid 5 card hand: ${JSON.stringify(str)}.`);
    return h;
}
exports.str5 = str5;
;
/**
* Create a 7 carded hand from string.
*/
function str7(str) {
    const h = stringHand(str).slice(0, 7);
    if (!isHand7(h))
        throw new RangeError(`Invalid 7 card hand: ${JSON.stringify(str)}.`);
    return h;
}
exports.str7 = str7;
;
//# sourceMappingURL=card.js.map