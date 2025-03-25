import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  root(@Res() res: Response) {
    res.render('index', { title: 'Welcome to Zuzu!' }); // Pass data if needed
  }
}
