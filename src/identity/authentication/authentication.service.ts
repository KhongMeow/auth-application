import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { RolesService } from 'src/roles/roles.service';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly rolesService: RolesService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    try {
      const defualtRole = await this.rolesService.findOneBySlug('user');
      if (!defualtRole) {
        throw new Error('Default role not found');
      }

      const user = new User();
      user.fullname = signUpDto.fullname;
      user.username = signUpDto.username;
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      user.role = defualtRole;

      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userRepository.findOne({
        where: [
          { username: signInDto.usernameOrEmail },
          { email: signInDto.usernameOrEmail },
        ],
        relations: ['role', 'balance'],
      });

      if (!user) {
        throw new NotFoundException(`User with username or email ${signInDto.usernameOrEmail} is not found`);
      }

      const isPasswordMatch = await this.hashingService.compare(signInDto.password, user.password);
      if (!isPasswordMatch) {
        throw new BadRequestException('Incorrect password');
      }

      return user;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
