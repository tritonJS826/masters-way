import crypto from 'crypto';

/**
 * TODO: update
 * it's just for example, you can use your function I didn't find it
 */
export const firebaseDateToPgDate = (fbDate: { seconds: number, nanoseconds: number }) => {
  const timestamp = fbDate.seconds + fbDate.nanoseconds * 1e-9 ;
  const dateTime = new Date(timestamp * 1000);

  const year = dateTime.getFullYear().toString().padStart(4, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = dateTime.getDate().toString().padStart(2, '0');
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');
  const milliseconds = dateTime.getMilliseconds().toString().padStart(3, '0'); // Pad milliseconds


  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDateTime;
}

export const timestampToPgDate = (timestamp: number) => {
  const dateTime = new Date(timestamp * 1000);

  const year = dateTime.getFullYear().toString().padStart(4, '0');
  const month = (dateTime.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
  const day = dateTime.getDate().toString().padStart(2, '0');
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const minutes = dateTime.getMinutes().toString().padStart(2, '0');
  const seconds = dateTime.getSeconds().toString().padStart(2, '0');
  const milliseconds = dateTime.getMilliseconds().toString().padStart(3, '0'); // Pad milliseconds


  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

  return formattedDateTime;
};

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