let app2 = require("./app2")
let app3 = require("./app3")

function callApp() {
  app2.morning();
  app3.afternoon();
  app2.evening();
}
exports.callApp =callApp

