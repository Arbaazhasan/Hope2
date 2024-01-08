import mongoose from "mongoose";


// database COnnectivity 
export const dbConnection = () => {
    mongoose.connect(process.env.DB_URI, { dbName: "fullStackApp" }).then(() => {
        console.log("Database COnnected");
    }).catch((e) => {
        console.log(e);
    });
};
