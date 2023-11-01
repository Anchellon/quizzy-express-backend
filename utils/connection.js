const mongoose = require("mongoose");
//  We are switching to a replica set to
// https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker

mongoose.set("strictQuery", false);
const mongoDB =
    "mongodb://quizzy-mongo1:27017,quizzy-mongo2:27018,quizzy-mongo3:27019/?replicaSet=myReplicaSet";

main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(mongoDB);
}
const conn = mongoose.connection;
conn.on("error", () => console.error.bind(console, "connection error"));

conn.once("open", () => console.info("Connection to Database is successful"));

module.exports = conn;
