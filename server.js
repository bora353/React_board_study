const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(
  ["/api"],
  createProxyMiddleware({
    target: "http://localhost:5123/",
    changeOrigin: true,
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/build/index.html"));
});

app.listen(8080, function () {
  console.log("listening on 8080");
});
