/// <reference types="chance" />
import { ICardObject, Suit, Rank } from './card';
/**
* Main class for Deck object
*/
export declare class Deck {
    cards: ICardObject[];
    constructor(cards?: ICardObject[]);
    /**
    * Length of cards in this deck.
    */
    readonly length: number;
    /**
    * Deal the next card (from top), or returns FALSE if there
    * is not enough cards in deck.
    */
    deal(): ICardObject | false;
    /**
    * Shuffles cards in this deck. Allows specifying a number of times
    * to repeat the operation, as well as providing your own randomizer
    * function.
    */
    shuffle(times?: number, randomizer?: () => number): Deck;
    /**
    * Finds the next index of the provided suit and rank, with support for
    * an optional starting index. Starts from beginning if fromIndex is not
    * provided or invalid.
    */
    indexOf(suit: Suit, rank: Rank, fromIndex?: number): number;
    /**
    * Finds the next index of the provided card object, with support for
    * an optional starting index. Starts from beginning if fromIndex is not
    * provided or invalid.
    */
    indexOfObject(card: ICardObject, fromIndex?: number): number;
    /**
    * Static function to shuffle an array (in place) with options for number
    * of times to repeat operation, and also a custom randomizer function.
    */
    static shuffle<T>(arr: T[], times?: number, randomizer?: () => number): T[];
    /**
    * Shortcut for creating a new standard 52 card deck (unshuffled).
    */
    static standard(times?: number): Deck;
}
/**
* Creates a new randomizer function using a string or number seed to
* control the sequence cards are dealt.
*/
export declare function seededRandomizer(seed: Chance.Seed): () => number;
