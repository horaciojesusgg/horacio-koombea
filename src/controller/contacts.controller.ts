import ContactService from '../service/contacts/contacts.service';
import authMiddleware from '../util/middleware/auth.middleware';
import EventBus from '../service/events/eventBus';
import Controller from '../util/decorator/controller.decorator';
import { Response } from 'express';
import { Get, Post } from '../util/decorator/handlers.decorator';
import { autoInjectable } from 'tsyringe';
import AuthRequest from '../util/middleware/authRequest.interface';
import UserRepository from '../repository/user.repository';
import ContactFilesService from '../service/contactFiles/contactFiles.service';


@Controller('/contacts')
@autoInjectable()
export default class ContactsController {

    constructor(
        private eventBus: EventBus,
        private contactService: ContactService,
        private userRepo: UserRepository,
        private contactFilesService: ContactFilesService
        ) {}

    @Get('')
    @authMiddleware()
    async list(req: AuthRequest, res: Response) {
        const user = await this.userRepo.getOneByEmail(req.user.email);
        if (user) {
            const contacts = await this.contactService.getAllContacts(user);
            return res.json({ contacts });
        }
        return res.send('User Not Found');

    }

    @Post('/file')
    @authMiddleware()
    async uploadCsv(req: AuthRequest, res: Response) {
        if(req.file) {
            const user = await this.userRepo.getOneByEmail(req.user.email);
            if (!user) return res.send('User Not Found');
            const savedFile = await this.contactService.saveContactFile(req.file, user);
            if (savedFile) {
                this.eventBus.emit('ProcessContactsFile', [savedFile.id, user])
                return res.send('File Uploaded succesfully');
            }
           
            return res.send('File was NOT saved. Please try again later.');
        }
    }

    @Get('/files')
    @authMiddleware()
    async getFilesList(req: AuthRequest, res: Response) {
        const files = await this.contactFilesService.getAllContactFiles(req.user.email);
        return res.json({files})
    }
}