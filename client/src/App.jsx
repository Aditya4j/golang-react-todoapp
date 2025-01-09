import { useState,useEffect } from 'react'

import './App.css'
import TodoList from './Components/To-Do-List'

let endPoint = "http://localhost:8080"

const createTask = async (task)=>{
  const res = await fetch(`${endPoint}/api/task`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
})
  const data = await res.json()
  return data
}

const getAllTask = async ()=>{
  const res = await fetch(`${endPoint}/api/task`)
  const data = await res.json()
  return data
}
const TaskComplete = async (id)=>{
  const res = await fetch(`${endPoint}/api/task/${id}`,{
    method:"PUT"
  })
  const data = await res.json()
  return data
}
const UndoTask = async (id)=>{
  const res = await fetch(`${endPoint}/api/undo/${id}`,{
    method:"PUT"
  })
  const data = await res.json()
  return data
}
const deletetask = async (id)=>{
  const res = await fetch(`${endPoint}/api/deleteTask/${id}`,{
    method:"DELETE"
  })
  const data = await res.json()
  return data
}
const deleteAlltask = async ()=>{
  const res = await fetch(`${endPoint}/api/deleteAllTask}`,{
    method:"DELETE"
  })
  const data = await res.json()
  return data
}


function App() {
 
  const [task,setTask] = useState('')
  const [items,setItems] = useState([])

  useEffect(()=>{
    const fetchTask = async ()=>{
      const data = await getAllTask()
      setItems(data)
    }
    fetchTask()

  },[])

  const HandleAddTask = async ()=>{
    if(task.trim()){
      const newtask = {task:task,status:false}
      const createitem = await createTask(newtask)
      console.log(createitem)
      setItems([...items,createitem])
      setTask("")
    }
  }

  // Mark a task as complete
    const handleCompleteTask = async (id) => {
        await TaskComplete(id);
        setItems(items.map(task => 
            task.id === id ? { ...task, status: true } : task
        ));
    };

    // Delete a task
    const handleDeleteTask = async (id) => {
        await deletetask(id);
        setItems(items.filter(task => task.id !== id));
    };

    const HandleUndo = async (id)=>{
      await UndoTask(id)
      setItems(items.map(task=>task.id === id ? { ...task, status: false } : task))
    }


  return (
    <>
      <div className=' px-[20%] py-[40px] flex flex-col gap-3 '>
        <div className='flex gap-1'>
          <input type='text'value={task} onChange={(e)=>setTask(e.target.value)} placeholder='Enter your Task' className='w-[600px] border-[1px] border-black px-[10px] py-[5px] rounded-[5px] outline-none '/>
          <button onClick={HandleAddTask} className='bg-black text-white  px-[10px] py-[5px]  rounded-[5px]'>Add</button>
        </div>
        <div className='flex gap-[10px] flex-col'>
          <TodoList items={items} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask}  HandleUndo={HandleUndo}/>
        </div>
       
      </div>
      
    </>
  )
}

export default App
