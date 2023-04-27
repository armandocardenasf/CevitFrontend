import { Box } from "@mui/material";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";

const TableBox = ({ children }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const oTema = theme.palette.mode;

  return (
    <Box
      m="40px 0 0 0"
      height="75vh"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
          color: colors.primary,
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          color: colors.primary,
        },
        "& .name-column--cell": {
          color: colors.white,
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.lightSecondary,
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.grey,
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.lightSecondary,
        },
        "& .MuiCheckbox-root": {
          color: `${colors.secondary} !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `${
            oTema === "light" ? colors.dark : colors.primary
          } !important`,
        },
        maxWidth: "100%",
      }}
    >
      {children}
    </Box>
  );
};

export default TableBox;
