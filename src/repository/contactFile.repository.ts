import { autoInjectable } from "tsyringe";
import { Repository } from "typeorm";
import { ContactFile } from "../entity/ContactFile";
import { AppDataSource } from "./db";
import  ContactFileDto from "../entity/DTO/contactFile.dto";

@autoInjectable()
export default class contactFileRepository {
    private repository: Repository<ContactFile>;

    constructor() {
        this.repository = AppDataSource.getRepository(ContactFile)
    }

    async create(contactFile: ContactFileDto) {
       return await this.repository.save({
            ...contactFile
        })
    }

    async get() {
        return await this.repository.find();
    }

    async getById(id: string): Promise<ContactFile | null> {
        return await this.repository.findOneBy({id});
    }

}