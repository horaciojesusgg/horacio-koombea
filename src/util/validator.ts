import moment from "moment";
import ContactDto from "../entity/DTO/contact.dto";
import CreditCardValidator from "../service/contacts/creditCardValidator.service";

export default class Validator {

    static validateRow(row: string) {
        const values = row.split(',')
        const name = values[0];
        const dob = values[1];
        const phoneNumber = values[2];
        const address = values[3];
        const creditCardNumer = values[4];
        const email = values[5];

        const validationResults = Promise.allSettled([
            this.isValidEmail(email),
            this.isValidName(name),
            this.isValidDoB(dob),
            this.isValidPhoneNumber(phoneNumber),
            this.isValidCCNumber(creditCardNumer),
            this.isValidAddress(address)
        ])
        return validationResults;
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
            creditCardNetwork: '',
            creditCardLastFour: ''
        }
    }

    static isValidCCNumber(value: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const validator = new CreditCardValidator();
          const result = validator.validateCreditCardNumberLength(value);
          if (result.isValid) {
            
          }
          if (value.length !== 0) {
            resolve(true);
          } else {
            reject('Empty CC Number');
          }
        });
      }


    static isValidAddress(value: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          if (value.length !== 0) {
            resolve(true);
          } else {
            reject('Empty Address');
          }
        });
      }

    static isValidName(name: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const regex = /^[a-zA-Z0-9\-]+$/;
          const isValid = regex.test(name);
          if (isValid) {
            resolve(true);
          } else {
            reject('Invalid Name Format');
          }
        });
      }

      static isValidDoB(dob: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const formats = ['YYYYMMDD', 'YYYY-MM-DD'];
          const isIso8601 = moment(dob, formats, true).isValid();
          const isFormat1 = moment(dob, 'YYYYMMDD', true).isValid();
          const isFormat2 = moment(dob, 'YYYY-MM-DD', true).isValid();
      
          if (isIso8601 && (isFormat1 || isFormat2)) {
            resolve(true);
          } else {
            reject('Invalid Date Of Birth');
          }
        });
      }
      
      static isValidPhoneNumber(phoneNumber: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const regex = /^\(\+\d{2}\) \d{3}[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;
          if (regex.test(phoneNumber)) {
            resolve(true);
          } else {
            reject('Invalid Phone Number');
          }
        });
      }
      
      static  isValidEmail(email: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (emailRegex.test(email.trim())) {
            resolve(true);
          } else {
            reject('Invalid Email');
          }
        });
      }
      

}