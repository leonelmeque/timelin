import { useState, useEffect } from 'react';
import { UserProps } from '../shared-types';

export function useFetchAvatar<T = unknown>(id: T): UserProps[] {
  const [avatar, setAvatar] = useState<any>(null);

  const getSingleAvatar = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:3001/users?id=${id}`);
      const data = (await res.json()) as [UserProps];
      return data[0];
    } catch (e) {
      console.error(e as Error);
      return [];
    }
  };

  const getMultipleAvatar = async () => {
    if (!id) return [];

    try {
      const avatars = await Promise.all(
        (id as string[]).map((value) => getSingleAvatar(value))
      );

      return avatars;
    } catch (error) {
      console.error(error as Error);
      return [];
    }
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
