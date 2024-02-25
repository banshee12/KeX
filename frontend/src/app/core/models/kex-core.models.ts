export enum KexLoadState {
  NONE = 'NONE',
  LOADING= 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE'
}

export enum KexNotificationType {
  INFO = 'INFO',
  WARNING = 'WARNING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface KexNotificationData {
  message : string,
  type : KexNotificationType
}
