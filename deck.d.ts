/// <reference types="chance" />
import { ICardObject, Suit, Rank } from './card';
export declare class Deck {
    cards: ICardObject[];
    constructor(cards?: ICardObject[]);
    readonly length: number;
    deal(): ICardObject | false;
    shuffle(times?: number, randomizer?: () => number): Deck;
    indexOf(suit: Suit, rank: Rank, fromIndex?: number): number;
    indexOfObject(card: ICardObject, fromIndex?: number): number;
    static shuffle<T>(arr: T[], times?: number, randomizer?: () => number): T[];
    static standard(times?: number): Deck;
}
export declare function seededRandomizer(seed: Chance.Seed): () => number;
