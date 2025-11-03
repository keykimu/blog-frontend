import { ref } from 'vue';
import type { Users } from './types';
import { getUsersAPI } from '../../../api/admin/users';

export const useUsers = () => {
  const users = ref<Users[]>([]);
  const errorMessageUsers = ref<string | null>(null);

  const fetchUsers = async () => {
    try {
      users.value = await getUsersAPI();
      users.value = users.value.map(user=>({
        username: user.username,
        lastLoginAt:(()=>{
          const d = new Date(user.lastLoginAt);
          return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 ${d.getHours()}時${d.getMinutes()}分`;
        })()
      }));
    } catch (err: any) {
      errorMessageUsers.value = err?.message || '通信に失敗しました';
    }
  };

  return { users, errorMessageUsers, fetchUsers };
};
