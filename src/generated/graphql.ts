import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
};

export type AddContactInput = {
  Contact: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type AddSecurityQuestionInput = {
  answer: Scalars['String']['input'];
  questionId: Scalars['ID']['input'];
};

export type AddressAutocompletePayload = {
  __typename?: 'AddressAutocompletePayload';
  city?: Maybe<Scalars['String']['output']>;
  confidence?: Maybe<Scalars['Float']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  formatted?: Maybe<Scalars['String']['output']>;
  houseNumber?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type AddressValidationInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  houseNumber: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type AddressValidationPayload = {
  __typename?: 'AddressValidationPayload';
  confidence?: Maybe<Scalars['Float']['output']>;
  formatted?: Maybe<Scalars['String']['output']>;
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  reason: Scalars['String']['output'];
  valid: Scalars['Boolean']['output'];
};

export type AdminSignUpInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumbers?: InputMaybe<Array<PhoneNumberInput>>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type CallingCode = {
  __typename?: 'CallingCode';
  code: Scalars['String']['output'];
  countries: Array<Country>;
  id: Scalars['ID']['output'];
};

export type ChangeMyPasswordInput = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};

export enum Channel {
  Email = 'EMAIL',
  InApp = 'IN_APP',
  Push = 'PUSH',
  Sms = 'SMS',
  Whatsapp = 'WHATSAPP'
}

/**
 * =====================================================
 * CITY
 * =====================================================
 */
export type City = {
  __typename?: 'City';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  level?: Maybe<Scalars['Int']['output']>;
  location?: Maybe<GeoPoint>;
  name: Scalars['String']['output'];
  parent?: Maybe<City>;
  population?: Maybe<Scalars['Int']['output']>;
  postalCodes?: Maybe<Array<PostalCode>>;
  state: State;
  timezone?: Maybe<Timezone>;
  type?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['String']['output'];
};

export type CityFilterInput = {
  maxPopulation?: InputMaybe<Scalars['Int']['input']>;
  minPopulation?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  stateId?: InputMaybe<Scalars['ID']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type CompleteResetInputGql = {
  newPassword: Scalars['String']['input'];
  token: Scalars['String']['input'];
};

export type ContactInput = {
  contactId: Scalars['String']['input'];
  emergency?: InputMaybe<Scalars['Boolean']['input']>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  relationship: RelationshipType;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  withdrawalLimit?: InputMaybe<Scalars['Float']['input']>;
};

/** Defines preferred communication channels for a user. */
export enum ContactOptionsType {
  Email = 'EMAIL',
  Letter = 'LETTER',
  Phone = 'PHONE',
  Sms = 'SMS',
  Whatsapp = 'WHATSAPP'
}

export type ContactPayload = {
  __typename?: 'ContactPayload';
  contactId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  emergency: Scalars['Boolean']['output'];
  endDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  relationship: RelationshipType;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
  withdrawalLimit: Scalars['Float']['output'];
};

export enum ContentFormat {
  Html = 'HTML',
  Markdown = 'MARKDOWN',
  Text = 'TEXT'
}

export type Continent = {
  __typename?: 'Continent';
  code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  subregion: Array<Subregion>;
};

/**
 * =====================================================
 * COUNTRY
 * =====================================================
 */
export type Country = {
  __typename?: 'Country';
  areaSqKm?: Maybe<Scalars['Float']['output']>;
  callingCode?: Maybe<CallingCode>;
  continent: Continent;
  currency?: Maybe<Currency>;
  flagPng?: Maybe<Scalars['String']['output']>;
  flagSvg?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  iso2: Scalars['String']['output'];
  iso3: Scalars['String']['output'];
  languages: Array<Language>;
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  nationality?: Maybe<Scalars['String']['output']>;
  numericCode?: Maybe<Scalars['String']['output']>;
  population?: Maybe<Scalars['Int']['output']>;
  subregion: Subregion;
  timezones: Array<Timezone>;
  tld?: Maybe<Scalars['String']['output']>;
};

/**
 * =====================================================
 * FILTER INPUT
 * =====================================================
 */
export type CountryFilterInput = {
  callingCode?: InputMaybe<Scalars['String']['input']>;
  continent?: InputMaybe<Scalars['String']['input']>;
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subregion?: InputMaybe<Scalars['String']['input']>;
};

export type CreateNotificationInput = {
  channel: Channel;
  dedupeKey?: InputMaybe<Scalars['String']['input']>;
  expiresAt?: InputMaybe<Scalars['DateTime']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  priority?: InputMaybe<Priority>;
  recipientAddress?: InputMaybe<Scalars['String']['input']>;
  recipientId?: InputMaybe<Scalars['String']['input']>;
  recipientUsername: Scalars['String']['input'];
  sensitive?: InputMaybe<Scalars['Boolean']['input']>;
  templateId?: InputMaybe<Scalars['String']['input']>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  variables?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateTemplateInput = {
  body: Scalars['String']['input'];
  channel?: Channel;
  format: ContentFormat;
  key: Scalars['String']['input'];
  locale?: Scalars['String']['input'];
  subject?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  tenantId?: InputMaybe<Scalars['String']['input']>;
  variables: Array<Scalars['String']['input']>;
};

export type CreateUserInput = {
  acceptedTerms: Scalars['Boolean']['input'];
  acceptedTermsAt: Scalars['DateTime']['input'];
  addresses: Array<UserAddressInput>;
  contacts?: InputMaybe<Array<ContactInput>>;
  customer?: InputMaybe<CustomerInput>;
  employee?: InputMaybe<EmployeeInput>;
  password: Scalars['String']['input'];
  personalInfo: PersonalInfoInput;
  phoneNumbers?: InputMaybe<Array<PhoneNumberInput>>;
  securityQuestions?: InputMaybe<Array<AddSecurityQuestionInput>>;
  userType: UserType;
  username: Scalars['String']['input'];
};

export type Currency = {
  __typename?: 'Currency';
  code: Scalars['String']['output'];
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type CustomerInput = {
  contactOptions: Array<ContactOptionsType>;
  interestIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  state?: InputMaybe<StatusType>;
  subscribed: Scalars['Boolean']['input'];
};

export type CustomerInterestPayload = {
  __typename?: 'CustomerInterestPayload';
  createdAt: Scalars['DateTime']['output'];
  customerId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  interest?: Maybe<InterestPayload>;
  interestId: Scalars['ID']['output'];
  isPrimary?: Maybe<Scalars['Boolean']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
};

export type CustomerPayload = {
  __typename?: 'CustomerPayload';
  contactOptions: Array<ContactOptionsType>;
  createdAt: Scalars['DateTime']['output'];
  customerInterest?: Maybe<Array<CustomerInterestPayload>>;
  id: Scalars['ID']['output'];
  state: StatusType;
  subscribed: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type EmployeeInput = {
  department?: InputMaybe<Scalars['String']['input']>;
  hireDate?: InputMaybe<Scalars['DateTime']['input']>;
  isExternal: Scalars['Boolean']['input'];
  position?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  salary?: InputMaybe<Scalars['Float']['input']>;
};

export type EmployeePayload = {
  __typename?: 'EmployeePayload';
  createdAt: Scalars['DateTime']['output'];
  department?: Maybe<Scalars['String']['output']>;
  hireDate?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  isExternal: Scalars['Boolean']['output'];
  position?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  salary?: Maybe<Scalars['Float']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

/** Specifies the gender of a person. */
export enum GenderType {
  Diverse = 'DIVERSE',
  Female = 'FEMALE',
  Male = 'MALE',
  Unknown = 'UNKNOWN'
}

/**
 * -----------------------------------
 * Supporting Types
 * -----------------------------------
 */
export type GeoPoint = {
  __typename?: 'GeoPoint';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

export type InterestCategoryPayload = {
  __typename?: 'InterestCategoryPayload';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  interests?: Maybe<Array<InterestPayload>>;
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type InterestPayload = {
  __typename?: 'InterestPayload';
  categoryId: Scalars['ID']['output'];
  createdAt: Scalars['DateTime']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type KcUser = {
  __typename?: 'KcUser';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  roles?: Maybe<Array<RealmRole>>;
  username: Scalars['String']['output'];
};

export type Language = {
  __typename?: 'Language';
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  iso2: Scalars['String']['output'];
  iso3: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type LogInInput = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LoginTotpInput = {
  code: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

/** Specifies the marital status of a person. */
export enum MaritalStatusType {
  Divorced = 'DIVORCED',
  Married = 'MARRIED',
  Single = 'SINGLE',
  Widowed = 'WIDOWED'
}

export enum MfaPreference {
  BackupCodes = 'BACKUP_CODES',
  None = 'NONE',
  SecurityQuestions = 'SECURITY_QUESTIONS',
  Totp = 'TOTP',
  Webauthn = 'WEBAUTHN'
}

export type Mutation = {
  __typename?: 'Mutation';
  DEBUG_createSignupVerification: Scalars['String']['output'];
  DEBUG_verifySignUp: SignUpPayload;
  addContact: Scalars['Boolean']['output'];
  addPhoneNumbers: Scalars['Boolean']['output'];
  adminChangePassword: Scalars['Boolean']['output'];
  adminSignUp: TokenPayload;
  adminUpdateUser: Scalars['Boolean']['output'];
  archiveNotification: NotificationPayload;
  assignRealmRole: Scalars['Boolean']['output'];
  cancelNotification: NotificationPayload;
  changeMyPassword: SuccessPayload;
  completePasswordReset: Scalars['Boolean']['output'];
  confirmTotp: Scalars['Boolean']['output'];
  createNotification: NotificationPayload;
  createSignupVerification: Scalars['Boolean']['output'];
  createTemplate: TemplatePayload;
  createUser: UserPayload;
  credentialsLogin: TokenPayload;
  deleteKcUser: Scalars['Boolean']['output'];
  deleteNotification: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  enableTotp: TotpSetupPayload;
  generatePasswordlessOptions: Scalars['JSON']['output'];
  generateWebAuthnAuthOptions: Scalars['JSON']['output'];
  generateWebAuthnAuthOptions2: Scalars['JSON']['output'];
  generateWebAuthnRegistrationOptions: Scalars['JSON']['output'];
  loginTotp: TokenPayload;
  logout: SuccessPayload;
  markNotificationAsRead: NotificationPayload;
  markNotificationAsUnread: NotificationPayload;
  refresh: TokenPayload;
  regenerateBackupCodes: Array<Scalars['String']['output']>;
  removeContact: Scalars['Boolean']['output'];
  removePhoneNumbers: Scalars['Boolean']['output'];
  removeRealmRole: Scalars['Boolean']['output'];
  renameWebAuthnCredential: Scalars['Boolean']['output'];
  requestPasswordReset: Scalars['Boolean']['output'];
  revokeWebAuthnCredential: Scalars['Boolean']['output'];
  sendMagicLink: Scalars['Boolean']['output'];
  setMfaPreference: Scalars['Boolean']['output'];
  unarchiveNotification: NotificationPayload;
  updateMe: UserPayload;
  updateMyProfile: SuccessPayload;
  updateTemplate: TemplatePayload;
  updateUser: UserPayload;
  userSignUp: TokenPayload;
  verifyMagicLink: TokenPayload;
  verifyPasswordResetStepUp: Scalars['Boolean']['output'];
  verifyPasswordResetToken: ResetVerificationPayload;
  verifyPasswordlessAuthentication: TokenPayload;
  verifySignUp: Scalars['String']['output'];
  verifyWebAuthnAuthentication: TokenPayload;
  verifyWebAuthnAuthentication2: Scalars['Boolean']['output'];
  verifyWebAuthnRegistration: Scalars['Boolean']['output'];
};


export type MutationDebug_CreateSignupVerificationArgs = {
  createUserInput: CreateUserInput;
};


export type MutationDebug_VerifySignUpArgs = {
  token: Scalars['String']['input'];
};


export type MutationAddContactArgs = {
  contact: AddContactInput;
};


export type MutationAddPhoneNumbersArgs = {
  phoneNumbers: Array<PhoneNumberInput>;
};


export type MutationAdminChangePasswordArgs = {
  input: UpdateUserPasswordInput;
};


export type MutationAdminSignUpArgs = {
  input: AdminSignUpInput;
};


export type MutationAdminUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateKcUserInput;
};


export type MutationArchiveNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationAssignRealmRoleArgs = {
  id: Scalars['ID']['input'];
  roleName: RealmRole;
};


export type MutationCancelNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationChangeMyPasswordArgs = {
  input: ChangeMyPasswordInput;
};


export type MutationCompletePasswordResetArgs = {
  input: CompleteResetInputGql;
};


export type MutationConfirmTotpArgs = {
  code: Scalars['String']['input'];
};


export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput;
};


export type MutationCreateSignupVerificationArgs = {
  createUserInput: CreateUserInput;
};


export type MutationCreateTemplateArgs = {
  input: CreateTemplateInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCredentialsLoginArgs = {
  input: LogInInput;
};


export type MutationDeleteKcUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationGeneratePasswordlessOptionsArgs = {
  email: Scalars['String']['input'];
};


export type MutationLoginTotpArgs = {
  input: LoginTotpInput;
};


export type MutationMarkNotificationAsReadArgs = {
  id: Scalars['String']['input'];
};


export type MutationMarkNotificationAsUnreadArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveContactArgs = {
  contactId: Scalars['ID']['input'];
};


export type MutationRemovePhoneNumbersArgs = {
  phoneNumberIds: Array<Scalars['ID']['input']>;
};


export type MutationRemoveRealmRoleArgs = {
  id: Scalars['ID']['input'];
  roleName: RealmRole;
};


export type MutationRenameWebAuthnCredentialArgs = {
  credentialId: Scalars['String']['input'];
  nickname: Scalars['String']['input'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String']['input'];
};


export type MutationRevokeWebAuthnCredentialArgs = {
  credentialId: Scalars['String']['input'];
};


export type MutationSendMagicLinkArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetMfaPreferenceArgs = {
  method: MfaPreference;
};


export type MutationUnarchiveNotificationArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUpdateMyProfileArgs = {
  input: UpdateMyProfileInput;
};


export type MutationUpdateTemplateArgs = {
  input: UpdateTemplateInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


export type MutationUserSignUpArgs = {
  input: UserSignUpInput;
};


export type MutationVerifyMagicLinkArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyPasswordResetStepUpArgs = {
  input: StepUpVerificationInputGql;
};


export type MutationVerifyPasswordResetTokenArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyPasswordlessAuthenticationArgs = {
  response: Scalars['JSON']['input'];
};


export type MutationVerifySignUpArgs = {
  token: Scalars['String']['input'];
};


export type MutationVerifyWebAuthnAuthenticationArgs = {
  response: Scalars['JSON']['input'];
};


export type MutationVerifyWebAuthnAuthentication2Args = {
  response: Scalars['JSON']['input'];
};


export type MutationVerifyWebAuthnRegistrationArgs = {
  response: Scalars['JSON']['input'];
};

export type NotificationFilterInput = {
  channel?: InputMaybe<Channel>;
  recipientId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<NotificationStatus>;
  unreadOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type NotificationPayload = {
  __typename?: 'NotificationPayload';
  archivedAt?: Maybe<Scalars['DateTime']['output']>;
  channel: Channel;
  createdAt: Scalars['DateTime']['output'];
  createdBy?: Maybe<Scalars['String']['output']>;
  deliveredAt?: Maybe<Scalars['DateTime']['output']>;
  expiresAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  metadata: Scalars['JSON']['output'];
  priority: Priority;
  provider?: Maybe<Scalars['String']['output']>;
  providerRef?: Maybe<Scalars['String']['output']>;
  purgedAt?: Maybe<Scalars['DateTime']['output']>;
  readAt?: Maybe<Scalars['DateTime']['output']>;
  recipientAddress?: Maybe<Scalars['String']['output']>;
  recipientId?: Maybe<Scalars['String']['output']>;
  recipientUsername: Scalars['String']['output'];
  sensitive: Scalars['Boolean']['output'];
  status: NotificationStatus;
  tenantId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  variables: Scalars['JSON']['output'];
};

export enum NotificationStatus {
  Archived = 'ARCHIVED',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Read = 'READ',
  Sent = 'SENT'
}

/** Represents the current lifecycle state of a user. */
export enum PersonStatus {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Closed = 'CLOSED',
  Deleted = 'DELETED',
  Disabled = 'DISABLED',
  Inactive = 'INACTIVE'
}

export type PersonalInfoInput = {
  birthDate?: InputMaybe<Scalars['DateTime']['input']>;
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender?: InputMaybe<GenderType>;
  lastName: Scalars['String']['input'];
  maritalStatus?: InputMaybe<MaritalStatusType>;
};

export type PersonalInfoPayload = {
  __typename?: 'PersonalInfoPayload';
  birthDate?: Maybe<Scalars['DateTime']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<GenderType>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  maritalStatus?: Maybe<MaritalStatusType>;
  phoneNumbers?: Maybe<Array<PhoneNumberPayload>>;
  updatedAt: Scalars['DateTime']['output'];
};

export type PhoneNumberInput = {
  countryCode: Scalars['String']['input'];
  /** Marks this number as primary for the associated profile. */
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  /** Optional user-defined label (e.g., “Office Line”, “Private”). */
  label?: InputMaybe<Scalars['String']['input']>;
  /** Phone number value in international format. Regex validated. */
  number: Scalars['String']['input'];
  /** The category/type of the phone number (e.g., MOBILE, HOME, WORK). */
  type: PhoneNumberType;
};

export type PhoneNumberPayload = {
  __typename?: 'PhoneNumberPayload';
  countryCode: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  infoId: Scalars['String']['output'];
  isPrimary?: Maybe<Scalars['Boolean']['output']>;
  label?: Maybe<Scalars['String']['output']>;
  number: Scalars['String']['output'];
  type: PhoneNumberType;
  updatedAt: Scalars['DateTime']['output'];
};

/** Specifies the type/category of a phone number. */
export enum PhoneNumberType {
  Home = 'HOME',
  Mobile = 'MOBILE',
  Other = 'OTHER',
  Private = 'PRIVATE',
  Whatsapp = 'WHATSAPP',
  Work = 'WORK'
}

export type PostalCode = {
  __typename?: 'PostalCode';
  accuracy?: Maybe<Scalars['Int']['output']>;
  city: City;
  country: Country;
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  location?: Maybe<GeoPoint>;
  updatedAt: Scalars['String']['output'];
  zip: Scalars['String']['output'];
};

export type PostalCodeFilterInput = {
  cityId?: InputMaybe<Scalars['ID']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export enum Priority {
  High = 'HIGH',
  Low = 'LOW',
  Normal = 'NORMAL',
  Urgent = 'URGENT'
}

export type Query = {
  __typename?: 'Query';
  activeTemplate: TemplatePayload;
  addressAutocomplete: Array<AddressAutocompletePayload>;
  checkEmail: Scalars['Boolean']['output'];
  checkUsername: Scalars['Boolean']['output'];
  getAllCountries: Array<Country>;
  getAllInterestCategories: Array<InterestCategoryPayload>;
  getAllInterests: Array<InterestPayload>;
  getById: KcUser;
  getByUsername: KcUser;
  getCitiesByPostalCode: City;
  getCitiesByState?: Maybe<Array<City>>;
  getPostalCodesByCity?: Maybe<Array<PostalCode>>;
  getPostalCodesByState?: Maybe<Array<PostalCode>>;
  getSecurityQuestions: Array<SecurityQuestionPayload>;
  getStatesByCountry: Array<State>;
  getUserList: Array<UserPayload>;
  kc_users: Array<KcUser>;
  listWebAuthnDevices: Array<WebAuthnDevicePayload>;
  me: UserPayload;
  meAuth: KcUser;
  meByToken: KcUser;
  myNotifications: Array<NotificationPayload>;
  notification: NotificationPayload;
  notifications: Array<NotificationPayload>;
  templates: Array<TemplatePayload>;
  user: UserPayload;
  users: Array<UserPayload>;
  validateAddress: AddressValidationPayload;
};


export type QueryActiveTemplateArgs = {
  channel: Channel;
  key: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
};


export type QueryAddressAutocompleteArgs = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  text: Scalars['String']['input'];
};


export type QueryCheckEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryCheckUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetByUsernameArgs = {
  username: Scalars['String']['input'];
};


export type QueryGetCitiesByPostalCodeArgs = {
  postalCodeId: Scalars['ID']['input'];
};


export type QueryGetCitiesByStateArgs = {
  stateId: Scalars['ID']['input'];
};


export type QueryGetPostalCodesByCityArgs = {
  cityId: Scalars['ID']['input'];
};


export type QueryGetPostalCodesByStateArgs = {
  stateId: Scalars['ID']['input'];
};


export type QueryGetStatesByCountryArgs = {
  countryId: Scalars['ID']['input'];
};


export type QueryGetUserListArgs = {
  userIds: Array<Scalars['ID']['input']>;
};


export type QueryMyNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  recipientId: Scalars['String']['input'];
};


export type QueryNotificationArgs = {
  id: Scalars['String']['input'];
};


export type QueryNotificationsArgs = {
  filter?: InputMaybe<NotificationFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryTemplatesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};


export type QueryValidateAddressArgs = {
  input: AddressValidationInput;
};

export enum RealmRole {
  Admin = 'ADMIN',
  Basic = 'BASIC',
  Elite = 'ELITE',
  Supreme = 'SUPREME',
}

/** Defines the type of relationship between two users. */
export enum RelationshipType {
  BusinessPartner = 'BUSINESS_PARTNER',
  Child = 'CHILD',
  Colleague = 'COLLEAGUE',
  Cousin = 'COUSIN',
  Family = 'FAMILY',
  Friend = 'FRIEND',
  Other = 'OTHER',
  Parent = 'PARENT',
  Partner = 'PARTNER',
  Relative = 'RELATIVE',
  Sibling = 'SIBLING'
}

export type ResetVerificationPayload = {
  __typename?: 'ResetVerificationPayload';
  mfaMethod: MfaPreference;
  mfaRequired: Scalars['Boolean']['output'];
};

export type SecurityQuestionAnswerInput = {
  answer: Scalars['String']['input'];
  questionId: Scalars['String']['input'];
};

export type SecurityQuestionPayload = {
  __typename?: 'SecurityQuestionPayload';
  id: Scalars['ID']['output'];
  question: Scalars['String']['output'];
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  message?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  token?: Maybe<TokenPayload>;
  user?: Maybe<KcUser>;
  userId?: Maybe<Scalars['ID']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

/**
 * =====================================================
 * STATE TYPE
 * =====================================================
 */
export type State = {
  __typename?: 'State';
  code: Scalars['String']['output'];
  country: Country;
  id: Scalars['ID']['output'];
  iso3166Code?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['Float']['output']>;
  level?: Maybe<Scalars['Int']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
  parent?: Maybe<State>;
  population?: Maybe<Scalars['Int']['output']>;
  timezones: Array<Timezone>;
  type?: Maybe<Scalars['String']['output']>;
};

/**
 * =====================================================
 * FILTER INPUT
 * =====================================================
 */
export type StateFilterInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  countryId?: InputMaybe<Scalars['ID']['input']>;
  countryIso2?: InputMaybe<Scalars['String']['input']>;
  countryIso3?: InputMaybe<Scalars['String']['input']>;
  iso3166_2?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

/**
 * =====================================================
 * PAGINATION WRAPPER
 * =====================================================
 */
export type StatePage = {
  __typename?: 'StatePage';
  content: Array<State>;
  number: Scalars['Int']['output'];
  size: Scalars['Int']['output'];
  totalElements: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

/** Represents a business or account-related status. */
export enum StatusType {
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  Closed = 'CLOSED',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED',
  Disabled = 'DISABLED'
}

export type StepUpVerificationInputGql = {
  answers?: InputMaybe<Array<SecurityQuestionAnswerInput>>;
  code?: InputMaybe<Scalars['String']['input']>;
  credentialResponse?: InputMaybe<Scalars['JSON']['input']>;
  token: Scalars['String']['input'];
};

export type Subregion = {
  __typename?: 'Subregion';
  continent: Continent;
  countries: Array<Country>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SuccessPayload = {
  __typename?: 'SuccessPayload';
  message?: Maybe<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type TemplatePayload = {
  __typename?: 'TemplatePayload';
  body: Scalars['String']['output'];
  channel: Channel;
  createdAt: Scalars['DateTime']['output'];
  format: ContentFormat;
  id: Scalars['ID']['output'];
  isActive: Scalars['Boolean']['output'];
  key: Scalars['String']['output'];
  locale: Scalars['String']['output'];
  subject?: Maybe<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  variables: Scalars['JSON']['output'];
  version: Scalars['Float']['output'];
};

export type Timezone = {
  __typename?: 'Timezone';
  abbreviation: Scalars['String']['output'];
  countries: Array<Country>;
  gmtOffset: Scalars['String']['output'];
  gmtOffsetName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  tzName: Scalars['String']['output'];
  zoneName: Scalars['String']['output'];
};

export type TokenPayload = {
  __typename?: 'TokenPayload';
  accessToken: Scalars['String']['output'];
  expiresIn: Scalars['String']['output'];
  idToken: Scalars['String']['output'];
  refreshExpiresIn: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  scope: Scalars['String']['output'];
};

export type TotpSetupPayload = {
  __typename?: 'TotpSetupPayload';
  otpauth?: Maybe<Scalars['String']['output']>;
  secret?: Maybe<Scalars['String']['output']>;
  uri?: Maybe<Scalars['String']['output']>;
};

export type UpdateKcUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeInput = {
  personalInfo?: InputMaybe<PersonalInfoInput>;
};

export type UpdateMyProfileInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateTemplateInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  bumpVersion?: Scalars['Boolean']['input'];
  format?: InputMaybe<ContentFormat>;
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  variables?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type UpdateUserInput = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<PersonStatus>;
  userType?: InputMaybe<UserType>;
};

export type UpdateUserPasswordInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  newPassword?: InputMaybe<Scalars['String']['input']>;
};

export type UserAddressInput = {
  additionalInfo?: InputMaybe<Scalars['String']['input']>;
  addressType: Scalars['String']['input'];
  cityId: Scalars['ID']['input'];
  countryId: Scalars['ID']['input'];
  houseNumber?: InputMaybe<Scalars['String']['input']>;
  postalCodeId?: InputMaybe<Scalars['ID']['input']>;
  stateId?: InputMaybe<Scalars['ID']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UserPayload = {
  __typename?: 'UserPayload';
  contacts?: Maybe<Array<ContactPayload>>;
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<CustomerPayload>;
  employee?: Maybe<EmployeePayload>;
  id: Scalars['ID']['output'];
  personalInfo?: Maybe<PersonalInfoPayload>;
  role?: Maybe<RealmRole>;
  status: PersonStatus;
  updatedAt: Scalars['DateTime']['output'];
  userType: UserType;
  username: Scalars['String']['output'];
};

export type UserSignUpInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phoneNumbers?: InputMaybe<Array<PhoneNumberInput>>;
  username: Scalars['String']['input'];
};

/** Specifies the category of a user (customer, employee, guest). */
export enum UserType {
  Customer = 'CUSTOMER',
  Employee = 'EMPLOYEE',
  Guest = 'GUEST'
}

export type WebAuthnDevicePayload = {
  __typename?: 'WebAuthnDevicePayload';
  backedUp: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  credentialId: Scalars['String']['output'];
  deviceType: Scalars['String']['output'];
  lastUsedAt?: Maybe<Scalars['DateTime']['output']>;
  nickname?: Maybe<Scalars['String']['output']>;
  revokedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type AutocompleteAddressQueryVariables = Exact<{
  text: Scalars['String']['input'];
}>;


export type AutocompleteAddressQuery = { __typename?: 'Query', addressAutocomplete: Array<{ __typename?: 'AddressAutocompletePayload', formatted?: string | null, street?: string | null, houseNumber?: string | null, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, confidence?: number | null, lat?: number | null, lon?: number | null }> };

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCountriesQuery = { __typename?: 'Query', getAllCountries: Array<{ __typename?: 'Country', id: string, name: string, flagSvg?: string | null, flagPng?: string | null, iso2: string, callingCode?: { __typename?: 'CallingCode', id: string, code: string } | null }> };

export type GetCitiesByPostalCodeQueryVariables = Exact<{
  postalCodeId: Scalars['ID']['input'];
}>;


export type GetCitiesByPostalCodeQuery = { __typename?: 'Query', getCitiesByPostalCode: { __typename?: 'City', id: string, name: string } };

export type GetCitiesByStateQueryVariables = Exact<{
  stateId: Scalars['ID']['input'];
}>;


export type GetCitiesByStateQuery = { __typename?: 'Query', getCitiesByState?: Array<{ __typename?: 'City', id: string, name: string }> | null };

export type GetPostalCodesByCityQueryVariables = Exact<{
  cityId: Scalars['ID']['input'];
}>;


export type GetPostalCodesByCityQuery = { __typename?: 'Query', getPostalCodesByCity?: Array<{ __typename?: 'PostalCode', id: string, zip: string }> | null };

export type GetPostalCodesByStateQueryVariables = Exact<{
  stateId: Scalars['ID']['input'];
}>;


export type GetPostalCodesByStateQuery = { __typename?: 'Query', getPostalCodesByState?: Array<{ __typename?: 'PostalCode', id: string, zip: string }> | null };

export type GetStatesByCountryQueryVariables = Exact<{
  countryId: Scalars['ID']['input'];
}>;


export type GetStatesByCountryQuery = { __typename?: 'Query', getStatesByCountry: Array<{ __typename?: 'State', id: string, code: string, name: string }> };

export type ValidateAddressQueryVariables = Exact<{
  input: AddressValidationInput;
}>;


export type ValidateAddressQuery = { __typename?: 'Query', validateAddress: { __typename?: 'AddressValidationPayload', valid: boolean, reason: string, confidence?: number | null, formatted?: string | null, lon?: number | null, lat?: number | null } };

export type CompletePasswordResetMutationVariables = Exact<{
  input: CompleteResetInputGql;
}>;


export type CompletePasswordResetMutation = { __typename?: 'Mutation', completePasswordReset: boolean };

export type GenerateWebAuthnAuthOptionsMutationVariables = Exact<{ [key: string]: never; }>;


export type GenerateWebAuthnAuthOptionsMutation = { __typename?: 'Mutation', generateWebAuthnAuthOptions: any };

export type GetSecurityQuestionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSecurityQuestionsQuery = { __typename?: 'Query', getSecurityQuestions: Array<{ __typename?: 'SecurityQuestionPayload', id: string, question: string }> };

export type LoginCredentialsMutationVariables = Exact<{
  input: LogInInput;
}>;


export type LoginCredentialsMutation = { __typename?: 'Mutation', credentialsLogin: { __typename?: 'TokenPayload', accessToken: string, expiresIn: string, refreshToken: string, refreshExpiresIn: string, idToken: string, scope: string } };

export type LoginTotpMutationVariables = Exact<{
  username: Scalars['String']['input'];
  code: Scalars['String']['input'];
}>;


export type LoginTotpMutation = { __typename?: 'Mutation', loginTotp: { __typename?: 'TokenPayload', accessToken: string, expiresIn: string, refreshToken: string, refreshExpiresIn: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'SuccessPayload', ok: boolean } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refresh: { __typename?: 'TokenPayload', accessToken: string, expiresIn: string, refreshToken: string, refreshExpiresIn: string, idToken: string, scope: string } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: boolean };

export type SendMagicLinkMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendMagicLinkMutation = { __typename?: 'Mutation', sendMagicLink: boolean };

export type VerifyPasswordResetStepUpMutationVariables = Exact<{
  input: StepUpVerificationInputGql;
}>;


export type VerifyPasswordResetStepUpMutation = { __typename?: 'Mutation', verifyPasswordResetStepUp: boolean };

export type VerifyMagicLinkMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyMagicLinkMutation = { __typename?: 'Mutation', verifyMagicLink: { __typename?: 'TokenPayload', accessToken: string, expiresIn: string, refreshToken: string, refreshExpiresIn: string, scope: string } };

export type VerifyPasswordResetTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifyPasswordResetTokenMutation = { __typename?: 'Mutation', verifyPasswordResetToken: { __typename?: 'ResetVerificationPayload', mfaRequired: boolean, mfaMethod: MfaPreference } };

export type VerifySignUpMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type VerifySignUpMutation = { __typename?: 'Mutation', verifySignUp: string };

export type VerifyWebAuthnAuthenticationMutationVariables = Exact<{
  response: Scalars['JSON']['input'];
}>;


export type VerifyWebAuthnAuthenticationMutation = { __typename?: 'Mutation', verifyWebAuthnAuthentication: { __typename?: 'TokenPayload', accessToken: string, expiresIn: string, refreshToken: string, refreshExpiresIn: string } };

export type CreateSignupVerificationMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateSignupVerificationMutation = { __typename?: 'Mutation', createSignupVerification: boolean };

export type CheckEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckEmailQuery = { __typename?: 'Query', checkEmail: boolean };

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type CheckUsernameQuery = { __typename?: 'Query', checkUsername: boolean };

export type GetAllInterestCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInterestCategoriesQuery = { __typename?: 'Query', getAllInterestCategories: Array<{ __typename?: 'InterestCategoryPayload', id: string, key: string, icon?: string | null, description?: string | null, interests?: Array<{ __typename?: 'InterestPayload', id: string, key: string, icon?: string | null }> | null }> };

export type GetAllInterestsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllInterestsQuery = { __typename?: 'Query', getAllInterests: Array<{ __typename?: 'InterestPayload', id: string, key: string, icon?: string | null }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'UserPayload', id: string, username: string, userType: UserType, status: PersonStatus, createdAt: any, updatedAt: any, role?: RealmRole | null, personalInfo?: { __typename?: 'PersonalInfoPayload', id: string, email: string, firstName: string, lastName: string, birthDate?: any | null, gender?: GenderType | null, maritalStatus?: MaritalStatusType | null, phoneNumbers?: Array<{ __typename?: 'PhoneNumberPayload', id: string, number: string, type: PhoneNumberType, infoId: string, label?: string | null, isPrimary?: boolean | null, countryCode: string }> | null } | null, contacts?: Array<{ __typename?: 'ContactPayload', id: string, userId: string, contactId: string, relationship: RelationshipType, withdrawalLimit: number, emergency: boolean, startDate?: any | null, endDate?: any | null }> | null, customer?: { __typename?: 'CustomerPayload', id: string, subscribed: boolean, state: StatusType, contactOptions: Array<ContactOptionsType>, customerInterest?: Array<{ __typename?: 'CustomerInterestPayload', id: string, isPrimary?: boolean | null, interest?: { __typename?: 'InterestPayload', key: string } | null }> | null } | null, employee?: { __typename?: 'EmployeePayload', id: string, department?: string | null, position?: string | null, role?: string | null, salary?: number | null, hireDate?: any | null, isExternal: boolean } | null } };


export const AutocompleteAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AutocompleteAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addressAutocomplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"street"}},{"kind":"Field","name":{"kind":"Name","value":"houseNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"confidence"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}}]}}]}}]} as unknown as DocumentNode<AutocompleteAddressQuery, AutocompleteAddressQueryVariables>;
export const GetAllCountriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCountries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"flagSvg"}},{"kind":"Field","name":{"kind":"Name","value":"flagPng"}},{"kind":"Field","name":{"kind":"Name","value":"iso2"}},{"kind":"Field","name":{"kind":"Name","value":"callingCode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllCountriesQuery, GetAllCountriesQueryVariables>;
export const GetCitiesByPostalCodeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCitiesByPostalCode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postalCodeId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCitiesByPostalCode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postalCodeId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postalCodeId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCitiesByPostalCodeQuery, GetCitiesByPostalCodeQueryVariables>;
export const GetCitiesByStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCitiesByState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCitiesByState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetCitiesByStateQuery, GetCitiesByStateQueryVariables>;
export const GetPostalCodesByCityDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostalCodesByCity"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostalCodesByCity"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cityId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cityId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}}]}}]}}]} as unknown as DocumentNode<GetPostalCodesByCityQuery, GetPostalCodesByCityQueryVariables>;
export const GetPostalCodesByStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetPostalCodesByState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"stateId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getPostalCodesByState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"stateId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"stateId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"zip"}}]}}]}}]} as unknown as DocumentNode<GetPostalCodesByStateQuery, GetPostalCodesByStateQueryVariables>;
export const GetStatesByCountryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetStatesByCountry"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"countryId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getStatesByCountry"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"countryId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"countryId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetStatesByCountryQuery, GetStatesByCountryQueryVariables>;
export const ValidateAddressDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ValidateAddress"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AddressValidationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"validateAddress"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"valid"}},{"kind":"Field","name":{"kind":"Name","value":"reason"}},{"kind":"Field","name":{"kind":"Name","value":"confidence"}},{"kind":"Field","name":{"kind":"Name","value":"formatted"}},{"kind":"Field","name":{"kind":"Name","value":"lon"}},{"kind":"Field","name":{"kind":"Name","value":"lat"}}]}}]}}]} as unknown as DocumentNode<ValidateAddressQuery, ValidateAddressQueryVariables>;
export const CompletePasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CompletePasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CompleteResetInputGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"completePasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CompletePasswordResetMutation, CompletePasswordResetMutationVariables>;
export const GenerateWebAuthnAuthOptionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"GenerateWebAuthnAuthOptions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"generateWebAuthnAuthOptions"}}]}}]} as unknown as DocumentNode<GenerateWebAuthnAuthOptionsMutation, GenerateWebAuthnAuthOptionsMutationVariables>;
export const GetSecurityQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSecurityQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSecurityQuestions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}}]}}]}}]} as unknown as DocumentNode<GetSecurityQuestionsQuery, GetSecurityQuestionsQueryVariables>;
export const LoginCredentialsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginCredentials"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LogInInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"credentialsLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"idToken"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}}]}}]} as unknown as DocumentNode<LoginCredentialsMutation, LoginCredentialsMutationVariables>;
export const LoginTotpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"LoginTotp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"code"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"loginTotp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"code"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}}]}}]}}]} as unknown as DocumentNode<LoginTotpMutation, LoginTotpMutationVariables>;
export const LogoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const RefreshTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RefreshToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"refresh"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"idToken"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}}]}}]} as unknown as DocumentNode<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RequestPasswordResetDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RequestPasswordReset"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"requestPasswordReset"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<RequestPasswordResetMutation, RequestPasswordResetMutationVariables>;
export const SendMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SendMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sendMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<SendMagicLinkMutation, SendMagicLinkMutationVariables>;
export const VerifyPasswordResetStepUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetStepUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"StepUpVerificationInputGql"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetStepUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<VerifyPasswordResetStepUpMutation, VerifyPasswordResetStepUpMutationVariables>;
export const VerifyMagicLinkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyMagicLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyMagicLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"scope"}}]}}]}}]} as unknown as DocumentNode<VerifyMagicLinkMutation, VerifyMagicLinkMutationVariables>;
export const VerifyPasswordResetTokenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyPasswordResetToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyPasswordResetToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mfaRequired"}},{"kind":"Field","name":{"kind":"Name","value":"mfaMethod"}}]}}]}}]} as unknown as DocumentNode<VerifyPasswordResetTokenMutation, VerifyPasswordResetTokenMutationVariables>;
export const VerifySignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifySignUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"token"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifySignUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"token"},"value":{"kind":"Variable","name":{"kind":"Name","value":"token"}}}]}]}}]} as unknown as DocumentNode<VerifySignUpMutation, VerifySignUpMutationVariables>;
export const VerifyWebAuthnAuthenticationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"VerifyWebAuthnAuthentication"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"response"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"JSON"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verifyWebAuthnAuthentication"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"response"},"value":{"kind":"Variable","name":{"kind":"Name","value":"response"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiresIn"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshExpiresIn"}}]}}]}}]} as unknown as DocumentNode<VerifyWebAuthnAuthenticationMutation, VerifyWebAuthnAuthenticationMutationVariables>;
export const CreateSignupVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSignupVerification"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateUserInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSignupVerification"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createUserInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<CreateSignupVerificationMutation, CreateSignupVerificationMutationVariables>;
export const CheckEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkEmail"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}]}}]} as unknown as DocumentNode<CheckEmailQuery, CheckEmailQueryVariables>;
export const CheckUsernameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CheckUsername"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"checkUsername"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<CheckUsernameQuery, CheckUsernameQueryVariables>;
export const GetAllInterestCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllInterestCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllInterestCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllInterestCategoriesQuery, GetAllInterestCategoriesQueryVariables>;
export const GetAllInterestsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllInterests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"icon"}}]}}]}}]} as unknown as DocumentNode<GetAllInterestsQuery, GetAllInterestsQueryVariables>;
export const GetMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"userType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"personalInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"birthDate"}},{"kind":"Field","name":{"kind":"Name","value":"gender"}},{"kind":"Field","name":{"kind":"Name","value":"maritalStatus"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumbers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"number"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"infoId"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"contacts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}},{"kind":"Field","name":{"kind":"Name","value":"contactId"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"withdrawalLimit"}},{"kind":"Field","name":{"kind":"Name","value":"emergency"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"customer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"subscribed"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"contactOptions"}},{"kind":"Field","name":{"kind":"Name","value":"customerInterest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimary"}},{"kind":"Field","name":{"kind":"Name","value":"interest"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"employee"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"department"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"hireDate"}},{"kind":"Field","name":{"kind":"Name","value":"isExternal"}}]}}]}}]}}]} as unknown as DocumentNode<GetMeQuery, GetMeQueryVariables>;