'use strict'

const bcrypt = require('bcrypt')


module.exports = (enteredPassword, storedPassword,  cb) => {
  bcrypt.compare(enteredPassword, storedPassword, cb);//call back has two areguments
  //first is error, second is either true or false, depending on whether passwords match
};
