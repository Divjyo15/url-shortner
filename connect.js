const mongoose = require("mongoose");
function connectdb(){
mongoose
    .connect("mongodb+srv://divya67990:7UaXhF29hf60yGgH@cluster0.u3ibw.mongodb.net/url")
    .then(() => console.log("Db Connected"))
    .catch((err) => console.log("Moongo error", err));
}
    module.exports = {connectdb};
