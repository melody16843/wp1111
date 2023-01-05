import { useState, createContext, useContext } from "react";

const SearchContext = createContext(
    {
        isAddFavorite:false,
        inFavorite:[]
    }
);

const SearchProvider = (props) => {
    const [isAddFavorite, setIsAddFavorite] = useState(false);
    const [inFavorite, setInFavorite] = useState([]);
    


    return (
        <SearchContext.Provider
            value={{
                isAddFavorite, setIsAddFavorite, inFavorite, setInFavorite
            }}
            {...props}
        />
    );
}

const useSearch = () => useContext(SearchContext);

export {SearchProvider, useSearch}