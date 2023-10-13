import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Req, Res, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {BooksService} from '../services/books.service';
import {JwtUtilService} from '../../users/services/jwt-util.service';
import {ApiHeader, ApiResponse, ApiTags, getSchemaPath} from '@nestjs/swagger';
import {BookDto} from '../dto/book.dto';
import {ErrorResponseDto} from '../../auth/dto/error-response.dto';
import {Response} from 'express';

@ApiTags('Books')
@Controller('books')
export class BooksController {

    public constructor(
       private bookService: BooksService,
       private jwtUtil: JwtUtilService
    ) {}

    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
    })
    @ApiResponse({
        status: HttpStatus.OK,
        type: BookDto,
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: ErrorResponseDto,
    })
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getBook(
        @Res() response: Response,
        @Param('bookId') bookId: string
    ): Promise<BookDto> {
        const book: BookDto = await this.bookService.getBookById(bookId);

        if(!book) {
            response.status(HttpStatus.BAD_REQUEST).send({message: 'Book not found'});

            return;
        }

        response.status(HttpStatus.OK).send(book)

        return;
    }

    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        type: ErrorResponseDto,
    })
    @UseGuards(JwtAuthGuard)
    @Post('add')
    async add(
        @Res() response: Response,
        @Req() request: Request,
        @Body() book: BookDto
    ): Promise<void> {
        if(!book) {
            response.status(HttpStatus.BAD_REQUEST).send({message: 'Book not send'});

            return;
        }

        const {email}: { email: string; sub: { name: string } } = this.jwtUtil.decode(request);

        if(!email) {
            response.status(HttpStatus.BAD_REQUEST).send({message: 'User not found'});

            return;
        }

        const addedBook: BookDto[] = await this.bookService.add(book, email);

        if(!addedBook) {
            response.status(HttpStatus.BAD_REQUEST).send({message: 'Error adding'})

            return;
        }

        response.status(HttpStatus.OK).send(addedBook)

        return;
    }

    @ApiHeader({
        name: 'Authorization',
        description: 'JWT token',
    })
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
        description: 'No content'
    })
    @ApiResponse({
        status: HttpStatus.BAD_REQUEST,
        schema: {
            $ref: getSchemaPath(ErrorResponseDto),
        },
    })
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(
        @Req() request: Request,
        @Param('id') id: string
    ): Promise<BookDto[]> {
        const json: { email: string; sub: { name: string } } = this.jwtUtil.decode(request);

        const updateBooks: BookDto[] = await this.bookService.removeById(id, json.email);

        return updateBooks;
    }
}