import { StateStorage, createJSONStorage } from 'zustand/middleware';


const firebaseUrl = 'https://zustand-storage-36683-default-rtdb.firebaseio.com/zustand'


const storageApi: StateStorage = {
  getItem:  async function ( name: string ): Promise<string | null> {
    try {
      const data = await fetch(`${firebaseUrl}/${name}.json`).then(res => res.json())
      console.log(data);      
      return JSON.stringify(data);
    } catch (error) { throw error }
  },
  setItem: async function ( name: string, value: string ): Promise<void>  {
    const data = await fetch(`${firebaseUrl}/${name}.json`, {
      method: 'PUT',
      body: value
    })
      .then(res => res.json())

      console.log(data);
      
      return;
  },
  removeItem: function ( name: string ): void | Promise<void> {
    console.log("RemoveItem: ", name);
    
  }
}


export const firebaseStorage = createJSONStorage( () => storageApi)