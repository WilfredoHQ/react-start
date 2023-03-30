import {
  AccountCircle as AccountCircleIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material"
import {
  AppBar,
  Avatar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Menu,
  MenuItem,
  SwipeableDrawer,
  Toolbar,
} from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCurrentQuery } from "src/hooks/useAccount"
import { useAuth } from "src/hooks/useAuth"
import s from "./Navbar.module.scss"

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const currentQuery = useCurrentQuery()
  const { handleLogout } = useAuth()

  return (
    <>
      <AppBar position="sticky">
        <Toolbar className={s.toolbar}>
          <div className={s.menuIcon}>
            <IconButton
              color="inherit"
              onClick={() => {
                setOpen(true)
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className={s.navigationButtons}>
            <Button component={Link} to="/" color="inherit" startIcon={<HomeIcon />}>
              Inicio
            </Button>
            <Button
              component={Link}
              to="/usuarios"
              color="inherit"
              startIcon={<PeopleIcon />}
            >
              Usuarios
            </Button>
          </div>
          <IconButton
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setAnchorEl(event.currentTarget)
            }}
          >
            <Avatar src="" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={() => {
              setAnchorEl(null)
            }}
          >
            <MenuItem
              component={Link}
              to={`/usuarios/${currentQuery.data?.id ?? ""}`}
              onClick={() => {
                setAnchorEl(null)
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              Perfil
            </MenuItem>
            <Divider />
            <MenuItem
              component={Link}
              to="/configuracion"
              onClick={() => {
                setAnchorEl(null)
              }}
            >
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              Configuración
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={() => {
          setOpen(false)
        }}
        onOpen={() => {
          setOpen(true)
        }}
      >
        <List className={s.navigationList}>
          <ListItem
            component={Link}
            to="/"
            disablePadding
            className={s.navigationItem}
            onClick={() => {
              setOpen(false)
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              Inicio
            </ListItemButton>
          </ListItem>
          <ListItem
            component={Link}
            to="/usuarios"
            disablePadding
            className={s.navigationItem}
            onClick={() => {
              setOpen(false)
            }}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              Usuarios
            </ListItemButton>
          </ListItem>
        </List>
      </SwipeableDrawer>
    </>
  )
}

export default Navbar
