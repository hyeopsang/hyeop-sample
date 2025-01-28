import WriteForm from "./_components/writeForm";

export default function WritePage(){
    return (
        <div className="max-w-full min-w-[800px] mx-auto">
            <div className="w-[800px] h-[70px] flex flex-wrap mx-auto text-left">
                <WriteForm/> 
            </div>
        </div>
    )
}