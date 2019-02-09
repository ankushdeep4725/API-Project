import { IdleExpiry } from './idleexpiry';
import { LocalStorage } from './localstorage';
export declare class LocalStorageExpiry extends IdleExpiry {
    private localStorage;
    private idleName;
    constructor(localStorage: LocalStorage);
    last(value?: Date): Date;
    idling(value?: boolean): boolean;
    getIdleName(): string;
    setIdleName(key: string): void;
    private getExpiry();
    private setExpiry(value);
    private getIdling();
    private setIdling(value);
}
