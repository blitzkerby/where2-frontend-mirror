import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "./../reusable/InputField";
import ButtonComponent from "./../reusable/Button";
import ContainerComponent from "./../reusable/ContainerComponent";
import { login, clearAuthState } from "./../../features/slices/authSlice";
import { LoadingSpinner, LoadingOverlay } from "./../reusable/Loading.js";

// LOGIN COMPONENTS
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearAuthState());
  }, [dispatch, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to log in. Please try again!");
    }
  };

  if (status === "loading") {
    return <LoadingOverlay className="h-screen" message="We are logging you in..." />;
  }

  return (
    <ContainerComponent title="LOG IN" className="lg:h-[718px]">
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
          className={error ? "border-rose-400 border-[1px]" : ""}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="password"
          className={error ? "border-rose-400 border-[1px]" : ""}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="flex justify-center items-center">
          <ButtonComponent
            variant={"primary"}
            className="mt-2 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
            type="submit"
            disabled={status === "loading" || status === "succeded"}
          >
            {status === "loading" ? <LoadingSpinner /> : "Login"}
          </ButtonComponent>
        </div>
      </form>
      <div className="mt-6 text-center">
        <Link
          to="/forget-password"
          className="text-[rgb(0,122,255)] underline text-sm"
        >
          Forgot Password?
        </Link>
        <p className="mt-6 text-sm text-gray-600 ">
          Don't have an Account?{" "}
          <Link to="/signup" className="text-[rgb(0,122,255)] underline">
            Sign Up
          </Link>
        </p>
      </div>
    </ContainerComponent>
  );
};

export default LoginComponent;
