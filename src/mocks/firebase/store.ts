export const firestoreData: Record<string, Record<string, any>> = {};

export function setDoc(path: string, data: Record<string, any>) {
  firestoreData[path] = { ...data };
}

export function getDoc(path: string): Record<string, any> | null {
  return firestoreData[path] || null;
}
