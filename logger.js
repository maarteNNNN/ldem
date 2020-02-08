const LOG_LEVELS = {
  fatal: 0,
  error: 1,
  warn: 2,
  debug: 3,
  info: 4,
  trace: 5
};

class Logger {
  constructor(options = {}) {
    this.process = options.process;
    this.moduleName = options.moduleName;
    this.isMasterProcess = options.processType === 'master';
    this.processInfo = options.processType;
    if (this.process) {
      this.processInfo += `,${this.process.pid}`;
    }
    if (this.moduleName) {
      this.processInfo += `,${this.moduleName}`;
    }
    this.logLevel = LOG_LEVELS[options.logLevel];
  }

  fatal(...args) {
    if (!this.process || this.process.connected || this.isMasterProcess) {
      console.error.apply(console, [`[${Date.now()},FATAL,${this.processInfo}]`].concat(args));
    }
  }

  error(...args) {
    if (this.logLevel < LOG_LEVELS.error) {
      return;
    }
    if (!this.process || this.process.connected || this.isMasterProcess) {
      console.error.apply(console, [`[${Date.now()},ERROR,${this.processInfo}]`].concat(args));
    }
  }

  warn(...args) {
    if (this.logLevel < LOG_LEVELS.warn) {
      return;
    }
    if (!this.process || this.process.connected || this.isMasterProcess) {
      console.error.apply(console, [`[${Date.now()},WARN,${this.processInfo}]`].concat(args));
    }
  }

  info(...args) {
    if (this.logLevel < LOG_LEVELS.info) {
      return;
    }
    if (!this.process || this.process.connected || this.isMasterProcess) {
      console.info.apply(console, [`[${Date.now()},INFO,${this.processInfo}]`].concat(args));
    }
  }

  debug(...args) {
    if (this.logLevel < LOG_LEVELS.debug) {
      return;
    }
    if (!this.process || this.process.connected || this.isMasterProcess) {
      console.debug.apply(console, [`[${Date.now()},DEBUG,${this.processInfo}]`].concat(args));
    }
  }

  trace(...args) {
    if (this.logLevel < LOG_LEVELS.trace) {
      return;
    }
    if (!this.process || this.process.connected || this.isMasterProcess) {
      console.trace.apply(console, [`[${Date.now()},TRACE,${this.processInfo}]`].concat(args));
    }
  }
}

module.exports = Logger;
