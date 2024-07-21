import bcrypt from 'bcryptjs'

const pass = bcrypt.decodeBase64('$2a$08$NnqL/5dCKy46WHg9Pvpy5ORHpbYtjZdhYyp6TLRIJGAEE6PH.asM2')

console.log(pass);