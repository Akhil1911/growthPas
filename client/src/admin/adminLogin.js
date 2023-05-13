import React, { useEffect } from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import { showToast } from "../Tools/showToast";
import axios from "axios";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import "../Home/HomeForAll.css";
import Cookies from "universal-cookie";
import AdminAppbar from "./AdminAppbar"
const AdminLogin = () => {
  useEffect(() => {
    document.title = "Admin - Login";
  }, []);
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const cookies = new Cookies()
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <AdminAppbar/>
      <Stack
        direction={{
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        }}
        justifyContent={{
          lg: "space-around",
          md: "space-around",
          sm: "center",
          xs: "center",
        }}
        alignItems={{
          lg: "space-around",
          md: "space-around",
          sm: "center",
          xs: "center",
        }}
        spacing={2}
        marginTop={"4%"}
      >
        <Box
          sx={{
            width: {
              lg: "45%",
              md: "45%",
              sm: "50%",
              xs: "100%",
            },
          }}
        >
          <img
            src="../images/AdminLogin.png"
            alt=""
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </Box>
        <Box>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const { username, password } = values;
                try {
                const response = await axios.post(
                  `${process.env.REACT_APP_URL_LINK}/api/v1/admin/login`,
                  {
                    username,
                    password,
                  }
                );
                  if (response.data.success) {
                  showToast("SUCCESS", `${response.data.message}`);
                  cookies.set("admintoken", response.data.token);
                    localStorage.setItem("admintoken", response.data.token);
                    navigate("/adminhome")
                } else {
                  showToast("ERROR", `${response.data.message}`);
                }
              } catch (error) {
                showToast("ERROR", "Something Went Wrong");
              }
            }}
          >
            <Stack alignItems={"center"}>
              <h1>
                <p style={{ color: "#254061" }} className="joinusas">
                  <LoginRoundedIcon fontSize="medium" /> Admin Login
                </p>
              </h1>
              <Form>
                <Box sx={{ "& > :not(style)": { m: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Admin Name"
                      variant="standard"
                      fullWidth
                      name="username"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="username" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    {values.showPassword ? (
                      <VisibilityOff
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                        onClick={handleClickShowPassword}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <Visibility
                        style={{ cursor: "pointer" }}
                        color="darkColor"
                        sx={{ mr: 1, my: 0.5 }}
                        onClick={handleClickShowPassword}
                      />
                    )}
                    <Field
                      type={values.showPassword ? "text" : "password"}
                      as={TextField}
                      color="darkColor"
                      label="Enter Password"
                      variant="standard"
                      fullWidth
                      name="password"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="password" />
                  </Typography>
                  <Stack
                    direction={{
                      lg: "row",
                      md: "row",
                      xs: "row",
                      sm: "row",
                    }}
                    justifyContent="center"
                    alignItems={"center"}
                    spacing={2}
                  >
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      color="darkColor"
                      type="submit"
                    >
                      Login
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ color: "white" }}
                      color="darkColor"
                      type="reset"
                    >
                      Clear
                    </Button>
                  </Stack>
                </Box>
              </Form>
            </Stack>
          </Formik>
        </Box>
      </Stack>
    </>
  );
};

export default AdminLogin;
