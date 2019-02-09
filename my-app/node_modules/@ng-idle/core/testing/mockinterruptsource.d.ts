import { InterruptSource } from '@ng-idle/core';
export declare class MockInterruptSource extends InterruptSource {
    constructor(attach?: () => void, detach?: () => void);
    trigger(innerArgs?: any): void;
}
