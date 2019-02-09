import { NgModule } from '@angular/core';
import { KeepaliveSvc, NgIdleModule } from '@ng-idle/core';
import { Keepalive } from './keepalive';
var NgIdleKeepaliveModule = /** @class */ (function () {
    function NgIdleKeepaliveModule() {
    }
    NgIdleKeepaliveModule.forRoot = function () {
        return {
            ngModule: NgIdleKeepaliveModule,
            providers: [Keepalive, { provide: KeepaliveSvc, useExisting: Keepalive }]
        };
    };
    NgIdleKeepaliveModule.decorators = [
        { type: NgModule, args: [{ imports: [NgIdleModule.forRoot()] },] },
    ];
    return NgIdleKeepaliveModule;
}());
export { NgIdleKeepaliveModule };
//# sourceMappingURL=module.js.map