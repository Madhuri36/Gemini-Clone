import app from "./app.js";
import { connectToDatabase } from "./database/connection.js";

// Connections and listeners
const PORT = process.env.PORT || 5000;
connectToDatabase()
  .then(() => {
    app.listen(5000, () => console.log("Server is running on port 5000 and connected to DB"));
  })
  .catch((err) => console.log(err));
