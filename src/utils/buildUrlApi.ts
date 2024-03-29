import queryString from "query-string";
import { ParsedUrlQuery } from "querystring";

interface BuildUrlOptions {
  query?: ParsedUrlQuery;
  isQueryPath?: boolean;
  path: string;
}
export function buildUrlApi({ query, path, isQueryPath }: BuildUrlOptions) {
  const params = queryString.stringify({ ...query });
  const queryValue = Object.values(query as {})[0];
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const queryPath = isQueryPath && queryValue ? `/${queryValue}` : `?${params}`;
  const url = `${API_URL}${path}${queryPath}`;
  return url;
}
