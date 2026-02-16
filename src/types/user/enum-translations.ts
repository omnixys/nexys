import type { UserTranslationKey } from "@/i18n/keys";
import {
  ContactOptionsType,
  GenderType,
  InterestType,
  MaritalStatusType,
  PhoneNumberType,
  RelationshipType,
  UserRole,
  UserStatusType,
  UserType,
} from "@/types/user/user-enum-type";
import { KcRole } from "../authentication/auth-enum.type";
import { InterestCategory } from "./user.type";

export const USER_TYPE_I18N = {
  CUSTOMER: "type.customer",
  EMPLOYEE: "type.employee",
  GUEST: "type.guest",
} satisfies Record<UserType, UserTranslationKey>;

export const USER_ROLE_I18N = {
  ADMIN: "role.admin",
  SECURITY: "role.security",
  USER: "role.user",
  GUEST: "role.guest",
} satisfies Record<UserRole, UserTranslationKey>;

export const USER_CUSTOMER_TIER_I18N = {
  SUPREME: "customer.tiers.supreme",
  ELITE: "customer.tiers.elite",
  BASIC: "customer.tiers.basic",
  ADMIN: "employee.values.admin",
} satisfies Record<KcRole, UserTranslationKey>;

export const USER_STATUS_I18N = {
  ACTIVE: "status.active",
  DISABLED: "status.disabled",
  DELETED: "status.deleted",
  INACTIVE: "status.inactive",
  BLOCKED: "status.blocked",
  CLOSED: "status.closed",
} satisfies Record<UserStatusType, UserTranslationKey>;

export const USER_CUSTOMER_CONTACT_OPTION_I18N = {
  EMAIL: "customer.contactOption.email",
  PHONE: "customer.contactOption.phone",
  SMS: "customer.contactOption.sms",
  WHATSAPP: "customer.contactOption.whatsapp",
  LETTER: "customer.contactOption.letter",
} satisfies Record<ContactOptionsType, UserTranslationKey>;

  export const GENDER_I18N = {
    MALE: "personal.gender.male",
    FEMALE: "personal.gender.female",
    OTHER: "personal.gender.other",
  } satisfies Record<GenderType, UserTranslationKey>;
  
export const MARITAL_STATUS_I18N = {
  SINGLE: "personal.maritalStatus.single",
  MARRIED: "personal.maritalStatus.married",
  DIVORCED: "personal.maritalStatus.divorced",
  WIDOWED: "personal.maritalStatus.widowed",
} satisfies Record<MaritalStatusType, UserTranslationKey>;

export const PHONE_NUMBER_TYPE_I18N = {
  WHATSAPP: "personal.phoneType.whatsapp",
  MOBILE: "personal.phoneType.mobile",
  PRIVATE: "personal.phoneType.private",
  WORK: "personal.phoneType.work",
  HOME: "personal.phoneType.home",
  OTHER: "personal.phoneType.other",
} satisfies Record<PhoneNumberType, UserTranslationKey>;

/** InterestType → i18n key (interest.*) */
export const INTEREST_I18N_KEY = {
  SPORTS: "customer.interest.sports",
  MUSIC: "customer.interest.music",
  TRAVEL: "customer.interest.travel",
  TECHNOLOGY: "customer.interest.technology",
  TECHNOLOGY_AND_INNOVATION: "customer.interest.technologyAndInnovation",
  INVESTMENTS: "customer.interest.investments",
  SAVING_AND_FINANCE: "customer.interest.savingAndFinance",
  CREDIT_AND_DEBT: "customer.interest.creditAndDebt",
  REAL_ESTATE: "customer.interest.realEstate",
  INSURANCE: "customer.interest.insurance",
  SUSTAINABLE_FINANCE: "customer.interest.sustainableFinance",
  BANK_PRODUCTS_AND_SERVICES: "customer.interest.bankProductsAndServices",
} satisfies Record<InterestType, UserTranslationKey>;

export const CATEGORY_I18N_KEY = {
  banking: "customer.interestCategory.banking",
  technology: "customer.interestCategory.technology",
  realEstate: "customer.interestCategory.realEstate",
  insurance: "customer.interestCategory.insurance",
  investments: "customer.interestCategory.investments",
  lifestyle: "customer.interestCategory.lifestyle",
} satisfies Record<InterestCategory, UserTranslationKey>;

export const RELATIONSHIP_I18N_KEY= {
  FAMILY: "customer.contacts.relationship.family",
  FRIEND: "customer.contacts.relationship.friend",
  PARTNER: "customer.contacts.relationship.partner",
  COLLEAGUE: "customer.contacts.relationship.colleague",
  BUSINESS_PARTNER: "customer.contacts.relationship.businessPartner",
  RELATIVE: "customer.contacts.relationship.relative",
  PARENT: "customer.contacts.relationship.parent",
  SIBLING: "customer.contacts.relationship.sibling",
  CHILD: "customer.contacts.relationship.child",
  COUSIN: "customer.contacts.relationship.cousin",
  OTHER: "customer.contacts.relationship.other",
} satisfies Record<RelationshipType, UserTranslationKey>;