import { AuthContextProvider } from './auth';
import { PostContextProvider } from "./post";
import { GlobalStoreContextProvider } from "./store";
import { UserContextProvider } from "./user";

const AppContextProvider = ({ children }) => (
    <AuthContextProvider>
        <GlobalStoreContextProvider>
          <PostContextProvider>
            <UserContextProvider>
                {children}
            </UserContextProvider>
          </PostContextProvider>
        </GlobalStoreContextProvider>
      </AuthContextProvider>
);
  
export { AppContextProvider };