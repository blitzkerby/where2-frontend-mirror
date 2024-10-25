import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import FormInput from "../reusable/InputField";
import ButtonComponent from "../reusable/Button";
import ContainerComponent from "../reusable/ContainerComponent";
import { resetPassword, clearAuthState } from "../../features/slices/authSlice";
import { LoadingSpinner, LoadingOverlay } from "../reusable/Loading";

// THIS COMPONENT IS USED TO RESET USERPASSWORD
const ResetPasswordComponent = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [resetAttempted, setResetAttempted] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { status, message } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch]);

  useEffect(() => {
    if (resetAttempted && status === "succeeded") {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [status, resetAttempted, navigate]);

  useEffect(() => {
    setPasswordMismatch(password !== passwordConfirm && password !== "" && passwordConfirm !== "");
  }, [password, passwordConfirm]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setResetAttempted(false);

    if (!token) {
      setError("Invalid reset token. Please request a new password reset.");
      return;
    }

    if (password !== passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    dispatch(resetPassword({ token, password }))
      .unwrap()
      .then(() => {
        setResetAttempted(true);
      })
      .catch((error) => {
        setError(error.message || "Failed to reset password. Please try again.");
      });
  };

  if (!token) {
    return (
      <ContainerComponent title="INVALID RESET LINK">
        <p className="text-red-500 text-sm text-center">
          This password reset link is invalid or has expired. Please request a new password reset.
        </p>
        <div className="mt-6 text-center">
          <Link to="/forget-password" className="text-[rgb(0,122,255)] underline">
            Request New Password Reset
          </Link>
        </div>
      </ContainerComponent>
    );
  }

  if (status === "loading") {
    return <LoadingOverlay className="h-screen" message="We are resetting your password. Please be patient..."/>
  }

  return (
    <ContainerComponent title="RESET PASSWORD">
      <p className="text-sm text-gray-600 text-center mb-6">
        Please enter your new password below.
      </p>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <FormInput
          name="password"
          label="New Password"
          type="password"
          className={passwordMismatch ? "border-rose-400 border-[1px]" : ""}
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <FormInput
          name="passwordConfirm"
          label="Confirm New Password"
          type="password"
          value={passwordConfirm}
          className={passwordMismatch ? "border-rose-400 border-[1px]" : ""}
          onChange={handlePasswordConfirmChange}
          required
        />
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {resetAttempted && status === "failed" && (
          <p className="text-red-500 text-sm text-center">{message}</p>
        )}
        {resetAttempted && status === "succeeded" && (
          <p className="text-green-500 text-sm text-center">
            Password reset successfully. Redirecting to login...
          </p>
        )}
        <div className="flex justify-center items-center">
          <ButtonComponent
            variant="primary"
            className="mt-2 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
            type="submit"
            disabled={status === "loading"}
          >
            {status === "loading" ? <LoadingSpinner /> : "Reset Password"}
          </ButtonComponent>
        </div>
      </form>
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link to="/login" className="text-[rgb(0,122,255)] underline">
            Log in
          </Link>
        </p>
      </div>
    </ContainerComponent>
  );
};

export default ResetPasswordComponent;