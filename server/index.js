import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import monggose from "mongoose";

const app = express();

const Schema = monggose.Schema;

app.use(cors());
app.use(bodyParser.json());

const TicketSchema = new Schema(
  {
    user: String,
    priority: Number,
    date: Date,
    priority: Number,
    message: String
  },
  {
    versionKey: false,
  }
);

const Ticket = monggose.model("Ticket", TicketSchema);

// Connect to the database
monggose.connect("mongodb://localhost/tickets");

app.get("/", (req, res) => {
  Ticket.find({}, (err, tickets) => {
    if (err) {
      res.sendStatus(500);
    }
    res.json(tickets.reverse());
  });
});

app.get("/random", (req, res) => {
  const ticket = new Ticket({
    message: "Lorem ipsum dolor s it amet consectetur adipisicing elit. Blanditiis, modi ratione ab a temporibus reiciendis od it quisquam veniam dolore.",
    user: "Anonymous",
    date: new Date(),
    priority: Math.floor(Math.random() * 3 + 1),
  });
  ticket.save((err, savedTicket) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    }
    res.json(savedTicket);
  });
});

app.post("/ticket", (req, res) => {
  console.log(req.body);
    // parse the jumpline in the message
  let ticket = new Ticket({
      user: req.body.user,
      priority: req.body.priority,
      date: new Date().toLocaleString(),
      message: req.body.message,

  });
  ticket.save((err, savedTicket) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      }
      res.json(savedTicket);
    });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
