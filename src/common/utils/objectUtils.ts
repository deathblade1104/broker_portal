class ObjectUtils {
  deleteKeyIfExists<T extends object, K extends keyof T>(
    obj: T,
    keyToDelete: K,
  ): Omit<T, K> {
    const { [keyToDelete]: _, ...rest } = obj;
    return rest as Omit<T, K>;
  }

  /**
   * Utility function to extract values of specific keys from an array of objects.
   * @param objects - Array of objects to extract values from
   * @param keyNames - Array of keys whose values need to be extracted
   * @returns An object with keys and arrays of values for each key
   */
  extractValues<T extends object, K extends keyof T>(
    objects: T[],
    keyNames: K[],
  ): Record<K, T[K][]> {
    const result: Partial<Record<K, T[K][]>> = {};

    keyNames.forEach((key) => {
      result[key] = objects.reduce((acc: T[K][], obj) => {
        if (key in obj) {
          acc.push(obj[key]);
        }
        return acc;
      }, []);
    });

    return result as Record<K, T[K][]>;
  }
}

export default new ObjectUtils();
