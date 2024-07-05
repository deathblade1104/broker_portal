class ArrayUtils {
  hasDuplicates<T>(array: T[]): boolean {
    const set = new Set<T>();

    for (const element of array) {
      if (set.has(element)) {
        return true;
      }
      set.add(element);
    }

    return false;
  }

  getUnique<T>(array: T[]): T[] {
    const set = new Set<T>(),
      res: T[] = [];

    for (const element of array) {
      if (!set.has(element)) {
        res.push(element);
      }
      set.add(element);
    }

    return res;
  }
}

export default new ArrayUtils();
