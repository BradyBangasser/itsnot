$('document').ready(function () {
    $('#listplaceholderdiv').load("./accessportal.html");
});
function denySub() {
    window.location.href = "../staff-deny";
    return false;
};
function allow() {
    return true;
};