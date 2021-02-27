import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from "./controllers/AnswerController";
import { NpsController } from "./controllers/NpsController";

const router = Router();

const userController = new UserController();
const surveysController = new SurveysController()
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//#region Routes Users

router.post("/users", userController.create);

//#endregion 

//#region Routes Surveys 

router.post("/surveys", surveysController.create);
router.get("/surveys", surveysController.show);

//#endregion

//#region Routes Survey Users

router.post("/sendMail", sendMailController.execute);

//#endregion

//#region Routes Answer

router.get("/answers/:value", answerController.execute);

//#endregion

//#region NPS Routes

router.get("/nps/:survey_id", npsController.execute);

//#endregion

export { router };
