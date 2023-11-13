import { AuthContextProvider } from './auth';
import { PostContextProvider } from "./post";
import { MapContextProvider } from "./map";
import { GlobalStoreContextProvider } from "./store";
import { UserContextProvider } from "./user";

const AppContextProvider = ({ children }) => (
    <AuthContextProvider>
      <GlobalStoreContextProvider>
        <MapContextProvider>
          <PostContextProvider>
            <UserContextProvider>
              {children}
            </UserContextProvider>
          </PostContextProvider>
        </MapContextProvider>
      </GlobalStoreContextProvider>
    </AuthContextProvider>
);
  
export { AppContextProvider };