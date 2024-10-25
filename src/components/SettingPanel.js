import { useEffect, useState } from "react";
import ButtonComponent from "./reusable/Button";
import FormInput from "./reusable/InputField";
import PictureUpload from "./reusable/PictureUpload";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearStatus } from "../features/slices/authSlice";
import { LoadingSpinner } from "./reusable/Loading";
import { getAuthData } from "./accountUtilities/UserProfile";

const SettingPanel = () => {

    const { userId } = getAuthData();
    const dispatch = useDispatch();
    const [passwordCurrent, setPasswordCurrent] = useState();
    const [password, setNewPassword] = useState();
    const [passwordConfirm, setNewConfirmPassword] = useState();
    const { status, error } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(clearStatus())
  },[])

    const handleChangePassword = async (e) => {
        e.preventDefault()
        try {
            const changedPassword = await dispatch(updatePassword(
               { userId,
                passwordCurrent,
                password,
                passwordConfirm}
            ));
        
          } catch (err) {
            console.error("Failed to Update Password. Please try again!");
          }
        };
    return (
        <section className="w-full h-full bg-white rounded-3xl mb-[32px] shadow-md border pb-12">
          <div className="lg:w-full lg:py-[128px] lg:px-[64px] lg:mx-auto h-full px-4 pb-6 pt-12 sm:px-6 lg:pb-0">
            <div className="flex items-center justify-center mb-6">
              <PictureUpload />
                </div>
                <form className="flex flex-col space-y-4" onSubmit={handleChangePassword}>
            <FormInput
            label="Current Password"
            value={passwordCurrent}
            onChange={(e) => setPasswordCurrent(e.target.value)}
            required
            className="p-3 sm:p-4 h-fit"
            rounded
            type="password"
           
          />
          <FormInput
            label="New Password"
            value={password}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="p-3 sm:p-4 h-fit"
            rounded
            type="password"
                      
             
          />
        <FormInput
          label="Confirm New Password"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setNewConfirmPassword(e.target.value)}
          required
          autoComplete="password"
          className={error ? "border-rose-400 border-[1px]" : ""}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {status === "succeeded"?<p className="text-green-500 text-sm">Password Changed Successfully!</p>:null}
        <div className="flex justify-center items-center">
          <ButtonComponent
            variant={"primary"}
            className="mt-2 w-[197px] h-[38px] sm:w-[343px] sm:h-[50px]"
            type="submit"
            disabled={status === "loading" || status === "succeeded"}
          >
            {status === "loading" ? <LoadingSpinner /> : "Change Password"}
          </ButtonComponent>
        </div>
        </form>
          </div>
        </section>
      );
}

export default SettingPanel;