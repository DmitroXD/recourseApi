import { IsEnum } from 'class-validator';
import {CreateRecourseDto} from "./create-recourse.dto";
import {RecourseStatus} from "../../entity/recourse";

export class UpdateRecourseDto extends CreateRecourseDto {
  @IsEnum(RecourseStatus)
  status: RecourseStatus;
}
