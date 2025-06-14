import { connectToDatabase } from "./db.js";

export default async function handler(req, res) {
  try {
    await connectToDatabase();

    res.status(200).json({
      message: "Welcome to the Vercel Serverless API!",
      architecture:
        "This API uses Vercel's serverless architecture, where each file in the /api directory is deployed as an independent serverless function. This means you don't need to manage servers or use Express; just export a default handler from each file.",
      cache:
        "To optimize MongoDB connections in a serverless environment, we use a cache (global.mongoose) to reuse the database connection across function invocations. This prevents opening a new connection on every request, which is important for performance and reliability.",
      vercel_performance:
        "Vercel serverless functions are globally distributed and auto-scale instantly, providing very fast cold starts and low latency compared to traditional servers. This makes Vercel ideal for modern, scalable APIs.",
      deployment_best_practices:
        "Avoid deploying traditional Node.js apps (using Express and app.listen) on Vercel. Vercel is designed for serverless functions, not long-running servers. Deploying traditional servers can cause errors like timeouts, port binding failures, and memory leaks, as Vercel does not support persistent server processes. Always use the serverless function pattern (export default handler) for backend APIs on Vercel.",
      common_errors_and_consequences:
        "Common issues when deploying traditional Node.js apps on Vercel include: 'Cannot bind to port', 'Timeout exceeded', and 'Process exited unexpectedly'. These occur because Vercel expects each API file to export a handler, not to start a server. For best results, follow Vercel's serverless architecture and avoid using frameworks that require persistent servers unless they support serverless mode.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Database connection failed." });
  }
}
