import { ref } from 'vue';
import type { Career, Certificate, Hobby, Event } from './types/indet';
import {
  getCareers,
  getCertificates,
  getEvents,
  getHobbies,
  updateCareer,
  updateCertificate,
  updateEvent,
  updateHobby,
} from '../../../api/profile';

export const useProfileItems = () => {
  const hobbies = ref<Hobby[]>([]);
  const careers = ref<Career[]>([]);
  const events = ref<Event[]>([]);
  const certificates = ref<Certificate[]>([]);
  const itemErrorMessage = ref<string | null>(null);

  // --- 初期取得 ---
  const fetchAllProfileItems = async () => {
    try {
      const [h, c, e, certs] = await Promise.all([
        getHobbies(),
        getCareers(),
        getEvents(),
        getCertificates(),
      ]);
      hobbies.value = h;
      careers.value = c;
      events.value = e;
      certificates.value = certs;
    } catch (err: any) {
      itemErrorMessage.value = err.message || 'プロフィール項目の取得に失敗しました';
    }
  };

  // --- 一括更新 ---
  const updateAllProfileItems = async () => {
    itemErrorMessage.value = null;

    try {
      const hobbyItemRequest = hobbies.value.map(({ name }) => ({ name }));
      const hobbyRequest = { hobbies: hobbyItemRequest };

      const careerItemRequest = careers.value.map(({ year, name }) => ({ year, name }));
      const careerRequest = { careers: careerItemRequest };

      const eventItemRequest = events.value.map(({ year, name }) => ({ year, name }));
      const eventRequest = { events: eventItemRequest };

      const certificateItemRequest = certificates.value.map(({ year, name }) => ({ year, name }));
      const certificateRequest = { certificates: certificateItemRequest };

      // 各カテゴリを一括更新（API側はListRequestを受け取る）
      await Promise.all([
        updateHobby(hobbyRequest),
        updateCareer(careerRequest),
        updateEvent(eventRequest),
        updateCertificate(certificateRequest),
      ]);

      return { success: true };
    } catch (err: any) {
      itemErrorMessage.value = err.message || '更新中にエラーが発生しました';
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
