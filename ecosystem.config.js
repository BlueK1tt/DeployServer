module.exports = {
  apps : [{
    name   : "Deployment server",
    script : "./server.js",
    shutdown_with_message: true,
    stop_exit_codes: [0]
  }]
}