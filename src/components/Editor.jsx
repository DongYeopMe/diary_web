import "./Editor.css"
import EmotionItem from "./EmotionItem";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const emotionList = [
    {
        emotionId :1,
        emotionName: "완전 좋음"
    },
    {
        emotionId :2,
        emotionName: "좋음"
    },
    {
        emotionId :3,
        emotionName: "보통"
    },
    {
        emotionId :4,
        emotionName: "나쁨"
    },
    {
        emotionId :5,
        emotionName: "매우 나쁨"
    },
]
const getStringedDate = (targetDate)=>{
    // 날짜 : YYYY-MM-DD
    let year = targetDate.getFullYear();
    let month = targetDate.getMonth() + 1;
    let date = targetDate.getDate();

    if(month<10){
        month = `0${month}`;
    }
    if(date< 10){
        date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
}


const Editor = ({onSubmit}) =>{
    const [input,setInput] = useState({
        createDate : new Date(),
        emotionId : 3,
        content: "",
    });
    const nav = useNavigate();

    const onChangeInput = (e) =>{
        //문자열로 저장되서 이거 방지하기 위한 저장
    let name  =e.target.name;
    let value = e.target.value;

    if(name==='createdDate'){
        value = new Date(value);
    }


        setInput({
            ...input,
            [name] : value,
        })
    };

    const onClickSubmitButton=() =>{
        onSubmit(input);
    };
    return (
        <div className="Editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input 
                name="createdDate"
                onChange={onChangeInput}
                value={getStringedDate(input.createdDate)} 
                type="date"
                />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                    {emotionList.map((item)=>
                    <EmotionItem 
                    onChange={()=>onChangeInput({
                        target:{
                            name: "emotionId",
                            value: item.emotionId,
                        }
                    })}
                    key={item.emotionId}{...item} isSelected={item.emotionId ===input.emotionId}/>)}
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea 
                name="content"
                value={input.content}
                onChange={onChangeInput}
                placeholder="오늘의 일정"/>
            </section>
            <section className="button_section">
                <Button onClick={()=>nav(-1)}text={"취소하기"}/>
                <Button onClick={onClickSubmitButton}text={"작성하기"} type={"POSITIVE"}/>
                
            </section>

        </div>
    )
}
export default Editor;