import moment from "moment";
import ContactDto from "../entity/DTO/contact.dto";

export default class Validator {

    static isRowValid(row: string) {
        const values = row.split(',')
        const name = values[0];
        const dob = values[1];
        const phoneNumber = values[2];
        const address = values[3];
        const creditCardNumer = values[4];
        const email = values[5];

        return (this.isValidName(name)
        && this.isValidDoB(dob) 
        && this.isValidPhoneNumber(phoneNumber) 
        && this.isValidEmail(email)
        && creditCardNumer
        && address);


    }

    static mapRowToJson(row: string): ContactDto {
        const values = row.split(',')
        return {
            name: values[0],
            dateOfBirth: new Date(values[1]),
            phone: values[2],
            address: values[3],
            creditCardNumber: values[4],
            email: values[5],
            creditCardNetwork: ''
        }
    }

    static isValidName(name: string) {
        const regex = /^[a-zA-Z0-9\-]+$/;
        return regex.test(name);
    }

    static isValidDoB(dob: string) {
        const formats = ['YYYYMMDD', 'YYYY-MM-DD'];
        const isIso8601 = moment(dob, formats, true).isValid();
        const isFormat1 = moment(dob, 'YYYYMMDD', true).isValid();
        const isFormat2 = moment(dob, 'YYYY-MM-DD', true).isValid();
        return isIso8601 && (isFormat1 || isFormat2);
    }

    static isValidPhoneNumber(phoneNumber: string): boolean {
        const regex = /^\(\+\d{2}\) \d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
        return regex.test(phoneNumber);
      }

    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

}