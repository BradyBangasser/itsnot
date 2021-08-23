const whitelist = ["bradybbangasser@gmail.com"];
const okemails = ["moundsviewschools"];
const blacklist = [];
const { moundsviewschools } = require('./schoolemailprocessing')
const userObject = {
    user: null,
    email: null,
    password: null,
    school: null,
    teacher: null,
    gradYear: null,
    studentId: null,
    status: null
};
module.exports.checkStuff = async (fn, ln, em, sh, hr, gy, pw, si) => {
    fixAll();
    if (whitelist.includes(em)) {
        userObject['status'] = `allow`;
        return userObject;
    } else {
        const eparts = await parseEmail(em);
        if (eparts['allowed'] === "allowed") {
            const prose = await processemail(em, eparts.local, eparts.domain, fn, ln, gy, si).catch(err => {throw new Error(err)});
            if (prose === 'allowed') {
                userObject['status'] = 'allow';
                return userObject;
            } else {
                return deny();
            }
        } else if (eparts['allowed'] === "review") {
            return review();
        } else {
            return deny();
        };
    };
    function fixAll() {
        fn = capitize(fn);
        ln = capitize(ln);
        userObject['user'] = `${fn} ${ln}`;
        em = em.toLowerCase();
        userObject['email'] = em;
        hr = capitize(hr);
        userObject['teacher'] = hr;
        userObject['school'] = sh;
        userObject['gradYear'] = gy;
        userObject['password'] = pw;
        userObject['studentId'] = si;
    };
};

function parseEmail(em) {
    const firstArray = em.split(".");
    const emailArray = firstArray[0].split("@");
    const emailObject = {
        local: emailArray[0],
        domain: emailArray[1],
        email: em,
        allowed: null
    };
    if (!whitelist.includes(em) && okemails.includes(emailObject[`domain`])) {
        if (blacklist.includes(em)) {
            emailObject['allowed'] = 'denied';
            return emailObject;
        } else {
            emailObject['allowed'] = 'allowed';
            return emailObject;
        };
    } else if (!whitelist.includes(em) && !okemails.includes(emailObject[`domain`])) {
        if (blacklist.includes(em)) {
            emailObject['allowed'] = 'denied';
            return emailObject;
        } else {
            emailObject['allowed'] = 'review';
            return emailObject;
        };
    } else {
        throw new Error('ERROR: SOMETHING WENT WRONG WITH VERIFING EMAIL');
    };
};
function capitize(string) {
    const lower = string.toLowerCase();
    return string.charAt(0).toUpperCase() + lower.slice(1);
};
function deny() {
    userObject['status'] = `denied`;
    if (getCookie('cookie5546575itnot2') !== "") {
        setCookie('cookie5546575itnot2', 'denied', 999);
        return userObject;
    } else {
        return userObject;
    }
};
function review() {
    userObject['status'] = `reviewed`;
    if (getCookie('cookie5546575itnot2') !== "") {
        setCookie('cookie5546575itnot2', 'review', 999);
        return userObject;
    } else {
        return userObject;
    }
};
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
};
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
async function processemail(em, local, domain, fn, ln, gy, si) {
    var emailPros
    switch(domain.toLowerCase()) {
        case 'moundsviewschools':
            const mv = await moundsviewschools(local, fn, ln, gy, si).catch(err => {emailPros = err; break;});
            if (mv === 'allow') {
                emailPros = 'allowed';
            } else {
                throw new Error('MVS Email Pros Error')
            };
            break;
        default:
            review();
    }
    if (emailPros) {
        return emailPros;
    } else {
        throw new Error('Email Pros Error')
    }
};
