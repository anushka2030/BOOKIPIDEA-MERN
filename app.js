const express = require("express"); //imports express.js library
const app = express(); //creates an instance
const cors = require("cors");
require ("dotenv").config();
require("./conn/conn");


const user = require("./routes/user");
const books = require("./routes/book");
const fav = require("./routes/favourite");
const cart = require("./routes/cart");
const order = require("./routes/order");
// const forgotpassword = require("./routes/forgotpassword");
// const resetpassword = require("./routes/resetpassword");

app.use(express.json());

app.use(cors());
//routes
app.use("/api/v1",user);//path mounting
app.use("/api/v1",books);
app.use("/api/v1",fav);
app.use("/api/v1",cart);
app.use("/api/v1",order);
// app.use("/api/v1",forgotpassword);
// app.use("/api/v1",resetpassword);

//Define a route for GET requests to the root URL ('/)
app.get("/", (req,res)=>{
    res.send("Hello from Backend Side"); //Send a response to the client
});


//start server and listen on the defined port
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
} );

