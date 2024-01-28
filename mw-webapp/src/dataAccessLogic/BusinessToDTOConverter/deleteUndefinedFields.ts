/**
 * Delete from object all fields with value === undefined
 */
export const deleteUndefinedFields = <T>(object: T): T => {
  for (const key in object) {
    if (object[key as keyof T] === undefined) {
      delete object[key as keyof T];
    }
  }

  return object;
};
