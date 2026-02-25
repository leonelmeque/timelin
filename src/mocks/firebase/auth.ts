import { setDoc } from './store';

type AuthUser = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  getIdToken: () => Promise<string>;
  updateProfile: (profile: { displayName?: string; photoURL?: string }) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  sendEmailVerification: () => Promise<void>;
  delete: () => Promise<void>;
  reauthenticateWithCredential: (credential: any) => Promise<any>;
};

type AuthStateCallback = (user: AuthUser | null) => void;

let currentUser: AuthUser | null = null;
const authStateListeners: AuthStateCallback[] = [];

function seedUserDoc(uid: string, email: string, username?: string) {
  setDoc(`users/${uid}`, {
    id: uid,
    email,
    username: username || email.split('@')[0],
    fullname: username || email.split('@')[0],
    avatar: null,
    birthdate: null,
    phonenumber: null,
    createdAt: new Date().toISOString(),
  });
}

function createMockUser(uid: string, email: string, displayName?: string): AuthUser {
  return {
    uid,
    email,
    displayName: displayName || email.split('@')[0],
    photoURL: null,
    emailVerified: true,
    phoneNumber: null,
    getIdToken: async () => `mock-token-${uid}`,
    updateProfile: async (profile) => {
      if (currentUser) {
        if (profile.displayName !== undefined) currentUser.displayName = profile.displayName;
        if (profile.photoURL !== undefined) currentUser.photoURL = profile.photoURL;
      }
    },
    updateEmail: async (newEmail) => {
      if (currentUser) currentUser.email = newEmail;
    },
    updatePassword: async () => {},
    sendEmailVerification: async () => {},
    delete: async () => {
      currentUser = null;
      notifyListeners();
    },
    reauthenticateWithCredential: async () => ({ user: currentUser }),
  };
}

function notifyListeners() {
  authStateListeners.forEach((cb) => cb(currentUser));
}

function auth() {
  return {
    get currentUser() {
      return currentUser;
    },
    createUserWithEmailAndPassword: async (email: string, _password: string) => {
      const uid = `mock-uid-${Date.now()}`;
      currentUser = createMockUser(uid, email);
      seedUserDoc(uid, email);
      notifyListeners();
      return { user: currentUser };
    },
    signInWithEmailAndPassword: async (email: string, _password: string) => {
      const uid = `mock-uid-${email.replace(/[^a-z0-9]/gi, '')}`;
      currentUser = createMockUser(uid, email);
      seedUserDoc(uid, email);
      notifyListeners();
      return { user: currentUser };
    },
    signOut: async () => {
      currentUser = null;
      notifyListeners();
    },
    onAuthStateChanged: (callback: AuthStateCallback) => {
      authStateListeners.push(callback);
      setTimeout(() => callback(currentUser), 0);
      return () => {
        const idx = authStateListeners.indexOf(callback);
        if (idx >= 0) authStateListeners.splice(idx, 1);
      };
    },
    sendPasswordResetEmail: async (_email: string) => {},
  };
}

auth.EmailAuthProvider = {
  credential: (email: string, _password: string) => ({ email, providerId: 'password' }),
};

export type FirebaseAuthTypes = {
  User: AuthUser;
};

export default auth;
