import { ref } from 'vue';
import type { Hobby, Career, Event, Certificate, ProfileItemsRequest } from './types/index';
import { getProfileItems, updateProfileItems } from '../../../api/profile';

export const useProfileItems = () => {
  const hobbies = ref<Hobby[]>([]);
  const careers = ref<Career[]>([]);
  const events = ref<Event[]>([]);
  const certificates = ref<Certificate[]>([]);
  const itemErrorMessage = ref<string | null>(null);

  // --- 初期取得 ---
  const fetchAllProfileItems = async () => {
    try {
      const data = await getProfileItems();
      hobbies.value = data.hobbyResponse;
      careers.value = data.careerResponse;
      events.value = data.eventResponse;
      certificates.value = data.certificateResponse;
    } catch (err: any) {
      itemErrorMessage.value = err?.message || '通信に失敗しました';
    }
  };

  // --- 一括更新 ---
  const updateAllProfileItems = async () => {
    itemErrorMessage.value = null;
    try {
      const request: ProfileItemsRequest = {
        hobbyListRequest: { hobbies: hobbies.value.map(({ name }) => ({ name })) },
        careerListRequest: { careers: careers.value.map(({ year, name }) => ({ year, name })) },
        eventListRequest: { events: events.value.map(({ year, name }) => ({ year, name })) },
        certificateListRequest: { certificates: certificates.value.map(({ year, name }) => ({ year, name })) },
      };

      await updateProfileItems(request);
      return { success: true };
    } catch (err: any) {
      itemErrorMessage.value = err?.message || '通信に失敗しました';
      return { success: false, error: itemErrorMessage.value };
    }
  };

  // --- CRUD 操作（ローカル用） ---
  const addHobby = () => hobbies.value.push({ id: 1, name: '', createdAt: '', updatedAt: '' });
  const removeHobby = (index: number) => hobbies.value.splice(index, 1);

  const addCareer = () =>
    careers.value.push({ id: 1, year: '', name: '', createdAt: '', updatedAt: '' });
  const removeCareer = (index: number) => careers.value.splice(index, 1);

  const addEvent = () =>
    events.value.push({ id: 1, year: '', name: '', createdAt: '', updatedAt: '' });
  const removeEvent = (index: number) => events.value.splice(index, 1);

  const addCertificate = () =>
    certificates.value.push({ id: 1, year: '', name: '', createdAt: '', updatedAt: '' });
  const removeCertificate = (index: number) => certificates.value.splice(index, 1);

  return {
    hobbies,
    careers,
    events,
    certificates,
    itemErrorMessage,
    fetchAllProfileItems,
    updateAllProfileItems,
    addHobby,
    removeHobby,
    addCareer,
    removeCareer,
    addEvent,
    removeEvent,
    addCertificate,
    removeCertificate,
  };
};
