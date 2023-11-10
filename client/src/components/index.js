import NavBar from './appbars/NavBar';
import SideNavBar from './appbars/SideNavBar';
import SearchBar from './appbars/SearchBar';
import Copyright from './Copyright';

import Hero from './screens/home/Hero';
import UserHomeScreen from './screens/home/UserHomeScreen';
import HomeScreen from './screens/home/HomeScreen';

import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import AuthScreen from './screens/auth/AuthScreen';
import AuthErrorModal from './modals/AuthErrorModal';
import CommunityScreen from './screens/CommunityScreen';
import PostDetailScreen from './screens/PostDetailScreen';

import DynamicCard from './cards/DynamicCard'

/*
    This is a module of import/export components
*/
export { 
    Hero,
    Login,
    NavBar,
    Register, 
    Copyright,
    HomeScreen,
    AuthScreen,
    UserHomeScreen,
    AuthErrorModal,
    CommunityScreen,
    SideNavBar,
    SearchBar,
    DynamicCard,
    PostDetailScreen
}