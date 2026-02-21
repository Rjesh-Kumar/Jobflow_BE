const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/mongodb");

const jobsRouter = require("./routes/jobs");

const app = express();

// ✅ Only ONE CORS for Vercel
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://job-flow-fe.vercel.app"
  ],
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json());

// ✅ DB connect BEFORE routes
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// OPTIONS preflight fix for Vercel
app.options("*", cors());

// Welcome
app.get("/", (req,res)=>{
  res.json({message:"API Running"});
});

app.use("/api/jobs", jobsRouter);

module.exports = app;

// LOCAL ONLY
if (process.env.NODE_ENV !== "production") {
  const PORT = 5000;
  app.listen(PORT, ()=>console.log("Local running"));
}