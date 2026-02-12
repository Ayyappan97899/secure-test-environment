import { AppBar, Toolbar, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

const AppHeader = () => {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <SecurityIcon sx={{ mr: 1 }} />
        <Typography variant="h6">Secure Test Environment</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
