import { passMax, passMin, emailMax } from '../../joi/UserContract'
// TODO: pass the UserContract variables dinamically into the RegexDatabase

/* UTF8 FOR USER
    TODO: FILTER OUT SIMILAR LETTERS
    https://stackoverflow.com/questions/6381752/validating-users-utf-8-name-in-javascript
*/
export const userRegExp: RegExp = /^[a-zA-Z0-9]+$/
/*
    BCRYPT ALLOW A MAX OF 72 BYTES STRING TO BE DIGESTED:
    https://stackoverflow.com/questions/49934189/is-bcryptpasswordencoders-password-length-limit-more-than-72-characters
    SO LIMITING THE ENCONDING TO ASCII (1 byte) WILL ALLOW UP TO 72 CHARECTERS
    https://stackoverflow.com/questions/14690159/is-ascii-code-7-bit-or-8-bit

    TEST: https://regexr.com/5mvlg
*/

export const passwordRegExp: RegExp = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!|@|#|$|%|^|&|*|(|)|`|~|[|\]|{|}|;|:|'|"|,|.|<|>|/|?|\||\\])^[\x00-\x7F]{6,72}$/
export const ascOnlyRegExp: RegExp = /^[\x00-\x7F]+$/
export const oneNumberRegExp: RegExp = /(?=.*\d)^.*$/
export const oneSmallCharacterRegExp: RegExp = /(?=.*[a-z])^.*$/
export const oneCapitalCharacterRegExp: RegExp = /(?=.*[A-Z])^.*$/
export const oneSpecialCharacterRegExp: RegExp = /(?=.*[!|@|#|$|%|^|&|*|(|)|`|~|[|\]|{|}|;|:|'|"|,|.|<|>|/|?|\||\\])^.*$/

export const bcryptRegExp: RegExp = /^\$2b\$12\$.{53}$/

export default { userRegExp, passwordRegExp, ascOnlyRegExp, oneNumberRegExp, oneSmallCharacterRegExp, oneCapitalCharacterRegExp, oneSpecialCharacterRegExp, bcryptRegExp }