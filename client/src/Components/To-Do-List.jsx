

function TodoList({handleCompleteTask,handleDeleteTask,items,HandleUndo}){
    return(

        <>
        {items.map((item,index)=>(
            <div key={item.id} className=" flex  w-[500px] flex-co">
                <div className=" w-[500px] px[10px] py-[5px] border-[1px] bg-cyan-600 rounded-[5px] ">
                <h2 style={{textDecoration: item.status ? 'line-through':'none'}}>{item.task}</h2>
                </div>
                <button onClick={()=>handleCompleteTask(item.id)} className="bg-green-500 rounded-[5px] w-auto">Done</button>
                <button onClick={()=>HandleUndo(item.id)} className="bg-yellow-500 rounded-[5px] w-auto">Undo</button>
                <button onClick={()=>handleDeleteTask(item.id)} className="bg-red-600 rounded-[5px] w-auto">Delete</button>
            </div>

        ))}
        </>
        
    )
}

export default TodoList