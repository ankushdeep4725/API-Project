import { KeepaliveSvc } from '@ng-idle/core';
export declare class MockKeepaliveSvc extends KeepaliveSvc {
    isRunning: boolean;
    start(): void;
    stop(): void;
    ping(): void;
}
