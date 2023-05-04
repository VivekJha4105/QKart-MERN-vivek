import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios"; 
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer"; 
import { useHistory, Link } from "react-router-dom";
import Header from "./Header";
import "./Register.css"; 
  
const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const [loading, setLoading] = useState(false)
 
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const formData = {
    'username': userName, 
    'password': password,
    'confirmPassword': confirmPassword
  }

  // const [formData, setFormData] = {
  //   userName: '', 
  //   password: '', 
  //   confirmPassword: ''
  // }

  const updateUserName = (event) => {
    setUserName(event.target.value);
  }
  const updatePassword = (event) => {
    setPassword(event.target.value);
  }
  const updateConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  }

  // console.log(formData);
  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

  // const register = (formData) => {
  //   axios
  //     .post(config.endpoint + '/auth/register', formData)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  // }
    // const SignalToPost = validateInput(); 

  const registeringData = () => {
    const data = { 'username': formData.username, 'password': formData.password, 'confirmPassword': formData.confirmPassword };
    const signalToGo = validateInput(data);
    // console.log(formData);
    if(signalToGo){
      register(formData);
    }
  }
    
  const register = async (formData) => {
      // Event.preventDefault();
    try {
      setLoading(true);
      let response = await axios.post(config.endpoint + '/auth/register', {username: formData.username, password: formData.password});
      setLoading(false);
      enqueueSnackbar('Registered Successfully', { 
        variant: 'success'
      });
      history.push("/login");
    } 
    catch (Error) {
      setLoading(false);
      // const err = Error.response;
      // console.log(err);
      if (Error.response && Error.response.status === 400) {
        enqueueSnackbar(Error.response.data.message , { 
          variant: 'error'
        })
      } else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON."
        , { variant: 'error' });
      }
    }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (data.username.length === 0){
      enqueueSnackbar('Username is a required field', { 
        variant: 'warning'
      })
      return false;
    } 
    if(data.username.length < 6){
      enqueueSnackbar("Username must be at least 6 characters", {
        variant: 'warning'
      });
      return false;
    } 
    if(data.password.length === 0){
      enqueueSnackbar("Password is a required field", { 
        variant: 'warning'
      })
      return false;
    } 
    if(data.password.length < 6){
      enqueueSnackbar("Password must be at least 6 characters", {
        variant: 'warning'
      });
      return false;
    } 
    if(data.password !== data.confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: 'warning'
      });
      return false;
    }
    return true;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            value={userName}
            onChange={updateUserName}
            name="username"
            placeholder="Enter Username"
            fullWidth
            />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            value={password}
            onChange={updatePassword}
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={updateConfirmPassword}
            type="password"
            fullWidth
          />
          { loading ? 
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
              <CircularProgress sx={{display: 'flex', justifyContent: 'center'}}/>
            </Box>  : 
            <Button className="button" variant="contained" onClick={() => {registeringData()}}>
              Register Now
            </Button>
            // {/* <Button type="submit" className="button" variant="contained" onClick={async () => {register(formData)}}> */}
          }
          <p className="secondary-action">
            Already have an account?{" "}
             <Link className="link" to="/login">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
