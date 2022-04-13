import { VFC } from "react";
import { useInputPayment } from "../state";

export const PaymentInput: VFC = () => {
  const handleInput = useInputPayment();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleInput({ cardBrand: e.target["cardBrand"].value });
      }}
    >
      <div>Please input a card brand</div>
      <input name="cardBrand" />
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
