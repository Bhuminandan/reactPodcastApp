
// Time formatter for the small audio player
function timeFormatter(seconds) {

    //  Convert seconds to hours, minutes, and remaining seconds
    seconds = Math.floor(seconds);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let formattedTime = '';

    if (hours > 0) {
        formattedTime += hours.toString().padStart(2, '0') + ':';
    }

    if (minutes > 0 || hours > 0) {
        formattedTime += minutes.toString().padStart(2, '0') + ':';
    }

    formattedTime += remainingSeconds.toString().padStart(2, '0');

    console.log(formattedTime);

    return formattedTime;
}

export default timeFormatter;