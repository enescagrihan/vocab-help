interface ListItemProps {
  front: string;
  back: string;
  example: string;
  known: boolean;
}

export default function ListItem({ back, front, known, example }: ListItemProps) {
  return (
    <div className="flex flex-nowrap gap-5">
      <div className="flex flex-1 gap-5">
        {known ? (
          <div className={"w-1 rounded-md bg-green-600"} />
        ) : (
          <div className={"w-1 rounded-md bg-red-600"} />
        )}
          <p className="flex-1 text-right">{front}</p>
          <span className="flex-1">:</span>
          <p className="flex-1">{back}</p>
      </div>
      <p className="flex-1 ">{example}</p>
    </div>
  );
}
