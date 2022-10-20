import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // allow the exports to be available to all the modules in our app.
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
