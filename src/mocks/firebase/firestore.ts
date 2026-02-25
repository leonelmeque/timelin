import { firestoreData } from './store';

function getStorePath(parts: string[]): string {
  return parts.join('/');
}

function createDocRef(pathParts: string[]) {
  const path = getStorePath(pathParts);
  const docId = pathParts[pathParts.length - 1];

  const ref: any = {
    id: docId,
    path,
    set: async (data: Record<string, any>) => {
      firestoreData[path] = { ...data };
      return;
    },
    get: async () => {
      const data = firestoreData[path] || null;
      return {
        exists: !!data,
        data: () => data,
        id: docId,
      };
    },
    update: async (data: Record<string, any>) => {
      firestoreData[path] = { ...(firestoreData[path] || {}), ...data };
      return;
    },
    delete: async () => {
      delete firestoreData[path];
      return;
    },
    collection: (subName: string) => createCollectionRef([...pathParts, subName]),
  };

  return ref;
}

function createCollectionRef(pathParts: string[]) {
  const collPath = getStorePath(pathParts);

  const ref: any = {
    path: collPath,
    doc: (id?: string) => {
      const docId = id || `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      return createDocRef([...pathParts, docId]);
    },
    add: async (data: Record<string, any>) => {
      const docId = `auto-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      const docPath = getStorePath([...pathParts, docId]);
      firestoreData[docPath] = { ...data, id: docId };
      return createDocRef([...pathParts, docId]);
    },
    get: async () => {
      const prefix = collPath + '/';
      const docs = Object.entries(firestoreData)
        .filter(([key]) => {
          if (!key.startsWith(prefix)) return false;
          const rest = key.slice(prefix.length);
          return !rest.includes('/');
        })
        .map(([key, val]) => ({
          id: key.split('/').pop(),
          data: () => val,
          exists: true,
        }));
      return { docs, empty: docs.length === 0, size: docs.length };
    },
    where: (_field: string, _op: string, _value: any) => {
      return {
        get: async () => {
          const prefix = collPath + '/';
          const docs = Object.entries(firestoreData)
            .filter(([key, val]) => {
              if (!key.startsWith(prefix)) return false;
              const rest = key.slice(prefix.length);
              if (rest.includes('/')) return false;
              return val[_field] === _value;
            })
            .map(([key, val]) => ({
              id: key.split('/').pop(),
              data: () => val,
              exists: true,
            }));
          return { docs, empty: docs.length === 0, size: docs.length };
        },
      };
    },
  };

  return ref;
}

function firestore() {
  return {
    collection: (name: string) => createCollectionRef([name]),
  };
}

export default firestore;
