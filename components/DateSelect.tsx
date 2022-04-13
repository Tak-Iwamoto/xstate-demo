import { VFC } from "react";
import { useInputReservationDate } from "../state";

export const DateSelect: VFC = () => {
  const handleInput = useInputReservationDate();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleInput({ date: e.target["date"].value });
      }}
    >
      <div>Please input the reservation date</div>
      <input name="date" type="datetime-local" />
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
