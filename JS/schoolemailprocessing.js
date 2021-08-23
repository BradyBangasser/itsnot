const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ];
module.exports.moundsviewschools = (local, fn, ln, gy, si) => {
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