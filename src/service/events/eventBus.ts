import { EventEmitter } from 'events'
import {autoInjectable} from "tsyringe";
import ContactService from '../contacts/contacts.service';

@autoInjectable()
export default class EventBus {
    private eventBroker: EventEmitter;
    
    constructor(private contactService: ContactService) {
        this.eventBroker = new EventEmitter();
        this.registerEvents();
    }

    private registerEvents() {
        this.eventBroker.on('ProcessContactsFile', (fileId: string) => {
            console.log('PROCESS EVENT, ', fileId)
            this.contactService.processContactFile(fileId);
        }) 
    }

    public emit(event: string, args?: any) {
        this.eventBroker.emit(event, args);
    }

}