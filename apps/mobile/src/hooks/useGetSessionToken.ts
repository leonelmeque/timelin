import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@todo/commons';
import { useEffect } from 'react';
import { useUserContext } from '../context';
import { getSessionToken } from '../utils/storage';

export async function useGetSessionStorage() {
  const [user, dispatch] = useUserContext();

  useEffect(() => {
    if (user) return;
    const iniApp = async () => {
      const token = await getSessionToken();
      if (token) {
        const result = await api.users.userSignIn({
          username: token,
          password: token,
        });
        dispatch(result.result);
      }
    };
    iniApp();
  }, []);
}
