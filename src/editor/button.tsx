import { styled } from "@mui/material/styles";
import MuiButton from "@mui/material/Button";

export const Button = styled(MuiButton) ((props) => ({
    borderRadius: 10,
    backgroundColor: "#9fe09f",
    font: "Harmattan",
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    height: '60px',
    width: '250px',
    border: '1px solid',
    borderColor: 'black',
}));