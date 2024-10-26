/* eslint-disable @typescript-eslint/no-namespace */
export namespace ErrorMessages {
  export enum passowrd {
    MAX_LENGTH = 'password string can not be longer than 72 characters',
  }

  export enum localStorage {
    storeNotFound = 'Local storage store not found',
  }

  export enum user {
    invalidCredentials = 'Invalid email or password',
    emailExists = 'Email already exists',
    userNotFound = 'User not found',
    canotBeDeleted = 'A user cannot be deleted because they owe books to the library.',
    userInOrg = 'User already in Organization.'
  }

  export enum Organization {
    
    orgNotFound = 'Organization not found'
  }

  export enum common {
    emptyUpdateData = 'Update data cannot be empty',
  }
}
