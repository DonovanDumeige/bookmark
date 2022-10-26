import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookmarkDTO,
  EditBookmarkDTO,
} from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}
  getBookmarks(userID: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId: userID,
      },
    });
  }

  getBookmarkByID(
    userID: number,
    bookmarkID: number,
  ) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkID,
        userId: userID,
      },
    });
  }

  async createBookmark(
    userID: number,
    dto: CreateBookmarkDTO,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          userId: userID,
          ...dto,
        },
      });

    return bookmark;
  }
  async editBookmarkByID(
    userID: number,
    bookmarkID: number,
    dto: EditBookmarkDTO,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkID,
        },
      });
    if (!bookmarkID || bookmark.userId != userID)
      throw new ForbiddenException(
        'Access to ressource denied',
      );

    return this.prisma.bookmark.update({
      where: {
        id: bookmarkID,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteBookmarkByID(
    userID: number,
    bookmarkID: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkID,
        },
      });
    if (!bookmarkID || bookmark.userId != userID)
      throw new ForbiddenException(
        'Access to ressource denied',
      );

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkID,
      },
    });
  }
}
