import { Request, Response } from 'express';
import Controller from '../util/decorator/controller.decorator';
import { Get, Post } from '../util/decorator/handlers.decorator';
import EventBus from '../service/events/eventBus';
import { autoInjectable } from 'tsyringe';
import ContactService from '../service/contacts/contacts.service';


@Controller('/contacts')
@autoInjectable()
export default class ContactsController {

    constructor(private eventBus: EventBus, private contactService: ContactService) {}

    @Get('')
    async list(req: Request, res: Response) {
        this.eventBus.emit('ProcessContactsFile');
        return res.json({ contacts:  ['contact 1', 'contact 2']});
    }

    @Post('/file')
    async uploadCsv(req: Request, res: Response) {
        if(req.file) {
            const savedFile = await this.contactService.saveContactFile(req.file);
            this.eventBus.emit('ProcessContactsFile', savedFile.id)

        }
        return res.send('File Uploaded succesfully');
    }

    @Get('/files')
    async getFilesList(req: Request, res: Response) {
        const files = await this.contactService.getAllContactFiles();
        return res.json({files})
    }
}