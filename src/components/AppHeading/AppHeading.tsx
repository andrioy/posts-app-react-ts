import { useContext } from "react";
import { SelectChangeEvent } from "@mui/material";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Box,
  styled,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AppContext } from "../AppContext/AppContext";
import { STORAGE_KEYS } from "../../utils/constants";

const Container = styled(Box)(() => ({
  backgroundColor: "wheat",
  color: "black",
  textAlign: "left",
  height: "fit-content",
  padding: "20px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
}));

const LinkText = styled(Typography)(() => ({
  color: "black",
  margin: "0 20px",
}));

function AppHeading() {
  const { user } = useContext(AppContext);
  return (
    <>
      <Container>
        <NavLink to="/">
          <LinkText variant="h3">My App</LinkText>
        </NavLink>
        <Container>
          {/* {user?.id && (
            <Typography
              variant="h4"
              sx={{
                color: "lightyellow",
                marginRight: "50px",
                fontStyle: "italic",
              }}
            >
              Hello, {user.name}
            </Typography>
          )} */}
          <NavLink to="/about">
            <LinkText variant="h4">About</LinkText>
          </NavLink>
          {user?.id ? <UserHeading /> : <PublicHeading />}
        </Container>
      </Container>
      <Outlet />
    </>
  );
}

const UserHeading = () => {
  const { user, setUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleChange = (e: SelectChangeEvent<string>) => {
    if (e.target.value === "SignOut") {
      handleSignOut(e);
    } else navigate(e.target.value);
  };

  const handleSignOut = (e: SelectChangeEvent<string>) => {
    e.preventDefault();

    window.localStorage.removeItem(STORAGE_KEYS.USER);
    window.sessionStorage.removeItem(STORAGE_KEYS.USER);

    setUser(undefined);

    navigate("/signIn");
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel> Hello, {user?.name}</InputLabel>
        <Select onChange={handleChange}>
          <MenuItem value="/Profile">Profile</MenuItem>
          <MenuItem value="SignOut">Sign Out</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

const PublicHeading = () => {
  return (
    <>
      <NavLink to="/signIn">
        <LinkText variant="h4">Sign in</LinkText>
      </NavLink>
    </>
  );
};

export default AppHeading;
