const formatLog = (level, message, data = {}) => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...data
  }

  console.log(JSON.stringify(logEntry))
}

module.exports = {

  info: (message, data) => {
    formatLog("INFO", message, data)
  },

  warn: (message, data) => {
    formatLog("WARN", message, data)
  },

  error: (message, data) => {
    formatLog("ERROR", message, data)
  }

}

