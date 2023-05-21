import { toEnDigits } from "@/utils/methods";
import { createSlice } from "@reduxjs/toolkit";
import { IRegister } from "src/types/register.types";
import { toast } from "react-toastify";

/**
 * All Steps :
 * Step 1 => person_information
 * Step 2 => confirmed_OTP
 * Step 3 => confirm_phone_number
 * Step 4 => contact_information
*/

const initialState: IRegister = {
     name: "",
     national_code: "",
     birthday: "",
     phone: "",
     email: "",
     completedStep: "no_status",
     otp: "",
     password: "",
};

const register = createSlice({
     name: "auth/register",
     initialState,
     reducers: {
          // step 1
          person_information: (state, action) => {
               const { name, national_code, birthday } = action.payload;
               state.name = name;
               state.national_code = toEnDigits(national_code);
               state.birthday = toEnDigits(birthday);

               state.completedStep = "person_information";
          },
          // step 2
          getOTPCode: (state, action) => {
               const { phone, email } = action.payload;

               state.email = toEnDigits(email);
               state.phone = toEnDigits(phone)

               // Generate OTP
               const randomNumber = Math.floor(Math.random() * 10000 + 10000);
               const otp = randomNumber.toString().substring(0, 4);
               state.otp = otp;

               toast.success(`کد  تایید : ${otp} `);

               state.completedStep = "confirmed_OTP";
          },
          // step 3
          confirm_phone_number: (state, action) => {
               state.password = toEnDigits(action.payload);

               state.completedStep = "confirm_phone_number";
          },
          // step 4
          contact_information: (state, action) => {
               state.email = toEnDigits(action?.payload?.email);

               state.completedStep = "contact_information";
          }
     },
});

export const registerReducer = register.reducer;
export const {
     confirm_phone_number,
     person_information,
     getOTPCode,
     contact_information,
} = register.actions;
