const express = require("express");
const app = express();
app.use(express.json());


const FULL_NAME = "john_doe"; 
const DOB = "17091999"; // ddmmyyyy
const EMAIL = "john@xyz.com";
const ROLL_NUMBER = "ABCD123";

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    let odd_numbers = [];
    let even_numbers = [];
    let alphabets = [];
    let special_characters = [];
    let sum = 0;

    data.forEach(item => {
      if (!isNaN(item)) {
        let num = parseInt(item);
        if (num % 2 === 0) even_numbers.push(item.toString());
        else odd_numbers.push(item.toString());
        sum += num;
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        special_characters.push(item);
      }
    });

    // concat string: reverse of alphabets with alternating caps
    let onlyAlphabets = data.filter(el => /^[a-zA-Z]+$/.test(el)).join("");
    let reversed = onlyAlphabets
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string: reversed
    });
  } catch (err) {
    res.status(500).json({ is_success: false, error: err.message });
  }
});

// For Vercel/Render
module.exports = app;
