import mongoose from "mongoose";

const connectDatabase = () => {
  // mongoose.set('strictQuery', false).
  mongoose
    .connect(process.env.URI_MONGO, {
      dbName: "Project_15H",
    })
    .then((data) => {
      console.log(
        `Server is Connected Successfully Host is ${data.connection.host}`
      );
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectDatabase;
