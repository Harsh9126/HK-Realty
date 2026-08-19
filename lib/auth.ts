import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

const LOCAL_USERS_KEY = 'hk_realty_local_users';
const PRIMARY_ADMIN_EMAIL = 'mrharsh818206@gmail.com';

export const isUserAdmin = (email?: string | null): boolean => {
  if (!email) return false;
  const cleanEmail = email.toLowerCase().trim();
  if (cleanEmail === PRIMARY_ADMIN_EMAIL) return true;

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_USERS_KEY);
      if (stored) {
        const users = JSON.parse(stored);
        const match = users.find((u: any) => u.email?.toLowerCase().trim() === cleanEmail);
        if (match && match.role === 'Admin') return true;
      }
    } catch (e) {}
  }
  return false;
};

export const saveUserToLocal = (userData: any) => {
  if (typeof window === 'undefined') return;
  try {
    const existingStr = localStorage.getItem(LOCAL_USERS_KEY);
    let existing: any[] = existingStr ? JSON.parse(existingStr) : [];
    const index = existing.findIndex(
      (u: any) => (userData.uid && u.uid === userData.uid) || (userData.email && u.email?.toLowerCase() === userData.email?.toLowerCase())
    );
    if (index >= 0) {
      existing[index] = { ...existing[index], ...userData };
    } else {
      existing.unshift(userData);
    }
    localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(existing));
  } catch (e) {
    console.error('Failed to save user to localStorage:', e);
  }
};

export const syncUserDoc = async (user: User) => {
  if (!user || !user.email) return;
  const cleanEmail = user.email.toLowerCase().trim();
  const isAdmin = cleanEmail === PRIMARY_ADMIN_EMAIL || isUserAdmin(cleanEmail);
  const displayName = user.displayName || cleanEmail.split('@')[0] || 'User';

  const userObj = {
    uid: user.uid,
    id: user.uid,
    email: cleanEmail,
    name: displayName,
    displayName: displayName,
    role: isAdmin ? 'Admin' : 'User',
    status: 'Active',
    joinedDate: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  };

  saveUserToLocal(userObj);

  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: cleanEmail,
      displayName: displayName,
      role: userObj.role,
      status: 'Active',
      joinedDate: userObj.joinedDate,
      createdAt: serverTimestamp(),
    }, { merge: true });
  } catch (err) {
    try {
      const userRef = doc(db, 'users', user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        email: cleanEmail,
        displayName: displayName,
        role: userObj.role,
        status: 'Active',
        joinedDate: userObj.joinedDate,
        createdAt: new Date().toISOString(),
      }, { merge: true });
    } catch (e) {
      console.error('Error syncing user doc to Firestore:', e);
    }
  }
};

// Global listener to ensure user profiles are always saved to Firestore upon login/register
if (typeof window !== 'undefined') {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      syncUserDoc(user);
    }
  });
}

export const loginWithEmail = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  if (result.user) {
    await syncUserDoc(result.user);
  }
  return result;
};

export const registerWithEmail = async (
  email: string,
  password: string,
  displayName: string
) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  if (result.user) {
    try {
      await updateProfile(result.user, { displayName });
    } catch (e) {}
    await syncUserDoc(result.user);
  }
  return result;
};

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  if (result.user) {
    await syncUserDoc(result.user);
  }
  return result;
};

export const logout = () => signOut(auth);

export const getUserData = async (uid: string) => {
  try {
    const snap = await getDoc(doc(db, 'users', uid));
    if (snap.exists()) return snap.data();
  } catch (err) {}

  if (typeof window !== 'undefined') {
    try {
      const local = localStorage.getItem(LOCAL_USERS_KEY);
      if (local) {
        const users = JSON.parse(local);
        return users.find((u: any) => u.uid === uid || u.id === uid) || null;
      }
    } catch (e) {}
  }
  return null;
};



