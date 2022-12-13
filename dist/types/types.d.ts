export type ActivityParams = {
    [key: string]: string;
};
export type ActivityQuery = {
    [key: string]: undefined | string | string[] | ActivityQuery | ActivityQuery[];
};
export type Activity = {
    name: string;
    params: ActivityParams;
    query: ActivityQuery;
    url: string;
};
export type RouteContext = {
    path: string;
};
