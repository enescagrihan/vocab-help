import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center p-24">
      {/* <h1 className="text-3xl">VocabHelp</h1> */}
      <div className="flex flex-col gap-10 items-center pb-16">
        <div className="flex gap-5">
          <input className="border border-gray rounded" type="text" />
          <span>:</span>
          <input className="border border-gray rounded" type="text" />
          <select className="border border-gray rounded">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <button className="bg-sky-700 text-white rounded w-24">SAVE</button>
      </div>
      <div>
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
        <div className="flex gap-5">
          <p>asdf</p>
          <span>:</span>
          <p>asdf</p>
        </div>  
      </div>
    </main>
  );
}
