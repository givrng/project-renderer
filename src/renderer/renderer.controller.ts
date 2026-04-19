import { Body, Controller, Post, Res } from '@nestjs/common';
import { RendererService } from './renderer.service';
import type { createProjectDto } from './dto/createProjectDto';
import type { Response } from 'express';

@Controller('render')
export class RendererController {

    constructor(private readonly rendererService: RendererService){}

    @Post("project")
    async renderProject(@Body() payload: createProjectDto, @Res() res: Response){

        const image = await this.rendererService.renderProject(payload);

        console.log (res);

        res.set({
            "Content-Type": "image/png", 
            "Content-Length": image.length
        })
      
        res.send(image);
    }
}
