import { ContactOptionType } from "../../types/user/user-enum-type";

export function formatContactOption(opt?: ContactOptionType | null, tUser?: any): string {
  switch (opt) {
    case ContactOptionType.EMAIL:
      return tUser("customer.contactOptions.email");
    case ContactOptionType.PHONE:
      return tUser("customer.contactOptions.phone");
    case ContactOptionType.SMS:
      return tUser("customer.contactOptions.sms");
    case ContactOptionType.WHATSAPP:
      return tUser("customer.contactOptions.whatsapp");
    case ContactOptionType.LETTER:
      return tUser("customer.contactOptions.letter");
    default:
      return "—";
  }
}