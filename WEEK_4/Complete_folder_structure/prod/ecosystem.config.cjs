module.exports = {
  apps: [
    {
      name: "week-4-backend",
      script: "src/index.js",   // relative path from project root
      instances: "max",
      exec_mode: "cluster",
      interpreter: "node",      // ensures Node runs your ES module code
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
