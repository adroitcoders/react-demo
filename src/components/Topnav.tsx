import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { UserDataContext } from '../UserDataContext'

const useStyles = makeStyles({
  mobileNavLinks: {
    textAlign: 'center',
  },
  topnavRightDiv: {
    display: 'flex',
    float: 'right',
    alignItems: 'center',
    height: '64px',
    '@media only screen and (max-width: 900px)': {
      height: '56px',
    },
  },
  desktopAppName: {
  },
  mobileAppName: {
  },
  mobileMenuIcon: {
  },
});


const pages = [{page: 'Graphs', pageUri: '/graphs'},
  {page: 'Reducer', pageUri: '/reducer'},
  {page: 'Payment', pageUri: '/payment'},
  {page: 'Weather', pageUri: 'weather'}
];
const settings = ['Logout'];

const StyledMenuButton = styled(Button)(() => ({
  textTransform: 'none',
  display: 'inline-block',
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'block',
}));

const Topnav = () => {
  const classes = useStyles();
  let userData = React.useContext(UserDataContext);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  // const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (clickedAction: string) => {
    setAnchorElUser(null);
    if(clickedAction === 'Logout'){
      sessionStorage.removeItem('react-demo-session-user');
      window.location.reload();
    }
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Container maxWidth="xl">
          {userData &&
          <StyledToolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, mt: '16px', display: { xs: 'none', md: 'inline-block' }, verticalAlign: 'middle', }}
              className={classes.desktopAppName}
            >
              REACTJS-DEMO
            </Typography>

            <Box sx={{ display: { xs: 'inline-block', md: 'none' }, verticalAlign: 'middle', mt: '4px', }}
              className={classes.mobileMenuIcon}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page:any, idx:number) => (
                  <MenuItem key={idx}>
                    <a
                      href={page.pageUri}
                      className={classes.mobileNavLinks}
                    >{page.page}</a>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'inline-block', md: 'none' }, verticalAlign: 'middle', }}
              className={classes.mobileAppName}
            >
              REACTJS-DEMO
            </Typography>

            <div className={classes.topnavRightDiv}>
              <Box sx={{ display: { xs: 'none', md: 'inline-block' } }}>
                {pages.map((page:any, idx:number) => (
                  <StyledMenuButton
                    key={idx}
                    sx={{ my: 2, color: 'white', display: 'inline-block' }}
                    href={page.pageUri}
                  >
                    {page.page}
                  </StyledMenuButton>
                ))}
              </Box>

              <Box sx={{ display: 'inline-block', ml: '16px', xs: { mt: '8px', }, }}>
                <Tooltip title={userData.name ?? ''}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={userData.name} src={userData.imageUrl} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          </StyledToolbar>
          }
        </Container>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};
export default Topnav;