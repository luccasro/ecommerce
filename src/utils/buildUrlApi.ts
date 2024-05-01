import queryString from "query-string";
import { ParsedUrlQuery } from "querystring";

interface BuildUrlOptions {
  query?: ParsedUrlQuery;
  isQueryPath?: boolean;
  path: string;
}
export function buildUrlApi({ query, path, isQueryPath }: BuildUrlOptions) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  if (!query && !isQueryPath) {
    return `${API_URL}${path}`;
  }

  const params = queryString.stringify({ ...query });
  const queryValue = Object.values(query as {})[0];
  const queryPath = isQueryPath && queryValue ? `/${queryValue}` : `?${params}`;

  return `${API_URL}${path}${queryPath}`;
}
