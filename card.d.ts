export declare enum Suit {
    CLUB = 0,
    DIAMOND = 1,
    HEART = 2,
    SPADE = 3,
}
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
export interface ICardObject {
    suit: Suit;
    rank: Rank;
}
export interface I2CardHand {
    0: ICardObject;
    1: ICardObject;
}
export interface I5CardHand extends Array<ICardObject> {
    0: ICardObject;
    1: ICardObject;
    2: ICardObject;
    3: ICardObject;
    4: ICardObject;
}
export interface I7CardHand extends Array<ICardObject> {
    0: ICardObject;
    1: ICardObject;
    2: ICardObject;
    3: ICardObject;
    4: ICardObject;
    5: ICardObject;
    6: ICardObject;
}
export declare function toObject(suit: Suit, rank: Rank): ICardObject;
export declare function toLongString(suit: Suit, rank: Rank): string;
export declare function toNumber(suit: Suit, rank: Rank): number;
export declare function isCardObject(v: any): v is ICardObject;
export declare function isHand5(v: any): v is I5CardHand;
export declare function isHand7(v: any): v is I7CardHand;
export declare function fromNumber(num: number): ICardObject | false;
export declare function toShortString(suit: Suit, rank: Rank): string;
export declare function fromShortString(str: string): ICardObject | false;
export declare var DELIMITER: string;
export declare function handString(...cards: ICardObject[]): string;
export declare function stringHand(hand: string): ICardObject[];
export declare function str2(str: string): I2CardHand;
export declare function str5(str: string): I5CardHand;
export declare function str7(str: string): I7CardHand;
