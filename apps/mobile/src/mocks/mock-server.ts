type RouteHandler = (req: Request, params: Record<string, string>) => Promise<Response> | Response;
type Route = { method: string; pattern: RegExp; paramNames: string[]; handler: RouteHandler };

const routes: Route[] = [];

function pathToRegex(path: string): { pattern: RegExp; paramNames: string[] } {
  const paramNames: string[] = [];
  const regexStr = path
    .replace(/:([^/]+)/g, (_, name) => {
      paramNames.push(name);
      return '([^/]+)';
    })
    .replace(/\//g, '\\/');
  return { pattern: new RegExp(`^${regexStr}$`), paramNames };
}

function addRoute(method: string, path: string, handler: RouteHandler) {
  const { pattern, paramNames } = pathToRegex(path);
  routes.push({ method: method.toUpperCase(), pattern, paramNames, handler });
}

export const mock = {
  get: (path: string, handler: RouteHandler) => addRoute('GET', path, handler),
  post: (path: string, handler: RouteHandler) => addRoute('POST', path, handler),
  put: (path: string, handler: RouteHandler) => addRoute('PUT', path, handler),
  patch: (path: string, handler: RouteHandler) => addRoute('PATCH', path, handler),
  delete: (path: string, handler: RouteHandler) => addRoute('DELETE', path, handler),
};

export function json(data: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(data), {
    status: init?.status || 200,
    headers: { 'Content-Type': 'application/json', ...(init?.headers as Record<string, string> || {}) },
  });
}

export function startMockServer() {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async function mockedFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const request = input instanceof Request ? input : new Request(input, init);
    const url = new URL(request.url, 'http://localhost');
    const pathname = url.pathname;
    const method = (init?.method || request.method || 'GET').toUpperCase();

    for (const route of routes) {
      if (route.method !== method) continue;
      const match = pathname.match(route.pattern);
      if (!match) continue;

      const params: Record<string, string> = {};
      route.paramNames.forEach((name, i) => {
        params[name] = match[i + 1];
      });

      try {
        const response = await route.handler(request, params);
        return response;
      } catch (error) {
        console.error('[MockServer] Handler error:', error);
        return json({ message: 'Internal server error' }, { status: 500 });
      }
    }

    return originalFetch(input, init);
  };

  console.log('[MockServer] Mock server started');
}
