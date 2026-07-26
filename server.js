require("dotenv").config();

const app = require ("./src/app.js")
const connectDB = require("./src/db/db.js")

const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB()

app.listen(3000,()=>{
    console.log(("server is running on 3000"))
    
})