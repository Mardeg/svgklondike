export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Silent root rewrite: Target the specific asset object directly
  if (url.pathname === "/") {
    // Force a fresh request object pointing explicitly to the .svgz asset file
    const targetRequest = new Request(new URL("/svgklondike.svgz", context.request.url));
    const response = await context.env.ASSETS.fetch(targetRequest);
    
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Encoding": "gzip",
        "Cache-Control": "no-transform, no-cache"
      },
      encodeBody: "manual"
    });
  }

  // 2. Global catch-all for direct requests
  if (url.pathname.endsWith(".svgz")) {
    const response = await context.env.ASSETS.fetch(context.request);
    
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Encoding": "gzip",
        "Cache-Control": "no-transform, no-cache"
      },
      encodeBody: "manual"
    });
  }

  return context.next();
}
