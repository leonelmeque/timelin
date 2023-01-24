import { useState, useEffect } from 'react';
import { UserProps } from '../shared-types';

export function useFetchAvatar<T = unknown>(id: T): UserProps[] {
  const [avatar, setAvatar] = useState<any>(null);

  const getSingleAvatar = async (id: string) => {
    const res = await fetch(`http://localhost:3001/users?id=${id}`);
    const data = (await res.json()) as [UserProps];
    return data[0];
  };

  const getMultipleAvatar = async () => {
    const avatars = Promise.all(
      (id as string[]).map((value) => getSingleAvatar(value))
    );

    return avatars;
  };

  useEffect(() => {
    if (typeof id === 'string') {
      getSingleAvatar(id).then((singleAvatar) => {
        setAvatar(singleAvatar);
      });
    } else {
      getMultipleAvatar().then((multipleAvatar) => {
        setAvatar(multipleAvatar);
      });
    }
  }, [id]);

  return avatar;
}
