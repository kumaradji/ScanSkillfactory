// helpers.js
/**
 * Utility functions to assist with common tasks such as formatting dates and combining data.
 */

/**
 * Formats a date string into a more readable format.
 *
 * @param {string} dateString - The date string to format.
 * @returns {string} The formatted date string.
 */
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ru-RU", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
};

/**
 * Combines data by date from an array of histogram objects.
 * It aggregates total counts and risk counts for each date.
 *
 * @param {Array} data - An array of histogram objects to combine.
 * @returns {Array} An array of combined data objects sorted by date.
 */
export const combineDataByDate = (data) => {
    const combinedData = {};

    data.forEach(histogram => {
        histogram.data.forEach(item => {
            const dateKey = item.date.split('T')[0];
            if (!combinedData[dateKey]) {
                combinedData[dateKey] = { period: formatDate(dateKey), total: 0, risks: 0 };
            }
            if (histogram.histogramType === 'totalDocuments') {
                combinedData[dateKey].total += item.value;
            } else if (histogram.histogramType === 'riskFactors') {
                combinedData[dateKey].risks += item.value;
            }
        });
    });

    // Convert the combined data object into an array and sort by date
    return Object.values(combinedData).sort((a, b) => new Date(a.period) - new Date(b.period));
};