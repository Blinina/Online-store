require("dotenv").config()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const router = require("../routers")
const app = express()

const PORT = process.env.PORT || 3000
app.use(express.json())
app.use("/", router)
// if (isProduction) {
//   app.use(express.static(path.join(__dirname, "../my-app/build")));
// }

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" })
})

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://blinina:${process.env.MONGO}@cluster0.zxytsl5.mongodb.net/?retryWrites=true&w=majority`,
    )
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}
start()
