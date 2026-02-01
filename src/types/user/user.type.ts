import { ContactOptionType, InterestType, MaritalStatusType, PhoneNumberType, RelationshipType, UserStatusType, UserType } from "./user-enum-type";

export type User = {
  id: string;
  username: string;
  type: UserType;
  status: UserStatusType;
  customerInfo: CustomerInfo;
  employeeInfo: EmployeeInfo;
  personalInfo: PersonalInfo;
  address: Address[];
  contacts: Contact[]
  securityQuestions: SecurityQuestion[]
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
}

export type CustomerInfo = {
  id: string;
  tierLevel: number;
  subscribed: boolean;
  interests: InterestType[]
  contactOptions: ContactOptionType[]
}

export type PersonalInfo = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  maritalStatus: MaritalStatusType;
  phoneNumbers?: PhoneNumber[];
};

export type Address = {
  id: string
  street: string;
  houseNumber: string;
  zipCode: string;
  city: string;
  state: string;
  country: string;
  additionalInfo: string;
}

export type Contact = {
  id: string;
  userId: string;
  contactId: string;
  relationship: RelationshipType;
  withdrawalLimit: number;
  emergency: boolean;
  startDate: Date;
  endDate: Date;
}

export type SecurityQuestion = {
  id: string;
  question: string;
  anser: string;
}



export type PhoneNumber = {
  id: string;
  number: string;
  type?: PhoneNumberType;
  isPrimary?: boolean;
};
