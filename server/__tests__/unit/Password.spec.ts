import { passwordRegExp, ascOnlyRegExp, oneNumberRegExp, oneSmallCharacterRegExp, oneCapitalCharacterRegExp, oneSpecialCharacterRegExp, bcryptRegExp } from '../../src/utils/regex/regexDatabase'
import BcriptUtils from '../../src/utils/bcriptUtils'
const bcriptUtils = new BcriptUtils()

const asciiSpecialCharacters = '!@#$%^&*()`~\'";:,<.>/?\\|[]{}'
const numbers = '0123456789'
const asciiSmallLetters = 'abcdefghijklmnopqrstuvwxyz'
const asciiCapitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


function makeString(length: Number) {
    var result           = ''
    var characters       = asciiCapitalLetters + asciiSmallLetters + numbers + asciiSpecialCharacters
    var charactersLength = characters.length
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
 }



describe('Test cases for password ASCII RESTRICTION', () => {
    it('should fail, because password has non-ASCII characters', () => {
        let result = ascOnlyRegExp.test('Not Only ASCIIç')
        expect(result).toBe(false)
    })
    it('should pass, because password has only ASCII characters', () => {
        let result = ascOnlyRegExp.test('Only ASCII')
        expect(result).toBe(true)
    })
    it('should pass, generating random ASCII characters', () => {
        const arraySize = 1000
        let randomArray: string[] = new Array(arraySize)
        let flag: number[] = []

        for(let i = 0; i < arraySize; i++){
            randomArray[i] = makeString(10)
            let result = ascOnlyRegExp.test(randomArray[i])
            if(!result){
                flag.push(i)
            }
        }
        expect(flag.length).toBe(0)
    })
})

describe('Test cases for password RESTRICTIONS', () => {
    it('should fail cause password has non-ASCII', () => {
        const testString = 'Not Only ASCIIç'
        let result = passwordRegExp.test(testString)
        let result2 = ascOnlyRegExp.test(testString)
        expect(result || result2).toBe(false)
    })
    it('should fail cause password needs CAPITAL LETTER', () => {
        const testString = 'onlyasc2$'
        let result = passwordRegExp.test(testString)
        let result2 = oneCapitalCharacterRegExp.test(testString)
        expect(result || result2).toBe(false)
    })
    it('should fail cause password needs SMALL LETTER', () => {
        const testString = 'ONLYASC$2'
        let result = passwordRegExp.test(testString)
        let result2 = oneSmallCharacterRegExp.test(testString)
        expect(result || result2).toBe(false)
    })
    it('should fail cause password needs ASCII SPECIAL CHARACTER', () => {
        const testString = 'OnlyASC2'
        let result = passwordRegExp.test(testString)
        let result2 = oneSpecialCharacterRegExp.test(testString)
        expect(result || result2).toBe(false)
    })
    it('should fail cause password needs NUMBER', () => {
        const testString = "OnlyASC$"
        let result = passwordRegExp.test(testString)
        let result2 = oneNumberRegExp.test(testString)
        expect(result || result2).toBe(false)
    })


    it('should pass, because password meet all criteria', () => {
        let result = passwordRegExp.test('OnlyASC2$')
        expect(result).toBe(true)
    })
    it('should pass, because password meet all criteria (with space)', () => {
        let result = passwordRegExp.test('Only ASC2$')
        expect(result).toBe(true)
    })
})

jest.setTimeout(10000);
describe('Test case for Regex\' bcrypt recognize', () => {
    it('should pass', async () => {
        const arraySize = 10
        let randomArray: string[] = new Array(arraySize)
        let flag: number[] = []
        

        for(let i = 0; i < arraySize; i++){
            let randomString = makeString(10)
            randomArray[i] = await bcriptUtils.hash(randomString)
            let result = ascOnlyRegExp.test(randomArray[i])
            if(!result){
                flag.push(i)
            }
        }
        expect(flag.length).toBe(0)
    })
})