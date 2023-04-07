/**
 * Base32 class using https://www.ietf.org/rfc/rfc4648
 * Author: Bo Norgaard, Bonosoft
 */

export class Base32 {
    private textEncoder = new TextEncoder();
    private static Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

    public encodeString(str: string) : string {
        return this.encode(this.textEncoder.encode(str));
    }

    public encode(bytes: Uint8Array) : string {
            let result = '';
            let currByte: number, digit: number, i = 0;
            while (i < bytes.length) {
                currByte = bytes[i++] & 255;

                // +8, 5 bits, 3 left
                result += Base32.Chars.charAt(currByte >> 3);
                digit = (currByte & 7) << 2;
                if (i >= bytes.length) { // put the last 3 bits
                    result += Base32.Chars.charAt(digit);
                    result += '======'
                    break;
                }

                // 3+8, 5 bits, 5 bits, 1 left
                currByte = bytes[i++] & 255;
                result += Base32.Chars.charAt(digit | (currByte >> 6));
                result += Base32.Chars.charAt((currByte >> 1) & 31);
                digit = (currByte & 1) << 4;
                if (i >= bytes.length) { // put the last 1 bit
                    result += Base32.Chars.charAt(digit);
                    result += '===='
                    break;
                }

                // 1+8, 5 bits, 4 left
                currByte = bytes[i++] & 255;
                result += Base32.Chars.charAt(digit | (currByte >> 4));
                digit = (currByte & 15) << 1;
                if (i >= bytes.length) { // put the last 4 bits
                    result += Base32.Chars.charAt(digit);
                    result += '==='
                    break;
                }

                // 4+8, 5 bits, 5 bits, 2 left
                currByte = bytes[i++] & 255;
                result += Base32.Chars.charAt(digit | (currByte >> 7));
                result += Base32.Chars.charAt((currByte >> 2) & 31);
                digit = (currByte & 3) << 3;
                if (i >= bytes.length) { // put the last 2 bits
                    result += Base32.Chars.charAt(digit);
                    result += '='
                    break;
                }

                // 2+8, 5 bits, 5 bits
                currByte = bytes[i++] & 255;
                result += Base32.Chars.charAt(digit | (currByte >> 5));
                result += Base32.Chars.charAt(currByte & 31);
            }
            return result;
        }
    
    private static Lookup = new Uint8Array([ 26, 27, 28, 29, 30, 31, -1,
            -1, -1, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
    private textDecoder = new TextDecoder("utf-8");

    public decodeString(str: string ) : string {
        return this.textDecoder.decode(this.decode(str));
    }
    
    public decode(str: string ) : Uint8Array {
        while (str.endsWith("=")) str = str.substring(0, str.length-1);
        let result = new Uint8Array(str.length * 5 / 8);
        let offset = 0, i = 0, lookup;
        let nextByte, digit;

        while (i < str.length) {
            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            nextByte = (digit << 3);
            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            result[offset++] = (nextByte | (digit >> 2));
            nextByte = ((digit & 3) << 6); // leave 2 bits
            if (i >= str.length) break; // discard the remaining 2 bits

            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            nextByte |= (digit << 1); // leave 7 bits

            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            result[offset++] = (nextByte | (digit >> 4));
            nextByte = ((digit & 15) << 4);
            if (i >= str.length) break; // discard the remaining 2 bits

            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            result[offset++] = (nextByte | (digit >> 1));
            nextByte = ((digit & 1) << 7);
            if (i >= str.length) break; // discard the remaining 2 bits

            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            nextByte |= (digit << 2);

            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            result[offset++] = (nextByte | (digit >> 3));
            nextByte = ((digit & 7) << 5);

            lookup = str.charCodeAt(i++) - 50;
            digit = Base32.Lookup[lookup];
            result[offset++] = (nextByte | digit);
        }
        return result;
    }

}
