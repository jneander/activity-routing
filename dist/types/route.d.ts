import type { Activity, ActivityParams, ActivityQuery } from './types';
export declare class Route {
    private _activityName;
    private _pathParts;
    private _urlPattern;
    constructor(activityName: string, pathPattern: string);
    get activityName(): string;
    buildActivity(params?: ActivityParams, query?: ActivityQuery): Activity;
    buildActivityFromLocation(path: string, query?: ActivityQuery): Activity;
    match(path: string): number | null;
}
