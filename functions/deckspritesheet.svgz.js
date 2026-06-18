export async function onRequest(context) {
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
