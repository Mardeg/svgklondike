export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Silent root rewrite: If a user hits "/", serve "svgklondike.svgz" invisibly
  if (url.pathname === "/") {
    url.pathname = "/svgklondike.svgz";
    const rewrittenRequest = new Request(url.toString(), context.request);
    const response = await context.env.ASSETS.fetch(rewrittenRequest);
    
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

  // 2. Global catch-all: Handle direct requests for any .svgz asset across the site
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

  // Pass all other normal files through unmodified
  return context.next();
}
