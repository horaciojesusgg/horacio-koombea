import { Multer } from "multer";
import { autoInjectable } from "tsyringe";
import { Contact } from "../../entity/Contact";
import { ContactFile } from "../../entity/ContactFile";
import contactFileRepository from "../../repository/contactFile.repository";
import Validator from "../../util/validator";
@autoInjectable()
export default class ContactService {

    constructor(private contactFileRepository: contactFileRepository) { }

    async saveContactFile(file: Express.Multer.File) {
        const savedFile = await this.contactFileRepository.create({
            fileName: file.originalname,
            content: file.buffer,
            mimetype: file.mimetype,
            size: file.size,
            status: 'new',
        });

        return savedFile;
    }

    async getAllContactFiles(): Promise<ContactFile[]> {
        return await this.contactFileRepository.get();
    }

    async processContactFile(fileId: string) {
        console.log('START PROCESSING FILE');
        const file = await this.contactFileRepository.getById(fileId);
        if (!file) return;
        const csvData = file.content.toString();
        // Parse the CSV data using `csv-parser`

        const rows = csvData.split("\n");
        const columNames = rows.shift();
        for (let index = 0; index < rows.length; index++) {
            if(!Validator.isRowValid(rows[index])) {
                console.log('Invalid values on row ' + index);
                continue;
            };
        }
    }



    

}