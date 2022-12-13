"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const qs_1 = require("qs");
const url_pattern_1 = require("url-pattern");
class Route {
    constructor(activityName, pathPattern) {
        const pathParts = pathPattern.split('/').filter(str => str);
        this._activityName = activityName;
        this._pathParts = pathParts;
        this._urlPattern = new url_pattern_1.default(`/${pathParts.join('/')}(/)`);
    }
    get activityName() {
        return this._activityName;
    }
    buildActivity(params = {}, query = {}) {
        const url = this._urlPattern.stringify(params);
        let queryString = qs_1.default.stringify(query);
        if (queryString) {
            queryString = `?${queryString}`;
        }
        return {
            name: this.activityName,
            params: this._urlPattern.match(url),
            query: query || {},
            url: `${url}${queryString}`,
        };
    }
    buildActivityFromLocation(path, query = {}) {
        return this.buildActivity(this._urlPattern.match(path), query);
    }
    /*
     * Returns null when the route does not match the given path. Otherwise
     * returns an integer representing how closely the route matches the path.
     * Lower values indicate a closer match (1 is exact match).
     */
    match(path) {
        const match = this._urlPattern.match(path);
        if (!match) {
            return null;
        }
        const pathParts = path.split('/').filter(str => str);
        const matchBits = pathParts.map((part, index) => (part === this._pathParts[index] ? 0 : 1));
        return parseInt([...matchBits, 1].join(''), 2);
    }
}
exports.Route = Route;
