// stores/publicWorksStore.ts
import { defineStore } from 'pinia';
import type { PublicWorkResponse } from '../api/public/work/types';
import { fetchPublicWorkById, fetchPublicWorks } from '../api/public/work/works';

export const usePublicWorksStore = defineStore('publicWorks', {
  state: () => ({
    works: [] as PublicWorkResponse[],
    selectedWork: null as PublicWorkResponse | null,
  }),
  actions: {
    async loadWorks() {
      this.works = await fetchPublicWorks();
    },
    selectWork(work: PublicWorkResponse) {
      this.selectedWork = work;
    },
    async loadWorkById(id: number) {
      this.selectedWork = await fetchPublicWorkById(id);
    },
  },
});
