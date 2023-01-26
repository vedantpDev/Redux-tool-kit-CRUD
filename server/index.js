const express = require("express");
const app = express();
const PORT = 8000;
const cors = require("cors");
const conn = require("./db");
const bodyparser = require("body-parser");

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/tutorials", (req, res) => {
  const q = `select * from data`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.post("/tutorials", (req, res) => {
  if (!req.body) return new Error("Pleace Provide Data");
  const q = `insert into data (Title, Description) values('${req.body.title}', '${req.body.description}') `;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      message: "Success",
    });
  });
});

app.delete(`/tutorials/:id`, (req, res) => {
  if (!req.params) return new Error("Pleace Provide ID");
  let q = `delete from  data where id = ${req.params.id}`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      id: req.params.id,
      message: "Data Deleted",
    });
  });
});

app.put(`/tutorials/:id`, (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `update data set Title= '${req.body.Title}', Description= '${req.body.Description}' where id = ${req.params.id}`;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
      id: req.params.id,
      tutorialData: {
        id: req.params.id,
        Title: req.body.Title,
        Description: req.body.Description,
      },
      messae: "Data Updated",
    });
  });
});

app.post(`/tutorialsSearch`, (req, res) => {
  if (!req.body) return new Error("Please Provide Data");
  let q = `select * from data where Title like '${req.body.title}%' `;
  conn.query(q, (err, data) => {
    if (err) return new Error(err);
    res.status(200).send({
      data: data,
    });
  });
});

app.listen(PORT, console.log("App Running on", PORT));
