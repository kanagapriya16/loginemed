import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useHistory } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    receiveEmails: false,
  });
  const [acceptedTerms, setAcceptedTerms] = React.useState(false);

  const [validationErrors, setValidationErrors] = React.useState({});

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     const data = new FormData(event.currentTarget);
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   };
  const validateForm = () => {
    const errors = {};

    // Check for validation errors and update the 'errors' object
    if (formData.userName === "") {
      errors.userName = "User name is required";
    }

    if (formData.email === "") {
      errors.email = "Email is required";
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (formData.password === "") {
      errors.password = "Password is required";
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must have at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character";
    }

    if (formData.confirmPassword === "") {
      errors.confirmPassword = "Confirm password is required";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!acceptedTerms) {
      errors.acceptedTerms = "You must accept the Terms and Conditions";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if no errors
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const isValid = validateForm();



    if (isValid) {
      try {
        const response = await axios.post("http://localhost:8081/register", {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          // You can include other form fields here
        });

        console.log("API Response:", response.data);

        // You can handle the response from the API here
      } catch (error) {
        console.error("API Error:", error);
        // Handle API errors here
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="family-name"
                  error={!!validationErrors.userName}
                  helperText={validationErrors.userName}
                  onChange={(e) =>
                    setFormData({ ...formData, userName: e.target.value })
                  }
                  value={formData.userName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  value={formData.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  value={formData.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmpassword"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!validationErrors.confirmPassword}
                  helperText={validationErrors.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  value={formData.confirmPassword}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={acceptedTerms}
                      onChange={(e) => setAcceptedTerms(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="I accept the Terms and Conditions"
                  error={!!validationErrors.acceptedTerms}
                  helperText={validationErrors.acceptedTerms}
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
