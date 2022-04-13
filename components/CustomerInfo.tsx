import { VFC } from "react";
import { useInputCustomerInfo } from "../state";

export const CustomerInfo: VFC = () => {
  const handleInput = useInputCustomerInfo();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleInput({
          name: e.target["customerName"].value,
          age: e.target["customerAge"].value,
        });
      }}
    >
      <div>name</div>
      <input name="customerName" />
      <div>age</div>
      <input name="customerAge" />
      <div>
        <button type="submit">submit</button>
      </div>
    </form>
  );
};
