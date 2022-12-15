import qs from 'qs'
import UrlPattern from 'url-pattern'

import type {Activity, ActivityParams, ActivityQuery} from './types'

export class Route {
  private _activityName: string
  private _pathParts: string[]
  private _urlPattern: UrlPattern

  constructor(activityName: string, pathPattern: string) {
    const pathParts = pathPattern.split('/').filter(str => str)

    this._activityName = activityName
    this._pathParts = pathParts
    this._urlPattern = new UrlPattern(`/${pathParts.join('/')}(/)`)
  }

  get activityName(): string {
    return this._activityName
  }

  buildActivity(params: ActivityParams = {}, query: ActivityQuery = {}): Activity {
    const url = this._urlPattern.stringify(params)
    let queryString = qs.stringify(query)
    if (queryString) {
      queryString = `?${queryString}`
    }

    return {
      name: this.activityName,
      params: this._urlPattern.match(url),
      query: query || {},
      url: `${url}${queryString}`,
    }
  }

  buildActivityFromLocation(path: string, query: ActivityQuery = {}): Activity {
    return this.buildActivity(this._urlPattern.match(path), query)
  }

  /*
   * Returns null when the route does not match the given path. Otherwise
   * returns an integer representing how closely the route matches the path.
   * Lower values indicate a closer match (1 is exact match).
   */
  match(path: string): number | null {
    const match = this._urlPattern.match(path)
    if (!match) {
      return null
    }

    const pathParts = path.split('/').filter(str => str)
    const matchBits = pathParts.map((part, index) => (part === this._pathParts[index] ? 0 : 1))

    return parseInt([...matchBits, 1].join(''), 2)
  }
}
