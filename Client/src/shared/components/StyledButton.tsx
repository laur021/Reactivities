import { Button, styled, type ButtonProps } from "@mui/material";
import type { LinkProps } from "react-router";

// Combine all MUI Button props with optional react-router Link props.
// This allows the component to behave like a normal button OR a Link
// (e.g., using `component={Link}` and `to="/path"`), while keeping
// all ButtonProps fully supported.
type StyledButtonProps = ButtonProps & Partial<LinkProps>;

//Reuses MUI behavior, theme, props, variants, colors. Super flexible. One place for overrides.
//Custom button components only useful if building a totally custom design system.
const StyledButton = styled(Button)<StyledButtonProps>(({ theme }) => ({
  "&.Mui-disabled": {
    backgroundColor: theme.palette.grey[600],
    color: theme.palette.text.disabled,
  },
}));

export default StyledButton;
