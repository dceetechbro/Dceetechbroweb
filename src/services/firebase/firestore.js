import {
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';

import { db } from './firebase';

export async function submitProjectEnquiry(data) {
  const enquiryRef = await addDoc(
    collection(db, 'projectEnquiries'),
    {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    },
  );

  return enquiryRef.id;
}

export async function submitTalentRequest(data) {
  const requestRef = await addDoc(
    collection(db, 'talentRequests'),
    {
      ...data,
      status: 'new',
      createdAt: serverTimestamp(),
    },
  );

  return requestRef.id;
}