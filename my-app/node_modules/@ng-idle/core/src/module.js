import { NgModule } from '@angular/core';
import { Idle } from './idle';
import { IdleExpiry } from './idleexpiry';
import { LocalStorageExpiry } from './localstorageexpiry';
import { LocalStorage } from './localstorage';
var NgIdleModule = /** @class */ (function () {
    function NgIdleModule() {
    }
    NgIdleModule.forRoot = function () {
        return {
            ngModule: NgIdleModule,
            providers: [LocalStorageExpiry, { provide: IdleExpiry, useExisting: LocalStorageExpiry }, Idle]
        };
    };
    NgIdleModule.decorators = [
        { type: NgModule, args: [{
                    providers: [LocalStorage]
                },] },
    ];
    return NgIdleModule;
}());
export { NgIdleModule };
//# sourceMappingURL=module.js.map