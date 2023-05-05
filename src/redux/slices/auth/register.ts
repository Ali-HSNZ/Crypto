import { toEnDigits } from "@/utils/methods";
import { toPersianDigits } from "@/utils/toPersianDigits";
import { toastify } from "@/utils/toast";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IRegister } from "src/types/register.types";
import { toast } from "react-toastify";

/**
 * All Steps ==> 
 * Step 1 => register 
 * Step 2 => confirm_otp & contact_information
 * Step 3 => confirm_phone_number
 * Step 4 => choose_location
*/

export const registerAction = createAsyncThunk('auth/register',async(payload : IRegister,{rejectWithValue})=>{
     const {password , name , email } = payload;
     const data = await axios.post('https://apingweb.com/api/register', {
          password,
          name,
          phone : toEnDigits(payload.phone.substring(0,10)),
          email,
          password_confirmation : password,

     } , {headers : {"Content-Type" : 'application/json'}})
     .then(res => {
          toast.success("با موفقیت ثبت‌نام کرده‌اید.")
     })
     .catch(error => {
          error?.response?.data?.errors.forEach((message : string) => toast.error(message))
          throw error
     })
     return data
})

const initialState : IRegister ={
     name : "",
     national_code : "",
     birthday : "",
     phone : "",
     email : "",
     province : "",
     city : "",
     address : "",
     x_position : "",
     y_position : "",
     step : 'register',
     otp : "",
     password : "",
     registerStatus : false
}

const register = createSlice({
     name:"auth/register",
     initialState ,
     reducers : {
          changeLoginState : (state , action) => {
               state.registerStatus = action.payload
          },
          // step 1
          person_information : (state , action) => {
               const {name,national_code,birthday} = action.payload;
               state.name = name
               state.national_code = toEnDigits(national_code)
               state.birthday = toEnDigits(birthday)
               state.step = "person_information"
          },
          // step 2
          sendOTPcode : (state , action) => {
               state.phone = toEnDigits(action.payload);
               state.step = "confirm_otp"
               const randomNumber  = Math.floor(Math.random()*10000  + 10000)
               const otp = String(randomNumber).substring(0,4)
               state.otp = otp
               toastify({message : `کد  تایید : ${otp}` , type : "success"})
          },
          contact_information : (state , action) => {
               state.step = "contact_information"
               state.email = action?.payload?.email
          },
          // step 3
          confirm_phone_number : (state , action) => {
               state.step = "confirm_phone_number"
               state.password = toEnDigits(action.payload.password)
          },
          // step 4
          choose_location : (state , action) => {

          }
     },
     extraReducers : ({addCase}) => {
          addCase(registerAction.pending , (state , action) => {
               state.registerStatus = false
          }),
          addCase(registerAction.fulfilled , (state , action) => {
               state.registerStatus = true
          }),
          addCase(registerAction.rejected , (state , action) => {
               state.registerStatus = false
          })
     }
})

export const registerReducer = register.reducer
export const { 
     choose_location, 
     confirm_phone_number, 
     person_information,
     sendOTPcode,
     contact_information,
     changeLoginState
} = register.actions