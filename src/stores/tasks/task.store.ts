import { StateCreator, create } from 'zustand';
import type { Task, TaskStatus } from '../../interfaces';
import { devtools, persist } from 'zustand/middleware';
import {v4 as uuidv4} from 'uuid'
// import { produce } from 'immer'
import { immer } from 'zustand/middleware/immer';

interface TaskState {
  draggingTaskId?: string;

  tasks: Record<string, Task>  // { [key: string]: Task }
  
  getTaskByStatus:  (status: TaskStatus) => Task[]
  addTask:          (title:string, status:TaskStatus ) => void 
  totalTasks:       () => number

  setDraggingTaskId:    (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus:     (taskId: string, status: TaskStatus) => void
  onTaskDrop:           (status: TaskStatus) => void
}


const storeApi: StateCreator<TaskState, [["zustand/immer", never]]> = (set,get) => ({
  draggingTaskId: undefined,

  tasks: {
    'ABC-1': {id: 'ABC-1', title: 'Tasks #1', status: 'open'},
    'ABC-2': {id: 'ABC-2', title: 'Tasks #2', status: 'in-progress'},
    'ABC-3': {id: 'ABC-3', title: 'Tasks #3', status: 'open'},
    'ABC-4': {id: 'ABC-4', title: 'Tasks #4', status: 'open'}
  },

  getTaskByStatus: (status) => 
     Object.values(get().tasks).filter(task => task.status === status),

  addTask: (title, status) => {
    const newTask = {id: uuidv4(), title, status}

    set( state => {
      state.tasks[newTask.id] = newTask
    })

    //? Requiere yarn add immer
    // set( produce((state: TaskState) => {
    //     state.tasks[newTask.id] = newTask;
    //   })    
    // )

    //? Forma nativa de zustand
    // set( state => ({
    //   tasks: {
    //     ...state.tasks,
    //     [newTask.id]: newTask,
    //   }
    // }))
  },

  totalTasks: () => Object.entries(get().tasks).length,

  setDraggingTaskId: (taskId) => set({draggingTaskId: taskId}),

  removeDraggingTaskId: () => set({draggingTaskId: undefined}),

  changeTaskStatus: (taskId, status) => {
    // const taskUpdate = get().tasks[taskId];    
    // taskUpdate.status = status;

    set( state => { 
        state.tasks[taskId] = {
          ...state.tasks[taskId],
          status
        }
     })

    // set((state) => ({
    //   tasks: {
    //     ...state.tasks,
    //     [taskUpdate.id] : taskUpdate        
    //   }
    // }))
  },

  onTaskDrop: (status) => {
    const taskId = get().draggingTaskId;
    if ( !taskId ) return;

    get().changeTaskStatus(taskId, status)
    get().removeDraggingTaskId()
  }
 
})



export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(
        storeApi
      ),
      {
        name: 'tasks-store',
      }
    )
  )
)