export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Silent root rewrite via an absolute network fetch
  if (url.pathname === "/") {
    // Construct the direct absolute URL to the compressed asset
    const assetUrl = `${url.protocol}//${url.host}/svgklondike.svgz`;
    
    // Fetch it completely cleanly over the network
    const response = await fetch(assetUrl, context.request);
    
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
