import { autoInjectable } from "tsyringe";
import { Repository } from "typeorm";
import { ContactFile } from "../entity/ContactFile";
import { AppDataSource } from "./db";
import  ContactFileDto from "../entity/DTO/contactFile.dto";
import { User } from "../entity/User";

@autoInjectable()
export default class contactFileRepository {
    private repository: Repository<ContactFile>;

    constructor() {
        this.repository = AppDataSource.getRepository(ContactFile)
    }

    async save(contactFile: ContactFileDto, user: User) {
       return await this.repository.save({
            ...contactFile,
            user
        })
    }

    async patch(contactFile: ContactFile, user: User) {
        return await this.repository.save({
             ...contactFile,
             user
         })
     }

    async getAll(user: User) {
        return await this.repository.findBy({userId: user.id});
    }

    async getById(id: string): Promise<ContactFile | null> {
        return await this.repository.findOneBy({id});
    }
}