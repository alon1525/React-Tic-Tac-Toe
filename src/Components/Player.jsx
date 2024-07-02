import { useState } from "react";

export default function Player({ name,symbol }) {
const [isEditing, setisEditing] = useState(false);
let playersName = name;
return (
    <>
      <li>
        <span className="player">
          {isEditing ? <input className="player-name" type="text" value={playersName} name="player"></input>:<span className="player-name">{playersName}</span>}
          <span className="player-symbol">{symbol}</span>
        </span>
        <button className="" onClick={() => {setisEditing((isEdit)=>!isEdit)}}>{isEditing?"Save":"Edit"}</button>
      </li>
    </>
  );
}
