import React from "react";
import { ErrorMessage, Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { TextField, Button, Box, Stack, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../Tools/showToast";
import StudentBeforeAppbar from "../BeforeLogin/StudentBeforeAppbar";
import axios from "axios";
import "../../Home/HomeForAll.css";

const StudentSignup = () => {
  const [values, setValues] = React.useState({
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    address: "",
    phone_number: "",
    tuition_class_name: "",
    tuition_id: "",
    standard: "",
    age: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string("Enter valid name")
      .required("Name is required")
      .min(2, "Name is too short, enter valid name"),
    email: Yup.string("Enter valid email")
      .required("Email is required")
      .email("Enter valid email"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Please create a strong password"),
    address: Yup.string()
      .required("Address is required")
      .max(100, "Address is too long, enter valid address"),
    phone_number: Yup.number("Must be a number")
      .max(9999999999, "Invalid Number")
      .required("Phone number is required")
      .integer("No Decimal Value Allowed")
      .typeError("Only Numbers Can Be Entered"),
    tuition_class_name: Yup.string().required("Tution Name is required"),
    tuition_id: Yup.string().required("TutionID is required"),
    standard: Yup.number()
      .required("Standard is required")
      .max(12, "Max 12 Standard Is Allowed")
      .min(1, "Invalid Standard"),
    age: Yup.number()
      .required("Age is required")
      .max(20, "Invalid Age Entered")
      .min(5, "Invalid Age Entered"),
  });

  return (
    <>
      <StudentBeforeAppbar position={"fixed"} />
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
        spacing={2}
        marginTop={"8%"}
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
            src="../images/signup.png"
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
              const {
                name,
                email,
                password,
                phone_number,
                address,
                tuition_class_name,
                tuition_id,
                standard,
                age,
              } = values;
              try {
                const response = await axios.post(
                  `${process.env.REACT_APP_URL_LINK}/api/v1/auth/studentregister`,
                  {
                    name,
                    email,
                    password,
                    address,
                    phone_number,
                    tuition_class_name,
                    tuition_id,
                    standard,
                    age,
                  }
                );
                if (response.data.success) {
                  resetForm();
                  showToast("SUCCESS", `${response.data.message}`);
                  navigate("/studentlogin");
                } else {
                  showToast("ERROR", `${response.data.message}`);
                }
              } catch (error) {
                console.log(error);
                showToast("ERROR", "Something Went Wrong");
              }
            }}
          >
            <Stack alignItems={"center"}>
              <h1>
                <p style={{ color: "#254061" }} className="joinusas">
                  <HowToRegIcon fontSize="medium" /> Signin Here
                </p>
              </h1>
              <Form>
                <Box sx={{ "& > :not(style)": { m: 1.5 } }}>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AccountCircle color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Your Name"
                      variant="standard"
                      fullWidth
                      name="name"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="name" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <EmailIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Your email"
                      variant="standard"
                      fullWidth
                      name="email"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="email" />
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
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <HomeIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      multiline
                      maxRows={3}
                      as={TextField}
                      color="darkColor"
                      label="Enter Your Address"
                      variant="standard"
                      fullWidth
                      name="address"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="address" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <PhoneIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Your Mobile No."
                      variant="standard"
                      fullWidth
                      name="phone_number"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="phone_number" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <InsertEmoticonIcon
                      color="darkColor"
                      sx={{ mr: 1, my: 0.5 }}
                    />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Your Age"
                      variant="standard"
                      fullWidth
                      name="age"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="age" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <MenuBookIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Tuition Name"
                      variant="standard"
                      fullWidth
                      name="tuition_class_name"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="tuition_class_name" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <VpnKeyIcon color="darkColor" sx={{ mr: 1, my: 0.5 }} />
                    <Field
                      as={TextField}
                      color="darkColor"
                      label="Enter Tuition ID"
                      variant="standard"
                      fullWidth
                      name="tuition_id"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="tuition_id" />
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                    <AutoStoriesIcon
                      color="darkColor"
                      sx={{ mr: 1, my: 0.5 }}
                    />
                    <Field
                      multiline
                      maxRows={3}
                      as={TextField}
                      color="darkColor"
                      label="Enter Standard"
                      variant="standard"
                      fullWidth
                      name="standard"
                    />
                  </Box>
                  <Typography
                    color={"red"}
                    sx={{ textAlign: "center", fontFamily: "Montserrat" }}
                  >
                    <ErrorMessage name="standard" />
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
                      SignIn
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
                  <Stack
                    direction={"row"}
                    justifyContent="center"
                    alignItems={"center"}
                    style={{ marginBottom: "2rem" }}
                  >
                    <h4 style={{ color: "#254061" }} className="joinusas">
                      Already Registered?{" "}
                      <Link
                        to="/studentlogin"
                        style={{ textDecoration: "none" }}
                      >
                        <Button color="darkColor" variant="text">
                          Login Here
                        </Button>
                      </Link>
                    </h4>
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

export default StudentSignup;
