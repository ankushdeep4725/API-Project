var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { KeepaliveSvc } from '@ng-idle/core';
var MockKeepaliveSvc = /** @class */ (function (_super) {
    __extends(MockKeepaliveSvc, _super);
    function MockKeepaliveSvc() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isRunning = false;
        return _this;
    }
    MockKeepaliveSvc.prototype.start = function () {
        this.isRunning = true;
    };
    MockKeepaliveSvc.prototype.stop = function () {
        this.isRunning = false;
    };
    MockKeepaliveSvc.prototype.ping = function () {
        // do nothing
    };
    return MockKeepaliveSvc;
}(KeepaliveSvc));
export { MockKeepaliveSvc };
//# sourceMappingURL=mockkeepalivesvc.js.map