import React, { useState } from "react";
import style from "./BankAccountCards.module.css";

const BankAccountCards = ({ buttons, setInput, input }) => {
  
  const [clickedId, setClickedId] = useState(null);

  const handleClick = (e, id) => {
    setClickedId(id);
    setInput({
      ...input,
      bankAccount: buttons[id].id
    });
    console.log(input)
  };

  return (
    <div className={style.groupcont}>
      {buttons.map((buttonLabel, i) => (
        <div
            type="button"
          key={i}
          name={buttonLabel}
          onClick={(e) => handleClick(e, i)}
          className={i === clickedId ? style.active : style.customButton}
        >
          <h6>{buttonLabel.name}</h6>
          <p>{buttonLabel.CBU}</p>
          <p>{buttonLabel.id}</p>
        </div>
      ))}
    </div>
  );
};

export default BankAccountCards;