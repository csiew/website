export default {
    formatTimestamp(timestamp) {
        try {
            var formattedTimestamp = "";
            if (Object.keys(timestamp).length > 0) {
                formattedTimestamp = timestamp.year + '-' + timestamp.month + '-' + timestamp.day + ' ' + timestamp.hr + ':' + timestamp.mins + ':' + timestamp.sec;
            }
            return formattedTimestamp;
        } catch (e) {
            console.warn(e);
            return null;
        }
    }
}