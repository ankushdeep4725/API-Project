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
import { IdleExpiry } from '@ng-idle/core';
var MockExpiry = /** @class */ (function (_super) {
    __extends(MockExpiry, _super);
    function MockExpiry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockExpiry.prototype.last = function (value) {
        if (value !== void 0) {
            this.lastDate = value;
        }
        return this.lastDate;
    };
    MockExpiry.prototype.now = function () {
        return this.mockNow || new Date();
    };
    return MockExpiry;
}(IdleExpiry));
export { MockExpiry };
//# sourceMappingURL=mockexpiry.js.map