export default function withLoading() {
  return function (
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    descriptor.value = async function (...args: unknown[]) {
      try {
        // SetLoading(true);
        const result = await originalMethod.apply(this, args);
        return result;
      } finally {
        // SetLoading(false);
      }
    };

    return descriptor;
  };
}
