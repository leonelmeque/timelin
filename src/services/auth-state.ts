export type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
};

type AuthStateCallback = (user: AuthUser | null) => void;

let currentUser: AuthUser | null = null;
const listeners: AuthStateCallback[] = [];

function notifyListeners() {
  listeners.forEach((cb) => cb(currentUser));
}

export const authState = {
  getUser: () => currentUser,

  setUser: (user: AuthUser | null) => {
    currentUser = user;
    notifyListeners();
  },

  updateUser: (updates: Partial<AuthUser>) => {
    if (currentUser) {
      currentUser = { ...currentUser, ...updates };
      notifyListeners();
    }
  },

  onAuthStateChanged: (callback: AuthStateCallback) => {
    listeners.push(callback);
    setTimeout(() => callback(currentUser), 0);
    return () => {
      const idx = listeners.indexOf(callback);
      if (idx >= 0) listeners.splice(idx, 1);
    };
  },

  clear: () => {
    currentUser = null;
    notifyListeners();
  },
};
