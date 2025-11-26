import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUserDto: any) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateUserDto: any) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
