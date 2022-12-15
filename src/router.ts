import qs from 'qs'

import {Route} from './route'
import type {Activity, ActivityParams, ActivityQuery, RouteContext} from './types'

function pathParts(path: string): string[] {
  return path.split('/').filter(part => part)
}

function cleanPath(path: string): string {
  return `/${path.replace(/^\//, '')}`
}

export class Router {
  private _contexts: RouteContext[]
  private _routeList: Route[]

  constructor(contexts: RouteContext[] = []) {
    this._contexts = [...contexts]
    this._routeList = []
  }

  add(name: string, path: string): void {
    const contextPaths = this._contexts.map(context => context.path)
    const paths = pathParts(path).map(cleanPath)
    const fullPath = [...contextPaths, ...paths].join('')
    const route = new Route(name, fullPath)
    this._routeList.push(route)
  }

  within(path: string, defineFn: (context: Router) => void): void {
    const context = new Router([...this._contexts, {path: cleanPath(path)}])
    defineFn(context)
    this._routeList = this._routeList.concat(context._routeList)
  }

  buildActivity(
    activityName: string,
    params: ActivityParams = {},
    query: ActivityQuery = {},
  ): Activity {
    const route = this._routeList.find(route => route.activityName === activityName)

    if (route == null) {
      return null
    }

    return route.buildActivity(params, query)
  }

  buildActivityFromLocation(path: string, query = ''): Activity | null {
    const matchingRoutes = this._routeList.filter(route => route.match(path))

    if (matchingRoutes.length === 0) {
      return null
    }

    matchingRoutes.sort((routeA, routeB) => routeA.match(path) - routeB.match(path))
    return matchingRoutes[0].buildActivityFromLocation(path, qs.parse(query))
  }
}
