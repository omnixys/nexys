import { KcRole } from "../authentication/auth-enum.type";
import {
  ContactOptionsType,
  GenderType,
  InterestType,
  MaritalStatusType,
  PhoneNumberType,
  RelationshipType,
  UserStatusType,
  UserType,
} from "./user-enum-type";

export type User = {
  id: string;
  username: string;
  userType: UserType;
  status: UserStatusType;
  customer: CustomerInfo;
  employee: EmployeeInfo;
  personalInfo: PersonalInfo;
  addresses: Address[];
  contacts: Contact[];
  securityQuestions: SecurityQuestion[];
  role: KcRole;
  createdAt: Date;
  updatedAt: Date;
};

export type EmployeeInfo = {
  id: string;
  department: string;
  position: string;
  role: string;
  salary: string;
  hireDate: Date;
  isExternal: boolean;
};

export type CustomerInfo = {
  id: string;
  tierLevel: number;
  subscribed: boolean;
  interests: InterestType[];
  contactOptions: ContactOptionsType[];
};

export type PersonalInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  maritalStatus: MaritalStatusType;
  phoneNumbers?: PhoneNumber[];
  gender: GenderType;
};

export type Address = {
  id: string;
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  additionalInfo: string;
};

export type Contact = {
  id: string;
  userId: string;
  contactId: string;
  relationship: RelationshipType;
  withdrawalLimit: number;
  emergency: boolean;
  startDate: Date;
  endDate: Date;
};

export type SecurityQuestion = {
  id: string;
  question: string;
  anser: string;
};

export type PhoneNumber = {
  id: string;
  number: string;
  type?: PhoneNumberType;
  isPrimary?: boolean;
};

export type InterestCategory =
  | "banking"
  | "technology"
  | "realEstate"
  | "insurance"
  | "lifestyle"
  | "investments";

export type UserInterest = {
  id: string;
  category: InterestCategory;
};
