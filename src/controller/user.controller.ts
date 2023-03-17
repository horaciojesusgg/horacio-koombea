import { Request, Response } from 'express';
import Controller from '../util/decorator/controller.decorator';
import { Get, Post } from '../util/decorator/handlers.decorator';
import EventBus from '../service/events/eventBus';
import { autoInjectable } from 'tsyringe';

@Controller('/test')
@autoInjectable()
export default class UserController {

    constructor(private eventBus: EventBus) {}

    @Get('')
    list(req: Request, res: Response) {
        return res.json({ contacts:  ['contact 1', 'contact 2']});
    }

    @Post('')
    uploadCsv() {

    }
}