import './App.css'
import {Routes,Route} from 'react-router-dom';
import { createContext, useEffect, useReducer, useRef, useState} from 'react';
import Home from "./pages/Home";
import Diary from './pages/Diary';
import New from './pages/New';
import Notfound from './pages/Notfound';
import Edit from './pages/Edit';


function reducer(state,action){
  let nextState;
  switch(action.type){
    case "INIT":
      return action.data;
    case 'CREATE': {nextState = [action.data,...state];
      break;
    }
    case "UPDATE" :
      {nextState= state.map((item) =>
        String(item.id) === String(action.data.id)
         ? action.data 
         : item
      );
    break;
  }
    case "DELETE":
      {nextState =
        state.filter(
        (item)=> String(item.id) !== String(action.id)
      );
    break;
  }
    default :
    return state;
  }

  localStorage.setItem("diary",JSON.stringify(nextState));
  return state;
}

export const DiaryStateContext =  createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading,setIsLoading] = useState(true);
  const [data,dispatch] = useReducer(reducer, []);
  const idRef= useRef(0);

  useEffect(()=>{
    const storedData = localStorage.getItem("diary");
    if(!storedData){
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storedData);
    if(Array.isArray(parsedData)){
      setIsLoading(false);
      return ;
    }

    let maxId=0;
    parsedData.forEach((item) =>{
      if(Number(item.id)> maxId){
        maxId = Number(item.id);
      }
    })

    idRef.current = maxId+1;

    dispatch({
      type:"INIT",
      data: parsedData,
    });
    setIsLoading(false);
  },[])

  //create
  const onCreate = (createdDate,emotionId,content) =>{
    dispatch({
      type : "CREATE",
      data : {
        id : idRef.current++,
        createdDate,
        emotionId,
        content,
      }
    })
  }
  //Update
  const onUpdate = (id,createdDate,emotionId,content) =>{
    dispatch({
      type : "UPDATE",
      data : {
        id,createdDate,emotionId,content
      }
    })
  }
  //delete
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    })
  }

  if(isLoading){
    return <div>데이터 로딩중입니다.</div>;
  }
  return (
    <>
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={{
        onCreate,
        onUpdate,
        onDelete,
      }}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<New />} />
        <Route path="/diary/:id" element={<Diary />} />
        <Route path="/edit/:id" element={<Edit/>}/>
        <Route path="*" element={<Notfound />} />
        </Routes>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
    </>
  );
}

export default App;
