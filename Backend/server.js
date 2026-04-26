require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/config/database');

const PORT = process.env.PORT || 3000;

// Wrap in async function
const startServer = async () => {
  try {
    await connectDB();
    console.log("Database connected ✅");

    app.get("/", (req, res) => {
      res.send("This is the trial version of backend 🚀");
    });

    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });

  } catch (error) {
    console.error("Server failed to start ❌", error);
    process.exit(1);
  }
};

startServer();