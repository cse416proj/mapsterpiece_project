import { Box } from "@mui/material";

import { SideNavBar } from "../../index";

function SearchScreen(){
    return (
        <Box className='content'>
            <SideNavBar />
            {/* <Box className="communityScreenContent">
                <SearchBar setSearch={setSearch}/>
                <Box className="listsDisplay">
                {listCard}
                </Box>
            </Box>
            */}
        </Box>
    )
}

export default SearchScreen;