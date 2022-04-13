import { assign, createMachine } from "xstate";
import { useReservationFlowState } from "../pages/_app";

export type ReservationFlowContext = {
  rsvDate: string;
  customerInfo: {
    name: string;
    age: number;
  };
  cardBrand: string;
}

export const ReservationFlowState = {
  DATE: "date",
  CUSTOMER_INFO: "customerInfo",
  PAYMENT: "payment",
  CONFIRM: "confirm",
  COMPLETED: "completed",
  ERROR: "error",
} as const;

type ReservationFlowState =
  typeof ReservationFlowState[keyof typeof ReservationFlowState];

const ReservationFlowAction = {
  INPUT_DATE: "INPUT_DATE",
  INPUT_CUSTOMER_INFO: "INPUT_CUSTOMER_INFO",
  INPUT_PAYMENT: "INPUT_PAYMENT",
  CONFIRM: "CONFIRM",
  ERROR: "ERROR",
} as const;

type ReservationFlowAction =
  typeof ReservationFlowAction[keyof typeof ReservationFlowAction];

export const useInputReservationDate = () => {
  const { send } = useReservationFlowState();
  const handleInputDate = (value: { date: string }) => {
    send({
      type: ReservationFlowAction.INPUT_DATE,
      value: value.date,
    });
  };
  return handleInputDate;
};

export const useInputCustomerInfo = () => {
  const { send } = useReservationFlowState();
  const handleInput = (value: { name: string; age: number }) => {
    send({
      type: ReservationFlowAction.INPUT_CUSTOMER_INFO,
      value: {
        name: value.name,
        age: value.age,
      },
    });
  };
  return handleInput;
};

export const useInputPayment = () => {
  const { send } = useReservationFlowState();
  const handleInput = (value: { cardBrand: string }) => {
    send({
      type: ReservationFlowAction.INPUT_PAYMENT,
      value: value.cardBrand,
    });
  };
  return handleInput;
};

export const useResvConfirm = () => {
  const { send } = useReservationFlowState();
  const handleConfirm = () => {
    send(ReservationFlowAction.CONFIRM);
  };
  return handleConfirm;
};

type ReservationFlowEvent =
  | { type: "INPUT_DATE"; value: string }
  | { type: "INPUT_CUSTOMER_INFO"; value: { name: string; age: string } }
  | { type: "INPUT_PAYMENT"; value: string }
  | { type: "CONFIRM"; value?: any }
  | { type: "ERROR"; value: any };

export const reservationFlowMachine = createMachine<
  ReservationFlowContext,
  ReservationFlowEvent
>(
  {
    id: "rsv-flow",
    initial: "date",
    states: {
      date: {
        on: {
          INPUT_DATE: [{ target: "customerInfo", actions: "inputDate" }],
          ERROR: "error",
        },
      },
      customerInfo: {
        on: {
          INPUT_CUSTOMER_INFO: [
            { target: "payment", actions: "inputCustomerInfo" },
          ],
          ERROR: "error",
        },
      },
      payment: {
        on: {
          INPUT_PAYMENT: [{ target: "confirm", actions: "inputCardBrand" }],
          ERROR: "error",
        },
      },
      confirm: {
        on: { CONFIRM: [{ target: "completed" }], ERROR: "error" },
      },
      completed: {
        type: "final",
      },
      error: {
        type: "final",
      },
    },
  },
  {
    actions: {
      inputDate: assign((_ctx, evt) => ({
        rsvDate: evt.value,
      })),
      inputCustomerInfo: assign((_ctx, evt) => ({
        customerInfo: evt.value,
      })),
      inputCardBrand: assign((_ctx, evt) => ({
        cardBrand: evt.value,
      })),
    },
  }
);
