import { useState } from 'react';
import { useTaskStore } from '../stores';
import Sawl from 'sweetalert2';
import { TaskStatus } from '../interfaces';

interface Options {
  status: TaskStatus
}

export const useTasks = ({status}: Options) => {
    const isDragging = useTaskStore(state => !!state.draggingTaskId)  
    const onTaskDrop = useTaskStore(state => state.onTaskDrop) 
    const addTask = useTaskStore(state => state.addTask) 

    const [onDragOver, setOnDragOver] = useState(false)


    const handleAddTask = async() => {
      const {isConfirmed,  value} = await Sawl.fire({
        title: 'Nueva tarea',
        input: 'text',
        inputLabel: 'Titulo de la tarea',
        inputPlaceholder: 'Ingrese el nombre de la tarea',
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value) {
            return 'Debe ingresar un nombre para la nueva tarea.'
          } 
        }
      })

      if(!isConfirmed) return;
      
      addTask(value, status)

    }

    const handlerDragOver = (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault()
      setOnDragOver(true)
    }

    const onDragLeave = (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault()
      setOnDragOver(false)
    }
    
    const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
      ev.preventDefault()
      setOnDragOver(false)
      onTaskDrop(status)
    }

  
  return {
    // Properties
    isDragging,

    // Methods
    onDragOver,
    handleAddTask,
    handlerDragOver,
    onDragLeave,
    onDrop,
  }
}