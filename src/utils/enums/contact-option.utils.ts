import { ContactOptionsType } from "../../types/user/user-enum-type";

export function formatContactOption(
  opt?: ContactOptionsType | null,
  tUser?: any,
): string {
  switch (opt) {
    case ContactOptionsType.EMAIL:
      return tUser("customer.contactOptions.email");
    case ContactOptionsType.PHONE:
      return tUser("customer.contactOptions.phone");
    case ContactOptionsType.SMS:
      return tUser("customer.contactOptions.sms");
    case ContactOptionsType.WHATSAPP:
      return tUser("customer.contactOptions.whatsapp");
    case ContactOptionsType.LETTER:
      return tUser("customer.contactOptions.letter");
    default:
      return "—";
  }
}
