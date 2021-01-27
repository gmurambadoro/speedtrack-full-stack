import * as prettyBytes from "pretty-bytes";

/**
 * Converts a time string to a locale date
 * @param timestamp {string}
 * @returns {Date}
 */
export const getLocaleDate = (timestamp) => {
    return new Date(Date.parse(new Date(timestamp).toLocaleString("en-ZA")));
};

/**
 * Generates a human-readable value for raw bytes
 * @param bytes {number}
 * @returns {string}
 */
export const formatBytes = (bytes) => {
    if (Number.isNaN(bytes)) {
        return '';
    }

    return prettyBytes(bytes);
};

/**
 * Converts a given bytes value to the equivalent megabytes value
 * @param bytes
 * @param decimals
 * @returns {number}
 */
export const getMegaBytes = (bytes, decimals = 1) => {
    return parseFloat((bytes / (1024 * 1024)).toFixed(decimals));
}