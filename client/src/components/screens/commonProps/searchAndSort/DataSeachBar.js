import { Paper, InputBase } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';

import { DynamicCard } from '../../../cards';

export default function DataSeachBar({type, inputRef, searchInput, setSearchInput, setSearchResult, data, setCards}) {
    // update search input when user enter something
    const updateSearchInput = (event) => {
        event.stopPropagation();
        event.preventDefault();
        setSearchInput(event.target.value);
        inputRef.current.value = event.target.value;
    }

    // search when user hits enter key
    const handleSearch = (event) => {
        if(event.key !== 'Enter'){
        return;
        }

        // do not search when input is empty
        const trimmedInputWithoutSpace = searchInput.replace(/(\s|\r\n|\n|\r)/gm, '');
        if(trimmedInputWithoutSpace.length === 0){
            return;
        }

        let searchResult = data.filter((pair) => {
            const searchTerm = searchInput.toLowerCase();
            return (
              searchTerm === '' ||
              pair.title.toLowerCase().includes(searchTerm) ||
              pair.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
            );
        });
        
        setSearchResult(searchResult);

        setCards(
            searchResult?.map((pair, index) => (
                (type === 'map') ?
                    <DynamicCard key={index} userData={null} mapData={pair} postData={null}/> :
                    <DynamicCard key={index} userData={null} mapData={null} postData={pair}/>
            ))
        );
    }

    // clear search
    const handleClearSearch = () => {
        if(inputRef.current){
          setSearchInput('');
          inputRef.current.value = '';
          inputRef.current.focus();
        }
      }

    if(!data){
        return null;
    }

    return (
        <Paper
            component="form"
            onSubmit={(event) => {event.preventDefault();}}
            sx={{
              display: "flex",
              alignItems: "center",
              height: '6vh',
              width: '52.5%',
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
              <InputBase
              onChange={updateSearchInput}
              onKeyDown={handleSearch}
              value={searchInput}
              inputRef={inputRef}
              sx={{ ml: 1, flex: 1 }}
              placeholder='Search by title or tags...'
              endAdornment={
                (String(inputRef?.current?.value)?.replace(/(\s|\r\n|\n|\r)/gm, '').length > 0) ?
                  <ClearIcon onClick={handleClearSearch} 
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "white",
                    ":hover": {
                      backgroundColor: "#aaa", 
                      transition: "background-color 0.5s", 
                    },
                    borderRadius: "50%", 
                    marginLeft: "8px",
                    transition: "background-color 1s", 
                    "&:active": {
                      backgroundColor: "#ccc", 
                    },
                  }}
                  /> :
                  null
                }
            />
          </Paper>
    )
}