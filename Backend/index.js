import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { AuthRouter } from "./Routes/auth.js";
import { connectDatabase } from "./database/connectdb.js";
import { UserRouter } from "./Routes/user.js";
import { DoctorRouter } from "./Routes/doctor.js";
import { ReviewRouter } from "./Routes/review.js";
config();


/**
 * @app = this is the instance of the express server we are creating that will be used for routing  the incoming request.
 * @PORT = this is the port that will be used locally for hosting the server.
 */

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * @middlewares ===> below mentioned code is all about middlewares.
 * @cors = allowing cross origin resource sharing between frontend and backend.
 * @bodyParser = allowing all type of data to be embedded in  the incoming  request from the  frontend.
 * @json = allow the incoming request to have data already go through the JSON.parse() method reducing the overhead.
 */

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

/**
 * @AuthRouter is the authentication router for handling login and register request.
 * @UserRouter is the router that will be used by user to get access to his account.
 * @DoctorRouter is the router that will manage the doctors in the backend.
 * @ReviewRouter will allow the user to post and view the reviews about a specific doctor.
 */

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/doctors", DoctorRouter);
app.use("/api/v1/reviews", ReviewRouter);

/**
 * @get router for handling the incoming test request
 */
app.get("/", (req, res) => {
  res.send("hello world how are you doing today");
});

/**
 * @listen this is the function from express which is actually resoponsibe for invoking the server.
 */

app.listen(PORT, () => {
  connectDatabase();
  console.log(`The server has started on the port ${PORT}`);
});
