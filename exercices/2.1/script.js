const dateTimeNow = new Date();

function addDateTime(message) {
    return dateTimeNow.toLocaleDateString() + ' ' + dateTimeNow.toLocaleTimeString() + ' ' + message;
}

alert(addDateTime("Pop-up thanks to an external JS file."));