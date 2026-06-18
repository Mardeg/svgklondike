export async function onRequest(context) {
  const url = new URL(context.request.url);

  // Check if the requested file ends with .svgz
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

  // Pass all other normal files (HTML, JS, CSS) through unmodified
  return context.next();
}
