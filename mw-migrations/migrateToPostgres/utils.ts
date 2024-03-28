import crypto from 'crypto';

/**
 * TODO: update
 * it's just for example, you can use your function I didn't find it
 */
export const firebaseDateToPgDate = (fbDate: {seconds: number, nanoseconds: number}) => {
    return "2024-03-09 19:25:46.557"
}

export const timestampToPgDate = (timestamp: number) => "2024-03-09 19:25:46.557";

export function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// from EM0IHWhTQlUbsEMw9xPs4bjYZjj2 to 9142243f-5ede-4c1c-86d6-295a64bcd7a3
export function convertFirebaseUuidToPgUuid(firebaseId: string): string {
    // Create a SHA-256 hash
    const hash = crypto.createHash('sha256');
    hash.update(firebaseId);

    const digest = hash.digest('hex');

    // Take the first 32 characters of the digest
    const rawResult = digest.slice(0, 36);
    const resultWithDash1 = rawResult.slice(0, 8) + '-' + rawResult.slice(9);
    const resultWithDash2 = resultWithDash1.slice(0, 13) + '-' + rawResult.slice(14);
    const resultWithDash3 = resultWithDash2.slice(0, 18) + '-' + rawResult.slice(19);
    const resultWithDash4 = resultWithDash3.slice(0, 23) + '-' + rawResult.slice(24);


    return resultWithDash4;
}