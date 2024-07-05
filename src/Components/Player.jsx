import { useState } from "react";

export default function Player({ initialName,symbol,isActive,onChangeName }) {
const [name,setName] = useState(initialName)
const [isEditing, setisEditing] = useState(false);

function handleChange(event) {
  setName(event.target.value);
  onChangeName(symbol,event.target.value);
}

return (
    <>
      <li className={isActive?"active":undefined}>
        <span className="player">
          {isEditing ? <input className="player-name" type="text" required value={name} onChange={handleChange}></input>:<span className="player-name">{name}</span>}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button className="" onClick={() => {setisEditing((isEdit)=>!isEdit)}}>{isEditing?"Save":"Edit"}</button>
      </li>
    </>
  );
}
