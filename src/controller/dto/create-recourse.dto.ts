import { IsString } from 'class-validator';

export class CreateRecourseDto {
  @IsString()
  readonly theme: string;

  @IsString()
  readonly description: string;
}
