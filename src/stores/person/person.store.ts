import { create, type StateCreator } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
// import { customSessionStorage } from '../storages/session.storage';
import { firebaseStorage } from '../storages/firebase.storage';
// import { logger } from '../middlewares/logger.middleware';


interface PersonState {
  firstName: string
  lastName: string
}


interface Actions {
  setFirstName(firstName: string): void
  setLastName(lastName: string): void
}


const storeAPI: StateCreator<PersonState & Actions, [["zustand/devtools", never]]> = (set) => ({
  firstName: '',
  lastName: '',

  setFirstName: (value: string) => set(({firstName: value}),false, 'setFirstName'),
  setLastName:  (value: string) => set(({lastName: value} ),false, 'setLastName'),
})



export const usePersonStore = create<PersonState & Actions>()( 
  // logger(
    devtools(
      persist(
        storeAPI,  
        {
          name: 'person-storage', 
          // storage: customSessionStorage
          storage: firebaseStorage
        }              
      )
    )
  // )
);