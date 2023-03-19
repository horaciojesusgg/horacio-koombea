import { EventEmitter } from 'events'
import {autoInjectable} from "tsyringe";
import { User } from '../../entity/User';
import ContactFilesService from '../contactFiles/contactFiles.service';

@autoInjectable()
export default class EventBus {
    private eventBroker: EventEmitter;
    
    constructor(private contactFilesService: ContactFilesService) {
        this.eventBroker = new EventEmitter();
        this.registerEvents();
    }

    private registerEvents() {
        this.eventBroker.on('ProcessContactsFile', (fileId: string, user: User) => {
            this.contactFilesService.processContactFile(fileId, user);
        }) 
    }

    public emit(event: string, args?: any) {
        this.eventBroker.emit(event, ...args);
    }

}