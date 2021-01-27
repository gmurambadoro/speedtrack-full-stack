/**
 * The name of the application
 * @type {string}
 */
export const APP_NAME = 'SpeedTrack - Client';

/**
 * The time (in seconds) before new data has to be fetched from the server
 * @type {number}
 */
export const REFRESH_INTERVAL_MILLISECONDS = (1000 * 60);

/**
 * The grace period before indicating offline status. The server is configured to generate data every 5 minutes
 * @type {number}
 */
export const LAST_ACTIVITY_INTERVAL_MINUTES = 7;