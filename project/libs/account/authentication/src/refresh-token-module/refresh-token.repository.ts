import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtToken } from '@project/core';
import { BasePostgresRepository } from '@project/data-access';
import { PrismaClientService } from '@project/model';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshTokenFactory } from './refresh-token.factory';

@Injectable()
export class RefreshTokenRepository extends BasePostgresRepository<
  RefreshTokenEntity,
  JwtToken
> {
  constructor(
    entityFactory: RefreshTokenFactory,
    override readonly client: PrismaClientService,
  ) {
    super(entityFactory, client);
  }

  public async deleteById(id: string): Promise<void> {
    await this.client.token.delete({
      where: {
        id,
      },
    });
  }

  public async findById(id: string): Promise<RefreshTokenEntity | null> {
    const token = await this.client.token.findFirst({
      where: {
        id,
      },
    });

    if (!token) {
      throw new NotFoundException(`Token with id ${id} not found.`);
    }

    return this.createEntityFromDocument(token);
  }

  public async deleteExpiredTokens(): Promise<void> {
    await this.client.token.deleteMany({
      where: {
        expiresIn: {
          lt: new Date(),
        },
      },
    });
  }
}
