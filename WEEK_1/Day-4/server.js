const http = require("http");

const server = http.createServer((req, res) => {
  try {
    const url = new URL(req.url, "http://localhost:3000");
    const path = url.pathname;

    // HOME
    if (path === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Node HTTP Server Running\n");
      return;
    }

    // ECHO
    if (path === "/echo") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(req.headers, null, 2) + "\n");
      return;
    }

    // SLOW
    if (path === "/slow") {
      const ms = Number(url.searchParams.get("ms")) || 1000;

      setTimeout(() => {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`Response delayed by ${ms} ms\n`);
      }, ms);

      return;
    }

    // CACHE
    if (path === "/cache") {
      res.writeHead(200, {
        "Content-Type": "text/plain",
        "Cache-Control": "public, max-age=3600",
        "Expires": new Date(Date.now() + 3600000).toUTCString(),
        "ETag": "v1"
      });

      res.end("This response is cacheable for 1 hour\n");
      return;
    }

    // 404
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found\n");

  } catch (err) {
    // SAFETY NET — prevents server crash
    console.error("Server error:", err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error\n");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

