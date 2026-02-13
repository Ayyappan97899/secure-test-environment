import { Alert, Snackbar } from "@mui/material";

const AppSnackBar = ({ open, setOpen, message }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={() => setOpen(false)}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={() => setOpen(false)} severity="warning" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AppSnackBar;
