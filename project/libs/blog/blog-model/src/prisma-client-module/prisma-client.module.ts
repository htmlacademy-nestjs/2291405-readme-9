import { Global, Module } from '@nestjs/common';
import { PrismaBlogClientService } from './prisma-client.service';

@Global()
@Module({
  providers: [PrismaBlogClientService],
  exports: [PrismaBlogClientService],
})
export class PrismaBlogClientModule {}
