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

import Profile from './screens/user/Profile';
import CreateScreen from './screens/create/CreateScreen';

import CommunityScreen from './screens/CommunityScreen';

import DynamicCard from './cards/DynamicCard'

import MapsCardSection from './screens/listFilter/MapsCardSection';
import PostsCardSection from './screens/listFilter/PostsCardSelection';

import PostDetailScreen from './screens/post/PostDetailScreen';
import PostComment from './screens/post/PostComment';

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
    SideNavBar,
    SearchBar,
    Profile,
    CreateScreen,
    DynamicCard,
    CommunityScreen,
    MapsCardSection,
    PostsCardSection,
    PostDetailScreen,
    PostComment
}