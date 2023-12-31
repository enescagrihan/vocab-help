interface ListItemProps {
  front: string
  back: string
  known: boolean
}

export default function ListItem({back, front, known}: ListItemProps) {
  return (
    <div className="flex gap-5">
      <div className="flex gap-5">
        <p className="min-w-[100px] text-right">{front}</p>
        <span>:</span>
        <p className="min-w-[100px]">{back}</p>
      </div>
      <p>asd</p>
    </div>
  );
}
