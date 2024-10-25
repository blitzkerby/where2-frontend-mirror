import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContainerComponent from "./../reusable/ContainerComponent";
import FormInput from "./../reusable/InputField";
import ButtonComponent from "./../reusable/Button";
import {
  verifyAccount,
  clearAuthState,
  sendWelcomeEmail,
  resendVerificationCode,
} from "./../../features/slices/authSlice";
import { LoadingOverlay } from "./../reusable/Loading";

const VerificationComponent = () => {
  const [verificationCode, setVerificationCode] = useState("");
  // SET THE TIME LEFT TO LIMIT THE NUMBER OF ATTEMPTS (PREVENTING SPAM OF CLICKS)
  const [timeLeft, setTimeLeft] = useState(600);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, message, isVerified } = useSelector(
    (state) => state.auth
  );

  const email = location.state?.email || "";

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  // IF THERE IS NO EMAIL, RETURNING THE USER TO THE SIGNUP PAGE
  useEffect(() => {
    if (!email) {
      navigate("/signup");
    }
  }, [email, navigate, dispatch]);

  // SET TIMER FOR THE RESEND CODE
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isVerified) {
      const trimmedEmail = email.trim();

      if (trimmedEmail) {
        dispatch(sendWelcomeEmail({ email: trimmedEmail }))
          .unwrap()
          .then(() => {
            console.log("Welcome email sent successfully");
          })
          .catch((err) => {
            console.error("Failed to send welcome email:", err);
          })
          .finally(() => {
            const timer = setTimeout(() => {
              dispatch(clearAuthState());
              navigate("/login");
            }, 500);
            return () => clearTimeout(timer);
          });
      } else {
        console.error("Invalid email address: Email is empty after trimming");
        const timer = setTimeout(() => {
          dispatch(clearAuthState());
          navigate("/login");
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isVerified, email, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && verificationCode) {
      dispatch(verifyAccount({ email, verificationCode }))
        .unwrap()
        .catch((err) => console.error("Verification failed:", err));
    }
  };

  const handleResendCode = () => {
    if (email && timeLeft === 0) {
      dispatch(resendVerificationCode({ email }))
        .unwrap()
        .then(() => setTimeLeft(600))
        .catch((err) =>
          console.error("Failed to resend verification code:", err)
        );
    }
  };

  // SHOWING THE LOADING OVERLAY COMPONENT WHEN THE USER IS SIGNING UP
  if (status === "loading") {
    return (
      <LoadingOverlay className="h-screen" message="Verifying account..." />
    );
  }

  if (!email) {
    return <div>Loading...</div>;
  }

  return (
    <ContainerComponent title="VERIFY ACCOUNT" className="lg:h-[718px]">
      <p className="text-sm text-gray-600 text-center mb-6">
        Please enter the verification code sent to {email}
      </p>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <FormInput
          name="verificationCode"
          label="Verification Code"
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
        <p className="text-sm text-gray-500">
          Code will expire in {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </p>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {isVerified && (
          <p className="text-green-500 text-sm text-center">
            {message ||
              "Account verified successfully. Redirecting to login..."}
          </p>
        )}
        <div className="flex justify-center items-center">
          <ButtonComponent
            variant="primary"
            className="mt-2 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
            type="submit"
            disabled={status === "loading" || status === "succeeded"}
          >
            {status === "loading" ? <LoadingOverlay /> : "Verify"}
          </ButtonComponent>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={handleResendCode}
          className="text-[rgb(0,122,255)] underline text-sm"
          disabled={timeLeft > 0}
        >
          Resend Code
        </button>
      </div>
    </ContainerComponent>
  );
};

export default VerificationComponent;
