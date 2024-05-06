import Snackbar from "@mui/material/Snackbar";
import Alert from '@mui/material/Alert';

function AutohideSnackbarError({
  state,
  message,
}: {
  state: boolean;
  message: string;
}) {
  return (
      <Snackbar
        open={state}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >{message
        }</Alert>
      </Snackbar>
  );
}
export default AutohideSnackbarError;
