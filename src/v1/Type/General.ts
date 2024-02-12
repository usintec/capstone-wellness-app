export enum UserStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BANNED = 'banned'
}
export enum Roles {
    ADMIN = 'admin',
    USER = 'user',
    SUPER_ADMIN = 'super admin'
}
export enum Gender {
    MALE = 'male',
    FEMALE = 'female'
}
export enum TransactionType {
    BUY = 'buy',
    SELL = 'sell'
}

export interface Address {
    address_line1: string
    address_city: string
    address_district: string
    address_postalcode: string
    address_country: string
  }