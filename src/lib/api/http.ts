import { API_BASE_URL } from "./config";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type RequestOptions<TBody> = {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
  // when you call from a Server Component you can still pass next / cache options if needed
  next?: RequestInit["next"];
  cache?: RequestInit["cache"];
};

export async function apiRequest<TResponse, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {},
): Promise<TResponse> {
  const url = `${API_BASE_URL}${path}`;

  const { method = "GET", body, headers, next, cache } = options;

  const init: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    next,
    cache,
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    // In real app you may want more advanced error handling
    const text = await res.text();
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }

  return (await res.json()) as TResponse;
}

