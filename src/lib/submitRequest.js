import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase.js'

// Firestore rejects `undefined` values, so strip them recursively before writing.
function scrub(value) {
  if (Array.isArray(value)) {
    return value.map(scrub).filter((item) => item !== undefined)
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, scrub(v)]),
    )
  }
  return value
}

// Persists a project request into the `requests` collection. Anonymous clients
// are allowed to create (rules), but only the admin can read/update.
export async function submitRequest(payload) {
  const doc = {
    ...scrub(payload),
    status: 'new',
    source: 'web',
    createdAt: serverTimestamp(),
  }
  const ref = await addDoc(collection(db, 'requests'), doc)
  return ref.id
}
