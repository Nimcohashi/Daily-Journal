/**
 * Returns the server URL.
 * 
 * This function is used to get the base URL of the server that the application
 * will communicate with. The URL can be changed to point to a different server
 * or to a local development server.
 * 
 * @returns {string} The server URL.
 * 
 * @example
 * // To use the server URL in your application, you can do the following:
 * const serverUrl = getServerUrl();
 * console.log(serverUrl); // Output: "http://192.168.8.102:80"
 * 
 * // Change the URL to your server or your local computer IP if needed.
 * For example:
 * http://192.168.1.100:80
 * 
 * When you successfully run the backend, you will get the following message:
 * "Connected to MongoDB & listening to requests on http://192.168.1.100:80"
 * Be sure to include the port you assigned when you ran the backend.
 */
export function getServerUrl() {
  return "http://192.168.136.6:80"; // Change this to your server or your local computer IP
}