import { Multer } from "multer";
import { autoInjectable } from "tsyringe";
import { Contact } from "../../entity/Contact";
import { ContactFile } from "../../entity/ContactFile";
import ContactDto from "../../entity/DTO/contact.dto";
import { User } from "../../entity/User";
import ContactRepository from "../../repository/contact.repository";
import contactFileRepository from "../../repository/contactFile.repository";
import UserRepository from "../../repository/user.repository";
import IdentifyCardIssuer from "../../util/creditCardIdentifier";
import Validator from "../../util/validator";
@autoInjectable()
export default class ContactService {

    constructor(private contactFileRepository: contactFileRepository, 
        private contactRepository: ContactRepository,
        private userRepository: UserRepository
        ) { }

    async getAllContacts(user: User) {
        return this.contactRepository.getAll(user);
    }

    async saveContactFile(file: Express.Multer.File, user: User) {
        if(!user) return;
        const savedFile = await this.contactFileRepository.create({
            fileName: file.originalname,
            content: file.buffer,
            mimetype: file.mimetype,
            size: file.size,
            status: 'new',
        }, user);

        return savedFile;
    }

    async getAllContactFiles(email: string): Promise<ContactFile[] | undefined> {
        const user = await this.userRepository.getOneByEmail(email);
        if (user) {
            return await this.contactFileRepository.getAll(user);
        }
    }

    async processContactFile(fileId: string, user: User) {
        const file = await this.contactFileRepository.getById(fileId);
        if (!file) return;
        const csvData = file.content.toString();

        const rows = csvData.split("\n");
        for (let index = 1; index < rows.length; index++) {
            if(!Validator.isRowValid(rows[index])) {
                console.log('Invalid values on row ' + index);
                continue;
            };
            const contact = Validator.mapRowToJson(rows[index]);
            const existingContact = await this.contactRepository.findByEmail(contact.email);
            if (existingContact) continue;
            const creditCardNetwork = IdentifyCardIssuer(contact.creditCardNumber) || '';
            await this.saveContact({
                ...contact,
                creditCardNetwork
            }, user);
        }
    }

    private async saveContact(contact: ContactDto, user: User) {
        await this.contactRepository.create(contact, user);
    }
}