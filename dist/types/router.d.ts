import type { Activity, ActivityParams, ActivityQuery, RouteContext } from './types';
export declare class Router {
    private _contexts;
    private _routeList;
    constructor(contexts?: RouteContext[]);
    add(name: string, path: string): void;
    within(path: string, defineFn: (context: Router) => void): void;
    buildActivity(activityName: string, params?: ActivityParams, query?: ActivityQuery): Activity;
    buildActivityFromLocation(path: string, query?: string): Activity | null;
}
