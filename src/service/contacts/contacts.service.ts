import { Multer } from "multer";
import { autoInjectable } from "tsyringe";
import ContactFileStatus from "../../constants/contactFileStatus.enum";
import { ContactFile } from "../../entity/ContactFile";
import ContactDto from "../../entity/DTO/contact.dto";
import { User } from "../../entity/User";
import ContactRepository from "../../repository/contact.repository";
import contactFileRepository from "../../repository/contactFile.repository";
import UserRepository from "../../repository/user.repository";
import CreditCardValidator from "./creditCardValidator.service";
import EncryptionService from "../encryption.service";
import ContactValidator from "./contactValidator.service";

@autoInjectable()
export default class ContactService {

    constructor(private contactFileRepository: contactFileRepository, 
        private contactRepository: ContactRepository,
        private userRepository: UserRepository,
        private cryptoService: EncryptionService,
        private creditCardValidator: CreditCardValidator,
        private contactValidator: ContactValidator
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

    async getAllContactFiles(email: string): Promise<ContactFile[] | undefined> {
        const user = await this.userRepository.getOneByEmail(email);
        if (user) {
            return await this.contactFileRepository.getAll(user);
        }
    }

    async processContactFile(fileId: string, user: User) {
        const file = await this.contactFileRepository.getById(fileId);
        if (!file) return;
        await this.contactFileRepository.patch({...file, status: ContactFileStatus.PROCESSING}, user);
        const csvData = file.content.toString();
        const rows = csvData.split("\n");
        let errors = '';
        for (let index = 1; index < rows.length; index++) {
            const validationResult = await this.contactValidator.validateRow(rows[index]);
            const rejectedResults = validationResult.filter((value) => {
                return value.status === 'rejected';
            });
            if(rejectedResults.length !== 0) {
                const logLine = this.generateErrorLog(rejectedResults as PromiseRejectedResult[], index);
                errors = errors.concat(logLine);
                continue;
            };
            const contact = this.contactValidator.mapRowToJson(rows[index]);
            const existingContact = await this.contactRepository.findByEmail(contact.email, user);
            if (existingContact.length) continue;
            const {creditCardLastFour, creditCard, encryptedCreditCardNumber} = this.handleCreditCard(contact)
            await this.saveContact({
                ...contact,
                creditCardLastFour,
                creditCardNumber: encryptedCreditCardNumber,
                creditCardNetwork: creditCard.network
            }, user);
        }

        await this.contactFileRepository.patch({...file, errors, status: ContactFileStatus.TERMINATED}, user);
    }

    private async saveContact(contact: ContactDto, user: User) {
        await this.contactRepository.create(contact, user);
    }

    private generateErrorLog(results: PromiseRejectedResult[], rowIndex: number) {
        let logLine = `Errors on Row number ${rowIndex + 1}: `;
        for (let result of results) {
            logLine += `${result.reason}, `;
        }
        const result = logLine.trim().substring(0, logLine.length - 2);

        return `${result};`;
    }

    private handleCreditCard(contact: ContactDto) {
        const creditCardLastFour = contact.creditCardNumber.slice(-4);
        const encryptedCreditCardNumber = this.cryptoService.encrypt(contact.creditCardNumber);
        const creditCard = this.creditCardValidator.validateCreditCardNumberLength(contact.creditCardNumber);
        return {
            creditCard, creditCardLastFour, encryptedCreditCardNumber
        }
    }
}