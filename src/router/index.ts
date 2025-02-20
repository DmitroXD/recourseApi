import {Router} from "express";
import {RecourseController} from "../controller/recourse";

const apiRouter = Router()

RecourseController.includeRouters(apiRouter);

export default apiRouter