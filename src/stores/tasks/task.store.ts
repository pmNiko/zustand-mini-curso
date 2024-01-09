import { StateCreator, create } from 'zustand';
import type { Task, TaskStatus } from '../../interfaces';
import { devtools } from 'zustand/middleware';


interface TaskState {
  draggingTaskId?: string;

  tasks: Record<string, Task>  // { [key: string]: Task }
  
  getTaskByStatus: (status: TaskStatus) => Task[]

  setDraggingTaskId: (taskId: string) => void
  removeDraggingTaskId: () => void
  changeTaskStatus: (taskId: string, status: TaskStatus) => void
  onTaskDrop: (status: TaskStatus) => void
}


const storeApi: StateCreator<TaskState> = (set,get) => ({
  draggingTaskId: undefined,

  tasks: {
    'ABC-1': {id: 'ABC-1', title: 'Tasks #1', status: 'open'},
    'ABC-2': {id: 'ABC-2', title: 'Tasks #2', status: 'in-progress'},
    'ABC-3': {id: 'ABC-3', title: 'Tasks #3', status: 'open'},
    'ABC-4': {id: 'ABC-4', title: 'Tasks #4', status: 'open'}
  },

  getTaskByStatus: (status) => 
     Object.values(get().tasks).filter(task => task.status === status),

  setDraggingTaskId: (taskId) => set({draggingTaskId: taskId}),

  removeDraggingTaskId: () => set({draggingTaskId: undefined}),

  changeTaskStatus: (taskId, status) => {
    const task = get().tasks[taskId];
    task.status = status;

    set((state) => ({
      tasks: {
        ...state.tasks,
        [taskId] : task        
      }
    }))
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
    storeApi
  )
)