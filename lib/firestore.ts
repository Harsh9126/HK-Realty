import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';
import { sampleProperties } from '@/data/sampleProperties';
import { sampleProjects } from '@/data/sampleProjects';
import { sampleInquiries } from '@/data/sampleInquiries';

// Properties
export const getProperties = async (filters?: {
  type?: string;
  purpose?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
}) => {
  let results: any[] = [];
  try {
    const snap = await getDocs(collection(db, 'properties'));
    results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching properties from Firestore:', err);
  }

  // Combine Firestore results with sampleProperties if Firestore has few or 0 items
  if (results.length === 0) {
    results = [...sampleProperties];
  } else {
    // Merge Firestore properties with sampleProperties avoiding ID duplicates
    const dbIds = new Set(results.map((p) => p.id));
    const extraSamples = sampleProperties.filter((sp) => !dbIds.has(sp.id));
    results = [...results, ...extraSamples];
  }

  if (filters?.type && filters.type !== 'all') {
    results = results.filter((p: any) => p.type === filters.type);
  }
  if (filters?.purpose && filters.purpose !== 'all') {
    results = results.filter((p: any) => p.purpose === filters.purpose);
  }
  if (filters?.location) {
    results = results.filter((p: any) =>
      p.location?.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }
  return results;
};

export const getProperty = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, 'properties', id));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error('Error getting property:', err);
  }
  const foundSample = sampleProperties.find((p) => p.id === id);
  return foundSample || null;
};

export const addProperty = async (data: any) => {
  return addDoc(collection(db, 'properties'), { ...data, createdAt: serverTimestamp() });
};

