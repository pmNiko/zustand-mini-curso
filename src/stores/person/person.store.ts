import { create, type StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
// import { customSessionStorage } from '../storages/session.storage';
import { firebaseStorage } from '../storages/firebase.storage';


interface PersonState {
  firstName: string
  lastName: string
}


interface Actions {
  setFirstName(firstName: string): void
  setLastName(lastName: string): void
}


const storeAPI: StateCreator<PersonState & Actions> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(state => ({firstName: value})),
  setLastName: (value: string) => set(state => ({lastName: value})),

})



export const usePersonStore = create<PersonState & Actions>()( 
  persist(
    storeAPI,  
    {
      name: 'person-storage', 
      // storage: customSessionStorage
      storage: firebaseStorage
    }              
  )
);