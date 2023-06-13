import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useSelector } from "react-redux";
import { ReactComponent as LogoCevit } from "../../logocevit.svg";
import {
  AddBusinessOutlined,
  ArticleOutlined,
  FileUploadOutlined,
  FunctionsOutlined,
  GroupAddOutlined,
  PermContactCalendarOutlined,
  PersonAddAlt1Outlined,
  StoreOutlined,
} from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.white,
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography fontSize={14}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const oUsuarios = useSelector((state) => state.usuario);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Análisis");
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Box
      sx={{
        height: `${windowHeight}px`,
        "& .pro-sidebar-inner": {
          background: `${colors.redWine} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item:hover": {
          color: colors.lightSecondary + "!important",
        },
        "& .pro-menu-item.active": {
          color: colors.white + "!important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.white,
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <LogoCevit width="100" fill="white" />

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.white}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {oUsuarios.user.nombre}
                </Typography>
                <Typography variant="h5" color={colors.yellow}>
                  {oUsuarios.user.rol}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Análisis"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.yellow}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Registros
              </Typography>
            ) : (
              <></>
            )}

            <Item
              title="Tabla de Usuarios"
              to="/TablaUsuarios"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tabla Externos"
              to="/TablaExternos"
              icon={<StoreOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Tabla de Clientes"
              to="/TablaClientes"
              icon={<PermContactCalendarOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            {!isCollapsed ? (
              <Typography
                variant="h6"
                color={colors.yellow}
                sx={{ m: "15px 0 5px 20px" }}
              >
                Formularios
              </Typography>
            ) : (
              <></>
            )}
            <Item
              title="Recepción"
              to="/RecepcionForm"
              icon={<ArticleOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Agregar Usuarios"
              to="/UsuariosForm"
              icon={<GroupAddOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Agregar Externos"
              to="/ExternosForm"
              icon={<AddBusinessOutlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Agregar Clientes"
              to="/ClientesForm"
              icon={<PersonAddAlt1Outlined />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Subir Análisis"
              to="/AnalisisForm"
              icon={<FileUploadOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Calcular Desviación"
              to="/DesviacionForm"
              icon={<FunctionsOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
