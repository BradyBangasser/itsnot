$('document').ready(function () {
    $('listplaceholderdiv').load("./accessportal.html #listofnotthere");
});
function denySub() {
    window.location.href = "http://www.w3schools.com";
    return false;
};
function allow() {
    return true;
};