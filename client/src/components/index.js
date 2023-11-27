import NavBar from './appbars/NavBar';
import SideNavBar from './appbars/SideNavBar';
import SearchBar from './appbars/SearchBar';
import Copyright from './footer/Copyright';

import Hero from './screens/home/Hero';
import UserHomeScreen from './screens/home/UserHomeScreen';
import HomeScreen from './screens/home/HomeScreen';

import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import ForgotPassword from './screens/auth/password/ForgotPassword';
import ResetPassword from './screens/auth/password/ResetPassword';
import PasswordScreen from './screens/auth/PasswordScreen';
import AuthScreen from './screens/auth/AuthScreen';
import AuthErrorModal from './modals/AuthErrorModal';
import DeletePostModal from './modals/DeletePostModal';
import DeleteAccountModal from './modals/DeleteAccountModal';
import DeleteMapModal from './modals/DeleteMapModal';
import UploadMapErrorModal from './modals/UploadMapErrorModal';

import Profile from './screens/profile/Profile';
import SearchScreen from './screens/search/SearchScreen';
import CreateScreen from './screens/create/CreateScreen';
import { Tags, Tag } from './screens/commonProps';

import DynamicCard from './cards/DynamicCard'
import CommunityScreen from './screens/community/CommunityScreen';

import MapsCardSection from './screens/listFilter/MapsCardSection';
import PostsCardSection from './screens/listFilter/PostsCardSelection';
import UsersCardSection from './screens/listFilter/UsersCardSelection';
import MapsPostsCardSection from './screens/listFilter/MapsPostsCardSelection';

import PostDetailScreen from './screens/post/PostDetailScreen';
import PostComment from './screens/post/PostComment';
import PostEditScreen from './screens/edit/post/PostEditScreen';
import DeleteCommentModal from './modals/DeleteCommentModal';
import DeleteSubCommModal from './modals/DeleteSubCommModal';

import MapScreen from './screens/map/display/MapScreen';
import MapEditScreen from './screens/edit/map/MapEditScreen';
import MaybeShowNavBar from './appbars/MaybeShowNavBar';
import MapEditTopBar from './appbars/MapEditTopBar';
import MapEditSideBar from './appbars/MapEditSideBar';
import MapDetailTopBar from './appbars/MapDetailTopBar';

import Warning from './screens/Warning';

import MapCommentSideBox from './appbars/MapCommentSideBox';
import MapComment from './appbars/MapComment';
/*
    This is a module of import/export components
*/
export { 
    Hero,
    Login,
    NavBar,
    Register,
    ForgotPassword,
    ResetPassword,
    PasswordScreen,
    Copyright,
    HomeScreen,
    AuthScreen,
    UserHomeScreen,
    AuthErrorModal,
    DeletePostModal,
    DeleteAccountModal,
    DeleteMapModal,
    UploadMapErrorModal,
    SideNavBar,
    SearchScreen,
    SearchBar,
    Profile,
    Tags,
    Tag,
    CreateScreen,
    DynamicCard,
    CommunityScreen,
    MapsCardSection,
    PostsCardSection,
    UsersCardSection,
    MapsPostsCardSection,
    PostDetailScreen,
    PostComment,
    PostEditScreen,
    MapScreen,
    MapEditScreen,
    MaybeShowNavBar,
    MapEditTopBar,
    MapEditSideBar,
    DeleteCommentModal,
    DeleteSubCommModal,
    MapDetailTopBar,
    Warning,
    MapCommentSideBox, 
    MapComment, 
}