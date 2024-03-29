interface DataObject {
  [key: string]: any;
}

export function changeIdToUid(obj: DataObject): DataObject {
  if (Array.isArray(obj)) {
    return obj.map(changeIdToUid);
  } else if (typeof obj === "object" && obj !== null) {
    const { id, ...rest } = obj;
    const newObj = { uid: id, ...rest };
    return Object.fromEntries(
      Object.entries(newObj).map(([key, value]) => {
        if (key === "id") {
          return ["productId", value];
        } else {
          return [key, changeIdToUid(value)];
        }
      })
    ) as DataObject;
  } else {
    return obj;
  }
}
