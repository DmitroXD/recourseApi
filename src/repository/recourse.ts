import { AppDataSource } from "../data-source";
import {RecourseService} from "../service/recourse.service";
import {Recourse} from "../entity";

export const recourseRepository = new RecourseService(
  AppDataSource.getRepository(Recourse)
);