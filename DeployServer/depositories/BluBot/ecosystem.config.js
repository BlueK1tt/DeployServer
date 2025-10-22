module.exports = {
    apps : [{
      name   : "BluBot",
      script : "./server.js",
      shutdown_with_message: true,
      stop_exit_codes: [0]
    }]
  }
  