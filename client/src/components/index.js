import NavBar from './appbars/NavBar'
import Copyright from './Copyright';

import Hero from './screens/home/Hero';
import UserHomeScreen from './screens/home/UserHomeScreen';
import HomeScreen from './screens/home/HomeScreen';

import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import AuthScreen from './screens/auth/AuthScreen';
import AuthErrorModal from './modals/AuthErrorModal';

import Profile from './screens/user/Profile';

/*
    This is a module of import/export components
*/
export { 
    Hero,
    Login,
    NavBar,
    Profile,
    Register, 
    Copyright,
    HomeScreen,
    AuthScreen,
    UserHomeScreen,
    AuthErrorModal
}