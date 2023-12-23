import ListItem from "@/components/shared/ListItem";

export default function List() {
  return (
    <div className="flex flex-col items-center gap-10">
        <select className="border border-gray rounded">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
          <option value="audi">Audi</option>
        </select>
      <div className="flex flex-col items-center">
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </div>
  );
}
