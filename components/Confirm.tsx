import { VFC } from "react";
import { useReservationFlowState } from "../pages/_app";
import { useResvConfirm } from "../state";

export const Confirm: VFC = () => {
  const { state } = useReservationFlowState();
  const confirm = useResvConfirm();
  return (
    <div>
      <div>date</div>
      <div>{state.context.rsvDate}</div>
      <div>name</div>
      <div>{state.context.customerInfo.name}</div>
      <div>age</div>
      <div>{state.context.customerInfo.age}</div>
      <div>card brand</div>
      <div>{state.context.cardBrand}</div>
      <div>
        <button
          onClick={() => {
            confirm();
          }}
        >
          submit!
        </button>
      </div>
    </div>
  );
};
