export const excludeFields = <T>(data: T | T[], fields: string[]): T | T[] => {
  if (Array.isArray(data)) {
    return data.map((item) => excludeFields(item, fields)) as T[];
  } else {
    const result = { ...data } as Record<string, any>;
    fields.forEach((field) => delete result[field]);
    return result as T;
  }
};
