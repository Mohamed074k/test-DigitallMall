// FavouriteContext.js
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(() => {
    const storedFavourites = localStorage.getItem("favourites");
    return storedFavourites ? JSON.parse(storedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = (item) => {
    setFavourites((prev) => {
      if (prev.some((m) => m.id === item.id)) return prev;
      return [...prev, item];
    });
    toast.success("Added to favourites successfully!");
  };

  const removeFromFavourites = (id) => {
    setFavourites((prev) => prev.filter((m) => m.id !== id));
    toast.success("Removed successfully!");
  };

  const toggleFavourite = (item) => {
    if (favourites.find((m) => m.id === item.id)) removeFromFavourites(item.id);
    else addToFavourites(item);
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  const favouritesCount = favourites.length;

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        toggleFavourite,
        clearFavourites,
        favouritesCount,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
