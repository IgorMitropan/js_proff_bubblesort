'use strict';
class Notification {
    constructor(options) {
        this._el = document.createElement('div');
        this._el.className = "notification";
        this._el.style.top = (options.top || 79) + 'px';
        this._el.style.left = (options.left || 250) + 'px';
        this._el.innerHTML = options.text;

        document.body.appendChild(this._el);

        this.timer = this.removeNotification(options.timeout || 2500);
    }
    removeNotification(timeout) {
        let node = this._el;
        return setTimeout(function () {
            document.body.removeChild(node);
        }, timeout);
    }
}
