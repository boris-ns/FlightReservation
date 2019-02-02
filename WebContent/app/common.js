function resetVariable(obj, value) {
    Object.keys(obj).forEach(function(index) {
        obj[index] = value;
    });
}

function convertDate(milliseconds) {
    let date = new Date(milliseconds);
    return date.toDateString();
}