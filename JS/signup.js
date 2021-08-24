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
async function onSub() {
    let fname = document.forms["jqueryidform"]["fname"].value;
    let lname = document.forms["jqueryidform"]["lname"].value;
    let em = document.forms["jqueryidform"]["email"].value;
    let sh = document.forms["jqueryidform"]["skool"].value;
    let hr = document.forms["jqueryidform"]["tname"].value || '6q1mf6gyyd';
    let gy = document.forms["jqueryidform"]["gyear"].value || 'v73a9bq6xj';
    let pw = document.forms["jqueryidform"]["pass"].value;
    let si = document.forms["jqueryidform"]["sid"].value;
    console.log(fname, lname, em, sh, hr, gy, pw, si)
    const review = await checkStuff(fname, lname, em, sh, hr, gy, pw, si);
    $('#result').text(review)
    return false;
}
const whitelist = ["bradybbangasser@gmail.com"];
const okemails = ["moundsviewschools"];
const blacklist = [];
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
async function checkStuff(fn, ln, em, sh, hr, gy, pw, si) {
    return 'Frank'
    fixAll();
    if (whitelist.includes(em)) {
        userObject['status'] = `allow`;
        // return userObject;
        return 'passwl'
    } else {
        const eparts = await parseEmail(em);
        if (eparts['allowed'] === "allowed") {
            const prose = await processemail(em, eparts.local, eparts.domain, fn, ln, gy, si).catch(err => {throw new Error(err)});
            if (prose === 'allowed') {
                userObject['status'] = 'allow';
                // return userObject;
                return 'pass'
            } else {
                // return deny();
                return "failed";
            }
        } else if (eparts['allowed'] === "review") {
            // return review();
            return 'review'
        } else {
            // return deny();
            return "failed";
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
}
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
            const mv = await mvse(local, fn, ln, gy, si).catch(err => {emailPros = err;});
            if (mv === 'allow') {
                emailPros = 'allowed';
            }
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
function mvse(local, fn, ln, gy, si) {
    var deny;
    const splitLocal = local.toLowerCase().split('');
    if (splitLocal.length > 11 || splitLocal.length < 9) {
        throw new Error('Staff Email');
    };
    for (let i in splitLocal) {
        if (splitLocal[i] === '.') {
            deny = true;
            break;
        };
    };
    if (deny) {
        throw new Error('Staff Email');
    };
    var year = [];
    var name = [];
    for (let i = 0; i < 4; i++) {
        year.push(splitLocal[0]);
        splitLocal.shift();
    };
    year = year.join('')
    if (year !== gy) {
        throw new Error('Invalid Year')
    } else if (year === gy) {
        for (let i = 0; i < 200; i++) {
            name.push(splitLocal[0]);
            splitLocal.shift()
            if (splitLocal[0] === fn.charAt(0).toLowerCase() && numbers.includes(splitLocal[1])) {
                break;
            } else if (numbers.includes(splitLocal[0])) {
                deny = true;
                break;
            }
        }
        if (deny) {
            throw new Error('Invalid LN');
        } else {
            const lnameSplit = ln.toLowerCase().split('');
            for (let i = 0; i < name.length; i++) {
                if (lnameSplit[i] !== name[i]) {
                    deny = true;
                    break;
                }
            }
            if (deny) {
                throw new Error(`LN doesn't match`);
            } else {
                const first = fn.charAt(0).toLowerCase();
                if (!first === splitLocal[0]) {
                    throw new Error('FN invalid');
                } else if (first === splitLocal[0]) {
                    splitLocal.shift();
                    const idlast = si.split('').slice(-2);
                    for (let i = 0; i < 2; i++) {
                        if (!idlast[i] === splitLocal[i]) {
                            deny = true;
                            break;
                        }
                    }
                    if (deny) {
                        throw new Error(`SID doesn't match`);
                    } else {
                        return 'allow';
                    }
                } else {
                    throw new Error('MOUNDS VIEW SCHOOLS EMAIL PROCESSING FN ERROR');
                }
            }
        }
    } else {
        throw new Error('MOUNDS VIEW EMAIL PROCESSING YEAR ERROR');
    }
}
async function wait(seconds) {
    setTimeout(nothing, seconds*1000)
}