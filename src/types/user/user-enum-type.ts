// -------------------------
// Core identity enums
// -------------------------

export enum UserType {
  CUSTOMER = "CUSTOMER",
  EMPLOYEE = "EMPLOYEE",
  GUEST = "GUEST",
}

export enum UserRole {
  ADMIN = "ADMIN",
  SECURITY = "SECURITY",
  USER = "USER",
  GUEST = "GUEST",
}

export enum UserStatusType {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
  DELETED = "DELETED",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
  CLOSED = "CLOSED",
}

// -------------------------
// Personal enums
// -------------------------

export enum MaritalStatusType {
  SINGLE = "SINGLE",
  MARRIED = "MARRIED",
  DIVORCED = "DIVORCED",
  WIDOWED = "WIDOWED",
}

export enum PhoneNumberType {
  WHATSAPP = "WHATSAPP",
  MOBILE = "MOBILE",
  PRIVATE = "PRIVATE",
  WORK = "WORK",
  HOME = "HOME",
  OTHER = "OTHER",
}

// -------------------------
// Customer / Contact enums
// -------------------------

export enum RelationshipType {
  FAMILY = "FAMILY",
  FRIEND = "FRIEND",
  PARTNER = "PARTNER",
  COLLEAGUE = "COLLEAGUE",
  BUSINESS_PARTNER = "BUSINESS_PARTNER",
  RELATIVE = "RELATIVE",
  PARENT = "PARENT",
  SIBLING = "SIBLING",
  CHILD = "CHILD",
  COUSIN = "COUSIN",
  OTHER = "OTHER",
}

export enum InterestType {
  SPORTS = "SPORTS",
  MUSIC = "MUSIC",
  TRAVEL = "TRAVEL",
  TECHNOLOGY = "TECHNOLOGY",
  INVESTMENTS = "INVESTMENTS",
  SAVING_AND_FINANCE = "SAVING_AND_FINANCE",
  CREDIT_AND_DEBT = "CREDIT_AND_DEBT",
  REAL_ESTATE = "REAL_ESTATE",
  INSURANCE = "INSURANCE",
  SUSTAINABLE_FINANCE = "SUSTAINABLE_FINANCE",
  TECHNOLOGY_AND_INNOVATION = "TECHNOLOGY_AND_INNOVATION",
  BANK_PRODUCTS_AND_SERVICES = "BANK_PRODUCTS_AND_SERVICES",
}

export enum ContactOptionsType {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  SMS = "SMS",
  WHATSAPP = "WHATSAPP",
  LETTER = "LETTER",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
  DIVERSE = "DIVERSE",
  UNKNOWN = "UNKNOWN",
}
