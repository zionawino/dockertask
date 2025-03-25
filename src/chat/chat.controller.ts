// ./src/chat/chat.controller.ts

import { Controller, Post, Res, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Response } from 'express'; // Import the Response type

@Controller('message')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    postMessage(@Res() res: Response, @Body() data: { user: string; message: string }) {
        this.chatService.addMessage(data);

        // Returning a JSON response
        return res.status(HttpStatus.OK).json({
            message: 'Comment posted successfully',
            data: data,
        });
    }
}
