import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import config from "./../../config";
import axios from "axios";


const PayPalButton = ({ amount }) => {
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    setClientId(config.paypal.clientId);
  }, []);

  const createOrder = async () => {
    try {
      const response = await axios.post(config.payment.createPaypalOrder, { amount });
      return response.data.orderID;
    } catch (error) {
      console.error('Error creating PayPal order:', error);
    }
  };

  const onApprove = async (data) => {
    try {
      await axios.post(config.payment.capturePaypalOrder, { orderID: data.orderID });
      alert('Payment successful!');
    } catch (error) {
      console.error('Error capturing PayPal order:', error);
    }
  };

  return (
    <PayPalScriptProvider options={{ "client-id": clientId }}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;