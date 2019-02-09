import { IdleExpiry } from '@ng-idle/core';
export declare class MockExpiry extends IdleExpiry {
    lastDate: Date;
    mockNow: Date;
    last(value?: Date): Date;
    now(): Date;
}
