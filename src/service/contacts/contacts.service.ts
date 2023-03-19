import { autoInjectable } from "tsyringe";
import ContactFileStatus from "../../constants/contactFileStatus.enum";
import ContactDto from "../../entity/DTO/contact.dto";
import { User } from "../../entity/User";
import ContactRepository from "../../repository/contact.repository";
import contactFileRepository from "../../repository/contactFile.repository";

@autoInjectable()
export default class ContactService {

    constructor(private contactFileRepository: contactFileRepository, 
        private contactRepository: ContactRepository,
        ) { }

    async getAllContacts(user: User) {
        return this.contactRepository.getAll(user);
    }

    async saveContactFile(file: Express.Multer.File, user: User) {
        if(!user) return;
        const savedFile = await this.contactFileRepository.save({
            fileName: file.originalname,
            content: file.buffer,
            mimetype: file.mimetype,
            size: file.size,
            status: ContactFileStatus.ON_HOLD,
        }, user);

        return savedFile;
    }   

    async saveContact(contact: ContactDto, user: User) {
        await this.contactRepository.create(contact, user);
    }
}