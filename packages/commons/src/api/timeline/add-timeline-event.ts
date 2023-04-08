import firebase from 'firebase';

export const addTimelineEvent = async (id: string, payload: Event[]) => {
  const ref = firebase
    .firestore()
    .collection('users')
    .doc(firebase.auth().currentUser?.uid)
    .collection('events')
    .doc();

  await ref.set({
    ...payload,
    id: ref.id,
  });

  return {
    ...payload,
    id: ref.id,
  };
};
