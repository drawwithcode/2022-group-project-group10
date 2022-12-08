let express = require("express");
let app = express();
let port = 3000;
let server = app.listen(port);

console.log("running server on http://localhost:" + port);

app.use(express.static("public"))