const app = require("express")();
app.get("/", async function (req, res) {
  res.sendFile(__dirname+"/jea.html")
})
const port = process.env.PORT || 3030 || 3000 || 8080;
app.listen(port, () => {
  console.log("Running on port "+port)
})
