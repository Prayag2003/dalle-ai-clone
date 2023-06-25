import mongoose from "mongoose";

const mongoDb = (url) => {
    // StrictQuery only allows those queries with the exact schema , extra fields are not allowed
    mongoose.set("strictQuery", true);

    mongoose.connect(url)
        .then(() => console.log(`MongoDB Connected`))
        .catch((err) => console.log(err))
}

export default mongoDb;