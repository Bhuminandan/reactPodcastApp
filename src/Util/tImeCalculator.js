

// Util for time convertion for podcast card to time when its uploaded
function timeCalculator(createdTimestamp) {
    const currentDate = new Date();
    const createdDate = new Date(createdTimestamp);
    const timeDifference = currentDate - createdDate;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.44); // An average month length
    const years = Math.floor(months / 12);

    if (years >= 1) {
        return years + (years === 1 ? ' year' : ' years') + ' ago';
    } else if (months >= 1) {
        return months + (months === 1 ? ' month' : ' months') + ' ago';
    } else if (weeks >= 1) {
        return weeks + (weeks === 1 ? ' week' : ' weeks') + ' ago';
    } else if (days >= 1) {
        return days + (days === 1 ? ' day' : ' days') + ' ago';
    } else if (hours >= 1) {
        return hours + (hours === 1 ? ' hour' : ' hours') + ' ago';
    } else if (minutes >= 1) {
        return minutes + (minutes === 1 ? ' minute' : ' minutes') + ' ago';
    } else {
        return 'Less than a minute ago';
    }
}


export default timeCalculator;
