import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User | null> {
    const user = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(user);
  }

  async findByGoogleId(googleId: string): Promise<User | null> {
    return this.userRepository.findOneBy({ googleId });
  }

  async findByRefreshToken(refreshToken: string): Promise<User | null> {
    const users = await this.userRepository.find({
      where: { jwtRefreshToken: Not(IsNull()) },
    });
    for (const user of users) {
      console.log(user.jwtRefreshToken);
      const isMatch = await bcrypt.compare(refreshToken, user.jwtRefreshToken);
      if (isMatch) {
        console.log('user ' + user);
        return user;
      }
    }

    return null;
  }

  async updateRefreshToken(userObj: User, refreshToken: string) {
    userObj.jwtRefreshToken = refreshToken;
    return await this.userRepository.save(userObj);
  }
}
