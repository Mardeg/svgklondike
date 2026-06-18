export async function onRequest(context) {
  const url = new URL(context.request.url);

  // 1. Silent root rewrite: Pull from GitHub Pages and manually fix the response
  if (url.pathname === "/") {
    // REPLACE 'yourusername' with your actual GitHub username
    const githubAssetUrl = "https://mardeg.github.io/svgklondike/klondike.svgz";
    
    // Fetch the asset from GitHub (even though GitHub's headers are broken)
    const githubResponse = await fetch(githubAssetUrl);
    
    // Create a pristine response, forcing the headers that GitHub dropped
    return new Response(githubResponse.body, {
      status: githubResponse.status,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Encoding": "gzip",
        "Cache-Control": "no-transform, no-cache",
        "Access-Control-Allow-Origin": "*"
      },
      encodeBody: "manual"
    });
  }

  // 2. Global catch-all for direct .svgz requests on the Cloudflare side
  if (url.pathname.endsWith(".svgz")) {
    const response = await context.env.ASSETS.fetch(context.request);
    
    return new Response(response.body, {
      status: response.status,
      headers: {
        "Content-Type": "image/svg+xml",
        "Content-Encoding": "gzip",
        "Cache-Control": "no-transform, no-cache",
        "Access-Control-Allow-Origin": "*"
      },
      encodeBody: "manual"
    });
  }

  return context.next();
}
