"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const qs_1 = require("qs");
const route_1 = require("./route");
function pathParts(path) {
    return path.split('/').filter(part => part);
}
function cleanPath(path) {
    return `/${path.replace(/^\//, '')}`;
}
class Router {
    constructor(contexts = []) {
        this._contexts = [...contexts];
        this._routeList = [];
    }
    add(name, path) {
        const contextPaths = this._contexts.map(context => context.path);
        const paths = pathParts(path).map(cleanPath);
        const fullPath = [...contextPaths, ...paths].join('');
        const route = new route_1.Route(name, fullPath);
        this._routeList.push(route);
    }
    within(path, defineFn) {
        const context = new Router([...this._contexts, { path: cleanPath(path) }]);
        defineFn(context);
        this._routeList = this._routeList.concat(context._routeList);
    }
    buildActivity(activityName, params = {}, query = {}) {
        const route = this._routeList.find(route => route.activityName === activityName);
        if (route == null) {
            return null;
        }
        return route.buildActivity(params, query);
    }
    buildActivityFromLocation(path, query = '') {
        const matchingRoutes = this._routeList.filter(route => route.match(path));
        if (matchingRoutes.length === 0) {
            return null;
        }
        matchingRoutes.sort((routeA, routeB) => routeA.match(path) - routeB.match(path));
        return matchingRoutes[0].buildActivityFromLocation(path, qs_1.default.parse(query));
    }
}
exports.Router = Router;
