import { DataSource, Repository } from "typeorm";
import { Contact } from "../entity/Contact";
import ContactDto from "../entity/DTO/contact.dto";
import { AppDataSource } from "./db";

export default class ContactRepository {
    private repository: Repository<Contact>;

    constructor() {
        this.repository = AppDataSource.getRepository(Contact)
    }

    async create(contact: ContactDto) {
       await this.repository.create({
            ...contact
        })
    }


}