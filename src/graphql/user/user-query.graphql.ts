import { gql } from '@apollo/client';

export const ME = gql`
  query GetMe {
    me {
      id
      username
      createdAt
      updatedAt
      role
      phoneNumbers {
        id
        number
        type
        infoId
        label
        isPrimary
      }
      personalInfo {
        id
        email
        firstName
        lastName
        birthDate
        gender
        maritalStatus
      }
      userType
      status
      addresses {
        id
        street
        houseNumber
        zipCode
        city
        state
        country
        additionalInfo
      }
      contacts {
        id
        userId
        contactId
        relationship
        withdrawalLimit
        emergency
        startDate
        endDate
      }
      customer {
        id
        tierLevel
        subscribed
        state
        interests
        contactOptions
      }
      employee {
        id
        department
        position
        role
        salary
        hireDate
        isExternal
      }
      securityQuestions {
        id
        question
        answerHash
        attempts
        lockedAt
        createdAt
        updatedAt
      }
    }
  }
`;

export const GET_USERS = gql`
    query Users {
    users {
        id
        username
        firstName
        lastName
        ticketIds
        invitationIds
        phoneNumbers {
            kind
            value
        }
        roles
        email
    }
}
`;

export const GET_USER_BY_ID = gql`
  query GetById($userId: ID!) {
    user(id: $userId) {
      id
      username
      firstName
      lastName
      email
    }
  }
`;


export const GET_USER_LIST = gql`
  query GetUserList($guesIdList: [ID!]!) {
    getUserList(userIds: $guesIdList) {
      id
      firstName
      lastName
    }
  }
`;