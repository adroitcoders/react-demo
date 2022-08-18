import React from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import CircularProgress from '@mui/material/CircularProgress';
import ACLogo from '../assets/images/ac-logo.png';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const useStyles = makeStyles({
    logoDiv: {
      textAlign: 'center',
    },
    logoImage: {
    },
    appNameDiv: {
      textAlign: 'center',
      color: '#2ECC71',
      fontSize: '60px',
      fontWeight: 'bold',
      margin: '20px 0px',
    },
    socialLoginButtonsDiv: {
      marginTop: '50px',
    },
    orText: {
      textAlign: 'center',
      margin: '20px 0px',
      color: '#333333',
      fontSize: '20px',
      fontWeight: 'bold',
    },
    circularProgressIcon: {
      height: '24px',
      width: '24px',
      marginLeft: '8px',
    },
});

const StyledPaper = styled(Paper)(() => ({
  minHeight: '100px',
  maxWidth: '500px',
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: '60px',
  padding: '30px',
  borderRadius: '6px',
}));

const StyledGoogleButton = styled(Button)(() => ({
  textTransform: 'none',
  backgroundColor: '#4285F4',
  lineHeight: '32px',
  '&:hover': {
    backgroundColor: '#4285F4',
  },
}));

const StyledFacebookButton = styled(Button)(() => ({
  textTransform: 'none',
  lineHeight: '32px',
}));


const LoginComponent = () => {
  const classes = useStyles();
  const [inProgress, setInProgress] = React.useState(false);

  const handleGoogleLogin = (data:any) => {
    if(!data.error){
      const userInfo = {
        email: data?.profileObj?.email||'',
        name: data?.profileObj?.name||'',
        imageUrl: data?.profileObj?.imageUrl||'',
        googleId: data?.profileObj?.googleId||'',
      }
      sessionStorage.setItem(
        'react-demo-session-user',
        JSON.stringify(userInfo)
      );
      setInProgress(false);
      window.location.reload();
    }else{
      console.log('Google Response Error:', data.error);
      setInProgress(false);
    };
  }

  function handleFacebookResponse(response:any) {
    console.log("handleFacebookResponse > response:", response);
    if(response && response.id && response.name){
      const userInfo = {
        email: '',
        name: response?.name||'',
        imageUrl: `https://graph.facebook.com/${response?.userID}/picture?access_token=${response?.accessToken}`||'',
        facebookId: response?.id||'',
      }
      sessionStorage.setItem(
        'react-demo-session-user',
        JSON.stringify(userInfo)
      );
      setInProgress(false);
      window.location.reload();
    }else{
      console.log('Facebook Response Error:', response);
      setInProgress(false);
    };


  }

  return (
    <StyledPaper elevation={0} >
      <div className={classes.logoDiv}>
        <img
          src={ACLogo}
          alt={'<adroitCoders />'}
          className={classes.logoImage}
        />
      </div>

      <div className={classes.appNameDiv}>
        ReactJs - Demo
      </div>

      <div className={classes.socialLoginButtonsDiv}>
        
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID||''}
          render={renderProps => (
            <StyledGoogleButton
              variant="contained"
              size="large"
              fullWidth={true}
              startIcon={<GoogleIcon />}

              onClick={()=>{
                setInProgress(true);
                renderProps.onClick();
              }}
              disabled={renderProps.disabled || inProgress}
            >
              {/* <span className={classes.googleLogo}><Image src={GoogleLogo}/></span> */}
              Log in with Google
              {inProgress ? <CircularProgress className={classes.circularProgressIcon }/> : ''}
            </StyledGoogleButton>
          )}
          buttonText="Login"
          onSuccess={handleGoogleLogin}
          onFailure={handleGoogleLogin}
          scope='https://www.googleapis.com/auth/userinfo.profile'
          cookiePolicy={'single_host_origin'}
        />

        <div className={classes.orText}>
          OR
        </div>


        <FacebookLogin
          appId="467654545158842"
          autoLoad={false}
          fields="name,email,picture"
          scope="public_profile,user_friends"
          callback={handleFacebookResponse}
          render={(renderProps:any) => (
            <StyledFacebookButton
              variant="contained"
              size="large"
              fullWidth={true}
              startIcon={<FacebookIcon />}
              onClick={renderProps.onClick}
            >
              Log in with Facebook
            </StyledFacebookButton>
          )}
        />

      </div>

    </StyledPaper>
  );
}

export default LoginComponent;
