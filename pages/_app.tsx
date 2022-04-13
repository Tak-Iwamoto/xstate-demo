import { createContext, useContext, VFC } from "react";
import { AppProps } from "next/app";
import { useActor, useInterpret } from "@xstate/react";
import { ReservationFlowContext, reservationFlowMachine } from "../state";
import { AnyEventObject, Interpreter } from "xstate";

const StateContext = createContext<{
  reservationFlowService?: Interpreter<
    ReservationFlowContext,
    any,
    AnyEventObject,
    {
      value: any;
      context: ReservationFlowContext;
    }
  >;
}>({});

export const useReservationFlowState = () => {
  const stateContext = useContext(StateContext);
  const [state, send] = useActor(stateContext.reservationFlowService);
  return {
    state,
    send,
  };
};

const MyApp: VFC<AppProps> = ({ Component, pageProps }) => {
  const reservationFlowService = useInterpret(reservationFlowMachine);

  return (
    <>
      <StateContext.Provider value={{ reservationFlowService }}>
        <Component {...pageProps} />
      </StateContext.Provider>
    </>
  );
};

export default MyApp;
