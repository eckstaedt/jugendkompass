export const SESSION_FEEDBACK_THRESHOLD = 2;

export enum AnalyticsField {
  APP_INSTALLATIONS = 'appInstallations',
  CATEGORY_CHANGED = 'categoryChanged',
  FAVORITE_ADDED = 'favoriteAdded',
  FAVORITE_REMOVED = 'favoriteRemoved',
  APP_SESSIONS = 'appSessions',
  WEBSITE_SESSIONS = 'appSessions',
  FILTER_MODAL_APPLIED = 'filterModalApplied',
  ADMIN_LOGGED_IN = 'adminLoggedIn',
  AUSGABE_OPENED = 'ausgabeOpened',
  VIDEO_PLAYED = 'videoPlayed',
  PDF_DOWNLOADED = 'pdfDownloaded',
  POST_TIME = 'postTime',
  IMPULSE_TIME = 'postTime',
  PUSH_OPENED_FROM_OUTSIDE = 'pushOpenedFromOutside',
  PUSH_OPENED_FROM_APP = 'pushReceivedFromApp',
  APP_UPDATED = 'appUpdated',
}

export enum Platforms {
  IPAD = 'iPad',
  IPHONE = 'iPhone',
  ANDROID_PHONE = 'AndroidPhone',
  ANDROID_TABLET = 'AndroidTablet',
  WEB = 'Web',
  OTHER = 'Other',
}

export enum PushType {
  GENERAL = 'general',
  AUSGABE = 'ausgabe',
  IMPULSE = 'impulse',
  VDT = 'vdt',
}
