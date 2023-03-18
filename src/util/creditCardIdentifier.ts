
const IdentifyCardIssuer = (cardNumber: string) => {
   const cleanedCardNumber = cardNumber.replace(/\D/g, '');
  
   const patterns = {
     visa: /^4/,
     mastercard: /^5[1-5]/,
     amex: /^3[47]/,
     discover: /^6(?:011|5)/,
     dinersclub: /^3(?:0[0-5]|[68][0-9])/,
     jcb: /^(?:2131|1800|35\d{3})/,
   };
 
   for (const [issuer, pattern] of Object.entries(patterns)) {
     if (pattern.test(cleanedCardNumber)) {
       return issuer.toUpperCase();
     }
   }
 
   return null;
}

export default IdentifyCardIssuer;