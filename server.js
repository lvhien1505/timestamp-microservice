const express = require("express");
const env = require("dotenv");

env.config();

const app = express();


app.get("/",(req,res)=>{
      res.sendFile(__dirname + "/views/index.html");
})
app.get("/api/timestamp", (req, res) => {
  const unix =Date.now();
  const utc = Date();
  res.json({
    unix,
    utc,
  });
});

app.get("/api/timestamp/:time_str", (req, res) => {
  let timeStr = req.params.time_str;
  if (/\d{5,}/.test(timeStr)) {
    let timeInt = parseInt(timeStr);
    let utc = new Date(timeInt).toUTCString();
    return res.json({
      unix: timeStr,
      utc,
    });
  }

  let checkDate = new Date(timeStr);
  
  if (checkDate.toString() === "Invalid Date") {
    return res.json({ error: "Invaid Date" });
  } else {
    res.json({
      unix: checkDate.valueOf(),
      utc: checkDate.toUTCString(),
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server is running at port ", PORT);
});
