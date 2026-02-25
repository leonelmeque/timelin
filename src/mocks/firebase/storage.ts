const uploadedFiles: Record<string, { data: any; metadata: any }> = {};

function createRef(path: string) {
  return {
    child: (childPath: string) => createRef(`${path}/${childPath}`),
    put: (blob: any, metadata?: any) => {
      uploadedFiles[path] = { data: blob, metadata };

      const taskRef = createRef(path);

      const task: any = {
        ref: taskRef,
        snapshot: {
          bytesTransferred: 100,
          totalBytes: 100,
          state: 'success',
          task: {
            on: (_event: string, _onProgress: any, _onError: any, onComplete: any) => {
              if (onComplete) setTimeout(onComplete, 10);
            },
            ref: taskRef,
          },
        },
        on: (_event: string, onProgress: any, _onError: any, onComplete: any) => {
          if (onProgress) {
            setTimeout(() => onProgress({ bytesTransferred: 100, totalBytes: 100, state: 'success' }), 5);
          }
          if (onComplete) setTimeout(onComplete, 10);
          return () => {};
        },
      };

      return task;
    },
    getDownloadURL: async () => `https://mock-storage.example.com/${path}`,
    fullPath: path,
  };
}

function storage() {
  return {
    ref: (path?: string) => createRef(path || ''),
  };
}

export type FirebaseStorageTypes = {
  TaskSnapshot: any;
  Reference: any;
};

export default storage;
