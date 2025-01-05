const os = require("os")

/**
 * Get the local IP address of the machine.
 * 
 * This function iterates over the network interfaces of the machine and returns
 * the first non-internal IPv4 address it finds. If no such address is found, it
 * returns "localhost".
 * 
 * @returns {string} The local IP address or "localhost" if no external IPv4 address is found.
 */
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
    return "localhost";
  }

module.exports = getLocalIP;