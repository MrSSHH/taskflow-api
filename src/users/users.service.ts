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

    // TODO: Replace O(n) refresh token lookup with O(1) selector-verifier pattern.
    //       Instead of scanning all users and bcrypt-comparing every stored hash,
    //       generate refresh tokens as "<selector>.<verifier>":
    //         - selector (UUID) stored in DB as plaintext + indexed
    //         - verifier hashed with bcrypt and stored in DB
    //       On refresh, split token → lookup by selector → bcrypt.compare(verifier, hash).
    //       This eliminates loops, improves performance, and matches industry standards
    //       (Google/Auth0-style refresh tokens).

    for (const user of users) {
      console.log(
        `[UsersService] Checking refresh token against user id=${user.id}, email=${user.email}`,
      );
      const isMatch = await bcrypt.compare(refreshToken, user.jwtRefreshToken);
      if (isMatch) {
        console.log(
          `[UsersService] Refresh token MATCHED user id=${user.id}, email=${user.email}`,
        );
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
