import { NextPage } from "next";

import { ReservationFlowState } from "../state";
import { DateSelect } from "../components/DateSelect";
import { useReservationFlowState } from "./_app";
import { CustomerInfo } from "../components/CustomerInfo";
import { PaymentInput } from "../components/PaymentInput";
import { Confirm } from "../components/Confirm";

const IndexPage: NextPage = () => {
  const { state: currentState } = useReservationFlowState();

  return (
    <div>
      <div>
        {currentState.matches(ReservationFlowState.DATE) && <DateSelect />}
        {currentState.matches(ReservationFlowState.CUSTOMER_INFO) && (
          <CustomerInfo />
        )}
        {currentState.matches(ReservationFlowState.PAYMENT) && <PaymentInput />}
        {currentState.matches(ReservationFlowState.CONFIRM) && <Confirm />}
        {currentState.matches(ReservationFlowState.COMPLETED) && (
          <div>completed!</div>
        )}
      </div>
    </div>
  );
};
export default IndexPage;
