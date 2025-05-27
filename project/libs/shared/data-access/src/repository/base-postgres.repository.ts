import { PrismaBlogClientService } from '@project/blog-model';
import { Entity, EntityFactory, StorableEntity } from '@project/core';
import { PrismaClientService } from '@project/model';
import { Repository } from './repository.interface';

export abstract class BasePostgresRepository<
  T extends Entity & StorableEntity<ReturnType<T['toPOJO']>>,
  DocumentType = ReturnType<T['toPOJO']>,
> implements Repository<T>
{
  constructor(
    protected entityFactory: EntityFactory<T>,
    protected readonly client: PrismaClientService | PrismaBlogClientService,
  ) {}

  protected createEntityFromDocument(document: DocumentType): T | null {
    if (!document) {
      return null;
    }

    return this.entityFactory.create(document as ReturnType<T['toPOJO']>);
  }

  public async findById(id: T['id']): Promise<T | null> {
    throw new Error('Not implemented');
  }

  public async save(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async update(entity: T): Promise<T> {
    throw new Error('Not implemented');
  }

  public async deleteById(id: T['id']): Promise<void> {
    throw new Error('Not implemented');
  }
}
