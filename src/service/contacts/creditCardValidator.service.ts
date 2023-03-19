interface CreditCard {
    name: string;
    pattern: RegExp;
    validLengths: number[];
}

interface CreditCardResult {
    isValid: boolean,
    network: string
}

  export default class CreditCardValidator {
    private creditCards: CreditCard[] = [
        {
          name: "Visa",
          pattern: /^4/,
          validLengths: [13, 16],
        },
        {
          name: "Mastercard",
          pattern: /^5[1-5]/,
          validLengths: [16],
        },
        {
          name: "Amex",
          pattern: /^3[47]/,
          validLengths: [15],
        },
        {
          name: "Discover",
          pattern: /^6(?:011|5)/,
          validLengths: [16],
        },
        {
          name: "Diners Club",
          pattern: /^3(?:0[0-5]|[68][0-9])/,
          validLengths: [14],
        },
        {
          name: "JCB",
          pattern: /^35(?:2[89]|[3-8][0-9])/,
          validLengths: [16],
        },
      ];
      
        public validateCreditCardNumberLength(creditCardNumber: string): CreditCardResult  {
        const creditCard = this.creditCards.find((c) => c.pattern.test(creditCardNumber));
        const isValid = !creditCard || !creditCard.validLengths.includes(creditCardNumber.length)
        if (!creditCard) {
          return {isValid: false, network: 'None'};
        }
        if (!creditCard.validLengths.includes(creditCardNumber.length)) {
            return {isValid: false, network: creditCard.name};
          }
        return {isValid: true , network: creditCard.name};
      }
  }
  