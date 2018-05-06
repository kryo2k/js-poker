/**
* Card suit unum for standard playing cards
*/
export declare enum Suit {
    CLUB = 0,
    DIAMOND = 1,
    HEART = 2,
    SPADE = 3,
}
/**
* Card rank unum for standard playing cards (no jokers)
*/
export declare enum Rank {
    TWO = 0,
    THREE = 1,
    FOUR = 2,
    FIVE = 3,
    SIX = 4,
    SEVEN = 5,
    EIGHT = 6,
    NINE = 7,
    TEN = 8,
    JACK = 9,
    QUEEN = 10,
    KING = 11,
    ACE = 12,
}
/**
* Primitive card object.
*/
export interface ICardObject {
    suit: Suit;
    rank: Rank;
}
/**
* A two card hand
*/
export interface I2CardHand {
    0: ICardObject;
    1: ICardObject;
}
/**
* A five card hand
*/
export interface I5CardHand extends Array<ICardObject> {
    0: ICardObject;
    1: ICardObject;
    2: ICardObject;
    3: ICardObject;
    4: ICardObject;
}
/**
* A seven card hand
*/
export interface I7CardHand extends Array<ICardObject> {
    0: ICardObject;
    1: ICardObject;
    2: ICardObject;
    3: ICardObject;
    4: ICardObject;
    5: ICardObject;
    6: ICardObject;
}
/**
* Convert a suit and rank to a card object
*/
export declare function toObject(suit: Suit, rank: Rank): ICardObject;
/**
* Convert a suit and rank to a long card string (i.e. ACE OF DIAMONDS)
*/
export declare function toLongString(suit: Suit, rank: Rank): string;
/**
* Convert a suit and rank to a number (using prime numbers)
*/
export declare function toNumber(suit: Suit, rank: Rank): number;
/**
* Determine if argument is a valid card object.
*/
export declare function isCardObject(v: any): v is ICardObject;
/**
* Is a 5 carded hand.
*/
export declare function isHand5(v: any): v is I5CardHand;
/**
* Is a 7 carded hand.
*/
export declare function isHand7(v: any): v is I7CardHand;
/**
* Convert a number into a card object, or return FALSE if invalid.
*/
export declare function fromNumber(num: number): ICardObject | false;
/**
* convert a suit and rank into a short string (i.e. AC)
*/
export declare function toShortString(suit: Suit, rank: Rank): string;
/**
* Convert a short string back into a card object, or returns FALSE if invalid.
*/
export declare function fromShortString(str: string): ICardObject | false;
/**
* Delimiter to use in handString/stringHand operations.
*/
export declare var DELIMITER: string;
/**
* Hand string function converts card objects into a string (i.e. AC|JC|TC|KC|QC)
*/
export declare function handString(...cards: ICardObject[]): string;
/**
* Converts a hand string back into an array of card objects
*/
export declare function stringHand(hand: string): ICardObject[];
/**
* Create a 2 carded hand from string.
*/
export declare function str2(str: string): I2CardHand;
/**
* Create a 5 carded hand from string.
*/
export declare function str5(str: string): I5CardHand;
/**
* Create a 7 carded hand from string.
*/
export declare function str7(str: string): I7CardHand;
