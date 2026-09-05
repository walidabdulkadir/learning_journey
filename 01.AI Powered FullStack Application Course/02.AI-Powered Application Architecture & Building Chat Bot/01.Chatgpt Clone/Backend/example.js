// import express from "express";
// const app = express();

// function logger(req, res, next) {
//   const url = req.url;
//   const method = req.method;
//   console.log(url, method);
//   next();
//   // res.send("from logger middleware");
// }
// function errorHandler(err, req, res) {
//   console.log(err.message);
//   res.status(500).send("Undifiend request");
// }
// app.use(logger);

// app.get("/", (req, res) => {
//   res.send("Hello world");
// });

// app.get("/about", (req, res) => {
//   // throw new Error("about route error");
//   res.send("hello world from About");
// });

// app.get("/api/chat", (req, res) => {
//   res.send("hello world from Chat");
// });

// app.get("/api/conversation", (req, res) => {
//   res.send("hello world from Conversation");
// });
// app.use(errorHandler);

// app.listen(5600, () => {
//   console.log("Server is running at http://localhost:5500");
// });
