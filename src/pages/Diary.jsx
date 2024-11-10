import { useParams,useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-stringed-date";
import usePageTitle from "../hooks/usePageTitle";
const Diary = () => {
    const params = useParams();
    const nav = useNavigate();
    usePageTitle(`${params.id}번 일기`);
    const curDiaryItem = useDiary(params.id);

    if(!curDiaryItem){
        return <div></div>
    }

    const {createdDate,emotionId,content} = curDiaryItem;
    const title= getStringedDate(new Date(createdDate));
    return (
        <div>
            <Header
            title={`${title} 기록`}
            leftChild={<Button onClick={()=>nav(-1)} text = {"뒤로가기"}/>}
            rightChild={<Button onClick={()=>nav(`/edit/${params.id}`)} text = {"수정하기"}/>}
            />
            <Viewer emotionId={emotionId} content={content}/>
        </div>
    )
};
export default Diary;