const mongoose = require("mongoose");
const DB = "mongodb://admin:admin@ac-qixmmr7-shard-00-00.ucxnsks.mongodb.net:27017,ac-qixmmr7-shard-00-01.ucxnsks.mongodb.net:27017,ac-qixmmr7-shard-00-02.ucxnsks.mongodb.net:27017/directory?ssl=true&replicaSet=atlas-14nr5w-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.set('strictQuery',true)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error.message));


  // mongodb+srv://admin:admin@cluster0.ucxnsks.mongodb.net/directory?retryWrites=true&w=majority
  // mongodb://localhost:27017/directory