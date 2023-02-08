const bcrypt = require('bcrypt');

const commonUtil = {
    /**
     * 
     * @param {*} obj 
     * @returns return true if obj empty
     */
    isEmpty: (obj) => {
        if (!obj) return true;
        return Object.keys(obj).length === 0;
    },

    /**
     * 
     * @param {*} value password receive from client
     * @returns password encrypted using bcrypt 
     */
    hashPassword: async (value) => {
        if (!value) return null;

        return await bcrypt.hash(value, 8);
    }
};

module.exports = commonUtil;

