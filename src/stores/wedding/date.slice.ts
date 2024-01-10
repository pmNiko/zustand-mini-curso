import { StateCreator } from 'zustand';



export interface DateSlice {
  eventDate: Date;

  eventYYYMMDD: () => string;
  eventHHMM: () => string;

  setEventDate: (partialDate: string) => void;
  setEventTime: (partialTime: string) => void;
}



export const createDateSlice: StateCreator<DateSlice> = (set, get) => ({
  eventDate: new Date(),


  eventYYYMMDD: () => {
    return get().eventDate.toISOString().split('T')[0]
  },

  eventHHMM: () => {
    const hours = get().eventDate.getHours().toString().padStart(2, '0'); // 01
    const minutes = get().eventDate.getMinutes().toString().padStart(2, '0'); // 01

    return `${hours}:${minutes}`
  },


  setEventDate: (partialDate: string) => set( (state) => {
    const date = new Date(partialDate);

    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate() + 1;

    const newDate = new Date(state.eventDate);

    newDate.setFullYear(year, month, day);

    return {
      eventDate: newDate 
    }
    
  }),

  setEventTime: (partialTime: string) => set( (state) => {
    const hours   = parseInt(partialTime.split(':')[0]); 
    const minutes = parseInt(partialTime.split(':')[1]);
    
    const newDate = new Date(state.eventDate);
    newDate.setHours(hours, minutes)

    return { 
      eventDate: newDate
    }
  })


})