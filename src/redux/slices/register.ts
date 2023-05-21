import { toEnDigits } from "@/utils/methods";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { IRegister, TRegisterActionPayload } from "src/types/register.types";
import { toast } from "react-toastify";

/**
 * All Steps ==>
 * Step 1 => register
 * Step 2 => confirm_otp
 * Step 3 => contact_information
 * Step 4 => confirm_phone_number
 * Step 5 => choose_location
 */

const initialState: IRegister = {
     name: "",
     national_code: "",
     birthday: "",
     phone: "",
     email: "",
     province: "",
     city: "",
     address: "",
     x_position: "",
     y_position: "",
     completedStep: "no_status",
     otp: "",
     password: "",
     loading: false,
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
               state.password = toEnDigits(action.payload.password);

               state.completedStep = "confirm_phone_number";
          },
          // step 4
          contact_information: (state, action) => {
               state.email = toEnDigits(action?.payload?.email);

               state.completedStep = "contact_information";
          },
          // step 5
          choose_location: (state, action) => {
               state.name = action.payload;
          },
     },
});

export const registerReducer = register.reducer;
export const {
     choose_location,
     confirm_phone_number,
     person_information,
     getOTPCode,
     contact_information,
} = register.actions;
