import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import {
  CreateBookmarkDTO,
  EditBookmarkDTO,
} from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}
  @Get()
  getBookmarks(@GetUser('id') userID: number) {
    return this.bookmarkService.getBookmarks(
      userID,
    );
  }

  @Get(':id')
  getBookmarkByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) bookmarkID: number,
  ) {
    return this.bookmarkService.getBookmarkByID(
      userID,
      bookmarkID,
    );
  }
  @Post()
  createBookmark(
    @GetUser('id') userID: number,
    @Body() dto: CreateBookmarkDTO,
  ) {
    return this.bookmarkService.createBookmark(
      userID,
      dto,
    );
  }

  @Patch(':id')
  editBookmarkByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) bookmarkID: number,
    @Body() dto: EditBookmarkDTO,
  ) {
    return this.bookmarkService.editBookmarkByID(
      userID,
      bookmarkID,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkByID(
    @GetUser('id') userID: number,
    @Param('id', ParseIntPipe) bookmarkID: number,
  ) {
    return this.bookmarkService.deleteBookmarkByID(
      userID,
      bookmarkID,
    );
  }
}
