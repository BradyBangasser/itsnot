const { checkStuff } = require('./AAA')
$('document').ready(function () {
    $('#listplaceholderdiv').load("./accessportal.html");
});
function denySub() {
    window.location.href = "../staff-deny";
    return false;
};
function flag() {
    window.location.href = "#";
    return false;
}
function allow() {
    return true;
};
async function onSub(that) {
    const userObject = await checkStuff(that.fname.value, that.lname.value, that.email.value, that.skool.value, that.tname.value, that.gyear.value, that.pass.value, that.sid.value);
    console.log(userObject)
    return false
}