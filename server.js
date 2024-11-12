import express from "express";
import dotenv from "dotenv";
dotenv.config(); // Die Umgebungsvariablen werden geladen

const app = express();
app.use(express.json());

const choices = ["rock", "paper", "scissors"];

app.post("/play", (req, res, next) => {
  const playerChoice = req.body.choice;
  // Überprüfe, ob die Eingabe existiert
  if (!playerChoice) {
    return res.sendStatus(400);
  }
  // Überprüfe, ob die Eingabe richtig ist
  if (!choices.includes(playerChoice)) {
    return res.sendStatus(404);
  }
  try {
    const computerChoice = choices.at(
      Math.floor(Math.random() * choices.length)
    );
    // Der Spieler gewinnt, wenn einer der drei Fälle eintritt
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      return res.json({
        winner: "Player",
        computer: computerChoice,
        player: playerChoice,
      });
    } else if (
      (computerChoice === "rock" && playerChoice === "scissors") ||
      (computerChoice === "paper" && playerChoice === "rock") ||
      (computerChoice === "scissors" && playerChoice === "paper")
    ) {
      return res.json({
        winner: "Computer",
        computer: computerChoice,
        player: playerChoice,
      });
    } else {
      return res.json({
        winner: null,
        computer: computerChoice,
        player: playerChoice,
      });
    }
  } catch (e) {
    next(e);
  }
});

app.get("*", (req, res) => {
  res.send("Let's play rock, paper, scissors!");
});

app.use((error, req, res, next) => {
  console.log(error);
  return res.sendStatus(500);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server: http://localhost:${PORT}`));
