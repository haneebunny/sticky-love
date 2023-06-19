export default function Memo({ name, content }) {
  return (
    <div>
      <div className=" font m-5 bg-amber-200 max-w-[400px] min-h-[350px] p-10 shadow-lg">
        <div className="h-[250px]">{content}</div>

        <p className="flex jusity-end">{name}가</p>
      </div>
    </div>
  );
}
