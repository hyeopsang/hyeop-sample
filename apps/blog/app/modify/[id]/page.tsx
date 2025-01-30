import Modify from "./_components/modify";
interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function ModifyPage({ params }: Props) {
  return (
    <div className="max-w-full min-w-[800px] mx-auto">
      <div className="w-[800px] h-[70px] flex flex-wrap mx-auto text-left">
        <Modify params={await params} />
      </div>
    </div>
  );
}
