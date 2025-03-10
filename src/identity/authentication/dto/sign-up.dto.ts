import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-z0-9-]*$/, {
    message: 'Username can only contain letters, numbers, and dash',
  })
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @IsString()
  password: string;
}