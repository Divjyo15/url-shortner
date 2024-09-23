const express = require("express");
const urlRoutes = require("./routes/urlroute");
const path = require('path');
const { connectdb } = require("./connect.js");
const staticRoute = require("./routes/staticroute");
const userRoute = require ("./routes/userroute.js");
const { checkForAuthentication,restrictTo } = require("./middlewares/auth");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = 8000;

connectdb();
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication);

app.get("/test",async(req,res) =>{
  const allUrls = await URL.find({});
  return res.render("home",{
    urls:(allUrls),
  });
  
});

app.use("/user", userRoute);
app.use("/url", restrictTo("NORMAL","ADMIN"), urlRoute);
app.use("/", checkAuth, staticRoute);

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use("/",  staticRoute);

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      {
        shortId,
      },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );
    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));