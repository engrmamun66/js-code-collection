function objectValidation (DataObject, validators) {
    /**
     * Example:
     * ==============
     * DataObject = {
     *  name: 'Jhon',
     *  email: 'test@gmail.com',
     * }
     * validators = { 
     *  imei:{
     *      required: true,
     *      type: 'string', // string | number | boolean | array | object | email
     *      minLength: 2,
     *      maxLength: 5,
     *      min: 2,
     *      max: 5,
     *      regex: "\d{2}", | /\d{2}/   // [expression(required), flags(optional)]
     *      regexArr: [\d{2}],
     *      length: 15, //Check exact length
     *      callback: (value, DataObject, validators, errors) => value.length > 2, // this callback should return true or false
     *      message: 'default meesage for callback()', // Remind: We can controll message by validator param of callback() function
     *   },
     * }
     */

    let Types = ['string', 'number', 'boolean', 'array', 'object'];

    const filterText = (text) => {
        let tt = text.toString().replaceAll('_', ' ');
        return tt[0].toUpperCase() + tt.slice(1).toLowerCase();
    }
    const isValidEmail = (email) => {
        let emailPattern = /^[a-z0-9\.]+@[a-z]+\.[a-z]{2,3}$/;
        return email.toLowerCase().match(emailPattern) != null
    }
    const isEmptyObject = (object) => {
        return Object.keys(object).length ? false : true;
    }

    let errors = {};
    Object.entries(DataObject).forEach(([key, value]) => {
        if (value == null) value = ''
        let needTovalidate = validators?.hasOwnProperty(key);
        if (needTovalidate) {
            //====== ================= ===========
            //====== required checking ===========
            //====== ================= ===========
            let CurItemValidator = validators[key];
            if (CurItemValidator.hasOwnProperty('required')) {
                if (CurItemValidator.required && !value.toString().length)
                    (typeof errors[key] == 'object') ? errors[key].push(` is required`) : errors[key] = [`${filterText(key)} is required`]
            }
            //====== ================= ===========
            //======== Type checking =============
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('type')) {
                if (Types.indexOf(CurItemValidator['type'] != -1)) {
                    var type = CurItemValidator['type'];
                    if (value && type == 'email' && !isValidEmail(value) && value != '')
                        (typeof errors[key] == 'object') ? errors[key].push(`Email address is not valid`) : errors[key] = [`Email address is not valid`]
                    else {
                        if (value && type == 'number') {
                            if (isNaN(value))
                                (typeof errors[key] == 'object') ? errors[key].push(` should be ${type}`) : errors[key] = [`${filterText(key)} should be ${type}`]
                        } else {
                            if (!(type in ['email', 'number', 'string'])) {
                                if (type == 'array') {
                                    if (!Array.isArray(value))
                                        (!Array.isArray(value)) ? errors[key].push(` should be array`) : errors[key] = [`${filterText(key)} should be array`]
                                }
                                if (type == 'object') {
                                    if (typeof value != 'object' || Array.isArray(value))
                                        (typeof errors[key] == 'object') ? errors[key].push(` should be ${type}`) : errors[key] = [`${filterText(key)} should be ${type}`]
                                }
                            }
                        }
                    }
                }
            }
            //====== ================= ===========
            //======== minLength checking ===========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('minLength')) {
                let minLength = CurItemValidator['minLength'];
                if (value && value.length < minLength)
                    (typeof errors[key] == 'object') ? errors[key].push(` minimum length to be ${minLength}`) : errors[key] = [`${filterText(key)} minimum length to be ${minLength}`]
            }
            //====== ================= ===========
            //======== maxLength checking ===========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('maxLength')) {
                let maxLength = CurItemValidator['maxLength'];
                if (value && value.length > maxLength)
                    (typeof errors[key] == 'object') ? errors[key].push(` maximum length to be ${maxLength}`) : errors[key] = [`${filterText(key)} maximum length to be ${maxLength}`]
            }
            //====== ================= ===========
            //======== length checking ===========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('length')) {
                let length = CurItemValidator['length'];
                if (value && value.length > length)
                    (typeof errors[key] == 'object') ? errors[key].push(` length to be ${length}`) : errors[key] = [`${filterText(key)} length to be ${length}`]
            }
            //====== ================= ===========
            //======== min checking ===========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('min')) {
                let min = CurItemValidator['min'];
                if (value && Number(value) < min)
                    (typeof errors[key] == 'object') ? errors[key].push(` minimum to be ${min}`) : errors[key] = [`${filterText(key)} minimum to be ${min}`]
            }
            //====== ================= ===========
            //======== max checking ===========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('max')) {
                let max = CurItemValidator['max'];
                if (value && Number(value) > max)
                    (typeof errors[key] == 'object') ? errors[key].push(` maximum to be ${max}`) : errors[key] = [`${filterText(key)} maximum to be ${max}`]
            }
            //====== ================= ===========
            //====== checking with regex =========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('regex')) {
                if (value){
                    try {
                        var regex = new RegExp(CurItemValidator['regex'])
                        if (!regex.test(value))
                            (typeof errors[key] == 'object') ? errors[key].push(' ' + (CurItemValidator?.message || `is not valid`)) : errors[key] = [(CurItemValidator?.message || `${filterText(key)} is not valid`)]
                    } catch (error) {
                        (typeof errors[key] == 'object') ? errors[key].push(`:: ${error}`) : errors[key] = [`${filterText(key)}:: ${error}`]
                    }
                }
            }
            //====== ================= ===========
            //====== checking with regexArr =========
            //====== ================= ===========
            if (CurItemValidator.hasOwnProperty('regexArr')) {
                if(value){
                    try {
                        var regexArr = CurItemValidator['regexArr']
                        if (!regexArr?.every(regex => {
                            return new RegExp(regex).test(value)
                        }) )
                            (typeof errors[key] == 'object') ? errors[key].push(' ' + (CurItemValidator['regexArr']?.message || `is not valid`)) : errors[key] = [(CurItemValidator['regexArr']?.message || `${filterText(key)} is not valid`)]
                    } catch (error) {
                        (typeof errors[key] == 'object') ? errors[key].push(`:: ${error}`) : errors[key] = [`${filterText(key)}:: ${error}`]
                    }
                }
            }
            //======================== =================================
            //======== validate with callback function =================
            //====== ================= =================================
            if (CurItemValidator.hasOwnProperty('callback')) {
                let callback = CurItemValidator['callback'];
                if (value) {
                    if (!callback(value, DataObject, validators, errors)) {
                        CurItemValidator.message = CurItemValidator.message || `${filterText(key)} not validate by callback`
                        errors[key] = [CurItemValidator?.message]
                    }
                }
            }
        }
    });
    if (isEmptyObject(errors)) {
        return { status: 'OK', data: DataObject };
    } else {
        return { status: 'NOK', errors: errors };
    }
}

module.exports = {
    objectValidation
}

