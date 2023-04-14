import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const oTema = theme.palette.mode;
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={oTema === "light" ? colors.dark : colors.yellow}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h4"
        color={oTema === "light" ? colors.lightSecondary : colors.primary}
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