export const updateProperty = async (id: string, data: any) => {
  return updateDoc(doc(db, 'properties', id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteProperty = async (id: string) => {
  return deleteDoc(doc(db, 'properties', id));
};

// Projects
export const getProjects = async () => {
  let results: any[] = [];
  try {
    const snap = await getDocs(collection(db, 'projects'));
    results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching projects from Firestore:', err);
  }

  if (results.length === 0) {
    results = [...sampleProjects];
  } else {
    const dbIds = new Set(results.map((p) => p.id));
    const extraSamples = sampleProjects.filter((sp) => !dbIds.has(sp.id));
    results = [...results, ...extraSamples];
  }

  return results;
};

export const getProject = async (id: string) => {
  try {
    const snap = await getDoc(doc(db, 'projects', id));
    if (snap.exists()) return { id: snap.id, ...snap.data() };
  } catch (err) {
    console.error('Error getting project:', err);
  }
  const foundSample = sampleProjects.find((p) => p.id === id);
  return foundSample || null;
};

export const addProject = async (data: any) => {
  return addDoc(collection(db, 'projects'), { ...data, createdAt: serverTimestamp() });
};

export const updateProject = async (id: string, data: any) => {
  return updateDoc(doc(db, 'projects', id), { ...data, updatedAt: serverTimestamp() });
};

export const deleteProject = async (id: string) => {
  return deleteDoc(doc(db, 'projects', id));
};

// Inquiries
export const submitInquiry = async (data: any) => {
  return addDoc(collection(db, 'inquiries'), { ...data, createdAt: serverTimestamp(), status: 'new' });
};

export const getInquiries = async () => {
  let results: any[] = [];
  try {
    const snap = await getDocs(collection(db, 'inquiries'));
    results = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.error('Error fetching inquiries from Firestore:', err);
  }

  if (results.length === 0) {
    results = [...sampleInquiries];
  } else {
    const dbIds = new Set(results.map((inq) => inq.id));
    const extraSamples = sampleInquiries.filter((si) => !dbIds.has(si.id));
    results = [...results, ...extraSamples];
  }

  return results;
};

// Wishlist
export const toggleWishlist = async (userId: string, propertyId: string, add: boolean) => {
  const userRef = doc(db, 'users', userId);
  if (add) {
    return updateDoc(userRef, { wishlist: arrayUnion(propertyId) });
  } else {
    return updateDoc(userRef, { wishlist: arrayRemove(propertyId) });
  }
};

// Blog
export const getPosts = async () => {
  const snap = await getDocs(query(collection(db, 'posts'), orderBy('createdAt', 'desc')));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getPost = async (slug: string) => {
  const q = query(collection(db, 'posts'), where('slug', '==', slug), limit(1));
  const snap = await getDocs(q);
  return snap.empty ? null : { id: snap.docs[0].id, ...snap.docs[0].data() };
};

export const addPost = async (data: any) => {
  return addDoc(collection(db, 'posts'), { ...data, createdAt: serverTimestamp() });
};

export const updatePost = async (id: string, data: any) => {
  return updateDoc(doc(db, 'posts', id), { ...data, updatedAt: serverTimestamp() });
};

export const deletePost = async (id: string) => {
  return deleteDoc(doc(db, 'posts', id));
};

// Testimonials
export const getTestimonials = async () => {
  const snap = await getDocs(collection(db, 'testimonials'));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

// Users Management
export const defaultSampleUsers = [
  { id: 'usr-1', uid: 'usr-1', name: 'Harsh Kandhol', email: 'mrharsh818206@gmail.com', role: 'Admin', joinedDate: '2025-01-15', status: 'Active', phone: '+91-98765-00000', timestampMillis: new Date('2025-01-15').getTime() },
  { id: 'usr-2', uid: 'usr-2', name: 'Rajesh Kumar', email: 'rajesh@example.com', role: 'User', joinedDate: '2025-03-10', status: 'Active', phone: '+91-98765-12345', timestampMillis: new Date('2025-03-10').getTime() },
  { id: 'usr-3', uid: 'usr-3', name: 'Priya Sharma', email: 'priya@example.com', role: 'User', joinedDate: '2025-04-02', status: 'Active', phone: '+91-98765-23456', timestampMillis: new Date('2025-04-02').getTime() },
  { id: 'usr-4', uid: 'usr-4', name: 'Amit Patel', email: 'amit.patel@example.com', role: 'User', joinedDate: '2025-04-20', status: 'Active', phone: '+91-98765-34567', timestampMillis: new Date('2025-04-20').getTime() },
  { id: 'usr-5', uid: 'usr-5', name: 'Sneha Gupta', email: 'sneha@example.com', role: 'User', joinedDate: '2025-05-11', status: 'Active', phone: '+91-98765-45678', timestampMillis: new Date('2025-05-11').getTime() },
  { id: 'usr-6', uid: 'usr-6', name: 'Vikram Singh', email: 'vikram@example.com', role: 'User', joinedDate: '2025-06-01', status: 'Blocked', phone: '+91-98765-56789', timestampMillis: new Date('2025-06-01').getTime() },
];

export const getUsers = async () => {
  let dbUsers: any[] = [];
  try {
    const snap = await getDocs(collection(db, 'users'));
    dbUsers = snap.docs.map((d) => {
      const data = d.data();
      let joinedDate = new Date().toISOString().split('T')[0];
      let timestampMillis = Date.now();
      if (data.createdAt) {
        if (typeof data.createdAt.toDate === 'function') {
          const dateObj = data.createdAt.toDate();
          joinedDate = dateObj.toISOString().split('T')[0];
          timestampMillis = dateObj.getTime();
        } else if (typeof data.createdAt === 'string') {
          joinedDate = data.createdAt.split('T')[0];
          timestampMillis = new Date(data.createdAt).getTime();
        } else if (data.createdAt.seconds) {
          const dateObj = new Date(data.createdAt.seconds * 1000);
          joinedDate = dateObj.toISOString().split('T')[0];
          timestampMillis = dateObj.getTime();
        }
      }
      const isUserAdmin = data.email?.toLowerCase().trim() === 'mrharsh818206@gmail.com' || (data.role && data.role.toLowerCase() === 'admin');
      return {
        id: d.id,
        uid: d.id,
        name: data.displayName || data.name || data.email?.split('@')[0] || 'User',
        email: data.email || '',
        role: (isUserAdmin ? 'Admin' : 'User') as 'Admin' | 'User',
        status: (data.status || 'Active') as 'Active' | 'Blocked',
        joinedDate: joinedDate,
        phone: data.phone || 'N/A',
        timestampMillis,
        ...data,
      };
    });
  } catch (error) {
    console.error('Error fetching users from Firestore:', error);
  }

  let localUsers: any[] = [];
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('hk_realty_local_users');
      if (stored) {
        localUsers = JSON.parse(stored);
      }
    } catch (e) {}
  }

  const mapByEmail = new Map<string, any>();
  const mapById = new Map<string, any>();

  const processUser = (usr: any) => {
    const emailKey = usr.email ? usr.email.toLowerCase().trim() : '';
    const idKey = usr.id || usr.uid || '';

    let existing = emailKey ? mapByEmail.get(emailKey) : (idKey ? mapById.get(idKey) : null);
    
    const isUserAdmin = emailKey === 'mrharsh818206@gmail.com' || usr.role === 'Admin' || existing?.role === 'Admin';
    const role: 'Admin' | 'User' = isUserAdmin ? 'Admin' : 'User';

    const merged = {
      id: existing?.id || idKey || `usr-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      uid: existing?.uid || idKey || `usr-${Date.now()}`,
      name: usr.name || usr.displayName || existing?.name || (emailKey ? emailKey.split('@')[0] : 'User'),
      displayName: usr.displayName || usr.name || existing?.displayName || 'User',
      email: emailKey || existing?.email || '',
      role: role,
      status: usr.status || existing?.status || 'Active',
      joinedDate: usr.joinedDate || existing?.joinedDate || new Date().toISOString().split('T')[0],
      phone: usr.phone || existing?.phone || 'N/A',
      timestampMillis: usr.timestampMillis || existing?.timestampMillis || (usr.createdAt ? new Date(usr.createdAt).getTime() : Date.now()),
    };

    if (emailKey) mapByEmail.set(emailKey, merged);
    if (idKey) mapById.set(idKey, merged);
  };

  // Process in order: default sample -> local storage -> firestore DB (overrides with real auth data)
  defaultSampleUsers.forEach(processUser);
  localUsers.forEach(processUser);
  dbUsers.forEach(processUser);

  const emailValues = Array.from(mapByEmail.values());
  const idValues = Array.from(mapById.values());
  const combined = emailValues.concat(idValues);

  const finalUsers: any[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < combined.length; i++) {
    const u = combined[i];
    const key = u.email ? u.email.toLowerCase().trim() : (u.id || u.uid);
    if (key && !seen.has(key)) {
      seen.add(key);
      finalUsers.push(u);
    }
  }

  finalUsers.sort((a, b) => (b.timestampMillis || 0) - (a.timestampMillis || 0));
  return finalUsers;
};

export const createAdminManually = async (data: { name: string; email: string; phone?: string; password?: string }) => {
  const newId = `admin-${Date.now()}`;
  const cleanEmail = data.email.toLowerCase().trim();
  const adminObj = {
    id: newId,
    uid: newId,
    name: data.name,
    displayName: data.name,
    email: cleanEmail,
    role: 'Admin' as const,
    status: 'Active' as const,
    joinedDate: new Date().toISOString().split('T')[0],
    phone: data.phone || 'N/A',
    createdAt: new Date().toISOString(),
    timestampMillis: Date.now(),
  };

  if (typeof window !== 'undefined') {
    try {
      const existingStr = localStorage.getItem('hk_realty_local_users');
      let existing: any[] = existingStr ? JSON.parse(existingStr) : [];
      // Remove any non-admin record with same email
      existing = existing.filter(u => u.email?.toLowerCase().trim() !== cleanEmail);
      existing.unshift(adminObj);
      localStorage.setItem('hk_realty_local_users', JSON.stringify(existing));
    } catch (e) {}
  }

  try {
    await setDoc(doc(db, 'users', newId), {
      uid: newId,
      email: cleanEmail,
      displayName: data.name,
      role: 'Admin',
      status: 'Active',
      phone: data.phone || '',
      createdAt: serverTimestamp(),
    }, { merge: true });
  } catch (e) {
    console.error('Failed to create admin doc in Firestore:', e);
  }

  return adminObj;
};

export const createUserManually = createAdminManually;

export const updateUserStatus = async (uid: string, status: 'Active' | 'Blocked') => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('hk_realty_local_users');
      if (stored) {
        let users: any[] = JSON.parse(stored);
        users = users.map(u => u.id === uid || u.uid === uid ? { ...u, status } : u);
        localStorage.setItem('hk_realty_local_users', JSON.stringify(users));
      }
    } catch (e) {}
  }
  try {
    await updateDoc(doc(db, 'users', uid), { status });
  } catch (err) {
    console.error('Error updating user status in Firestore:', err);
  }
};

export const deleteUserDoc = async (uid: string) => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('hk_realty_local_users');
      if (stored) {
        let users: any[] = JSON.parse(stored);
        users = users.filter(u => u.id !== uid && u.uid !== uid);
        localStorage.setItem('hk_realty_local_users', JSON.stringify(users));
      }
    } catch (e) {}
  }
  try {
    await deleteDoc(doc(db, 'users', uid));
  } catch (err) {
    console.error('Error deleting user doc in Firestore:', err);
  }
};

export const updateUserRole = async (uid: string, role: 'Admin' | 'User') => {
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('hk_realty_local_users');
      if (stored) {
        let users: any[] = JSON.parse(stored);
        users = users.map(u => u.id === uid || u.uid === uid ? { ...u, role } : u);
        localStorage.setItem('hk_realty_local_users', JSON.stringify(users));
      }
    } catch (e) {}
  }
  try {
    await updateDoc(doc(db, 'users', uid), { role });
  } catch (err) {
    console.error('Error updating user role in Firestore:', err);
  }
};


