import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import {
  LogLevel,
  Configuration,
  BrowserCacheLocation,
  InteractionType,
} from '@azure/msal-browser';
import { environment } from 'src/environments/environment';


const isIE =
  window.navigator.userAgent.indexOf('MSIE ') > -1 ||
  window.navigator.userAgent.indexOf('Trident/') > -1;

/***********************************************************
 * User Flows and Custom Policies for B2C application,
 ***********************************************************/
export const b2cPolicies = {
  names: { // User Flows
    signUpSignIn: 'B2C_1_SignUpSignIn',
    editProfile: 'B2C_1_ProfileEdit',
    passwordReset: 'B2C_1_PasswordReset',
  },
  authorities: {
    signUpSignIn: {
      authority:
        'https://TravelTrackApp.b2clogin.com/TravelTrackApp.onmicrosoft.com/B2C_1_SignUpSignIn',
    },
    editProfile: {
      authority:
        'https://TravelTrackApp.b2clogin.com/TravelTrackApp.onmicrosoft.com/B2C_1_ProfileEdit',
    },
    passwordReset: {
      authority:
        'https://TravelTrackApp.b2clogin.com/TravelTrackApp.onmicrosoft.com/B2C_1_PasswordReset',
    },
  },
  authorityDomain: 'TravelTrackApp.b2clogin.com',
  scopes: [ // all scopes for full access to Travel Track API
    'https://TravelTrackApp.onmicrosoft.com/TravelTrack/api/Trips.Read',
    'https://TravelTrackApp.onmicrosoft.com/TravelTrack/api/Trips.Write',
    'https://TravelTrackApp.onmicrosoft.com/TravelTrack/api/User.Read',
    'https://TravelTrackApp.onmicrosoft.com/TravelTrack/api/User.Write',
  ],
};


/***********************************************************
 * MSAL:
 * Configuration object to be passed to MSAL instance on creation.
 ***********************************************************/
export const msalConfig: Configuration = {
  auth: {
    clientId: environment.ADClientId,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain], // Mark B2C tenant domain as trusted.
    redirectUri: '/', // Points to window.location.origin. Registed URI on Azure portal/App Registration.
    postLogoutRedirectUri: '/',
    //  navigateToLoginRequestUrl:true
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      loggerCallback(logLevel: LogLevel, message: string) {
        // console.log(message); // still being used in dev
      },
      logLevel: LogLevel.Verbose,
      piiLoggingEnabled: false,
    },
  },
};



/***********************************************************
 * Setup protectedResourceMap value
***********************************************************/
const protectedResourceMap = new Map<string, Array<string>>();
protectedResourceMap.set(
  environment.TravelTrackAPI + '/trips',
  b2cPolicies.scopes
  );

/***********************************************************
 * MSAL:
 * MsalInterceptorConfiguration object to be passed to MSAL instance on creation.
***********************************************************/
export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap,
};



/***********************************************************
 * Scopes will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
***********************************************************/
export const loginRequest = {
  scopes: ['email']
};

/***********************************************************
 * MSAL:
 * MsalGaurdConfiguration object to be passed to MSAL instance on creation.
 ***********************************************************/
export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: loginRequest,
};


