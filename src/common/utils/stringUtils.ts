class StringUtils {
  cleanStringAndConvertToLowerCase(input: string): string {
    const output = input.trim().replace(/\s+/g, ' ').toLowerCase();
    return output;
  }

  cleanString(input: string): string {
    const output = input.trim().replace(/\s+/g, ' ');
    return output;
  }
}

export default new StringUtils();
