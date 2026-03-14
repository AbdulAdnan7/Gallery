import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import useFetchPhotos from "../../hooks/useFetchPhotos";
import favouriteReducer from "../../reducers/favouritesReducer";
import { Heart } from "lucide-react";
import SearchBar from "./SearchBar";

const Gallery = () => {
  const { photos, loading, error } = useFetchPhotos();
  const [favourites, dispatch] = useReducer(favouriteReducer, [], () => {
    const saved = localStorage.getItem('favourites')
    return saved ? JSON.parse(saved) : []
  });
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("")

  const handleSearchChange = useCallback((e) => {
    setSearch(e.target.value)
  })

  const filterPhotos = useMemo(() => {
  return photos
  .filter((photo) => {
    if(activeTab === 'favourites') {
        return favourites.includes(photo.id)
    }
    return true
  }).filter((photo) => photo.author.toLowerCase().includes(search.toLocaleLowerCase()))
  }, [photos, favourites, search, activeTab] )
   

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites))
  }, [favourites])

  if (loading)
    return (
      <p className="text-3xl flex items-center justify-center min-h-screen">
        Loading....
      </p>
    );

  if (error)
    return (
      <p className="text-3xl text-red-500 flex justify-center items-center min-h-screen">
        {error}
      </p>
    );

  return (
    <div>
    <div className="flex items-center justify-between mt-8">

  <div className="flex gap-4">

    <button
      onClick={() => setActiveTab("all")}
      className={`px-4 py-2 rounded-lg ${
        activeTab === "all" ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      All
    </button>

    <button
      onClick={() => setActiveTab("favourites")}
      className={`px-4 py-2 rounded-lg ${
        activeTab === "favourites" ? "bg-black text-white" : "bg-gray-200"
      }`}
    >
      Favourites
    </button>

  </div>

   <SearchBar 
   search={search}
   onSearchChange={handleSearchChange}
   />

</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterPhotos.map((photo) => {
          const isFavorite = favourites.includes(photo.id);

          return (
            <div key={photo.id} className="p-2 relative group">
              <img
                src={photo.download_url}
                alt={photo.author}
                className="w-full h-72 object-cover rounded-xl mt-4"
              />

              <button
                className={`absolute right-6 top-10 z-10 p-2 transition
                ${isFavorite ? "text-red-500 fill-red-500" : "text-white"}
                opacity-0 group-hover:opacity-100`}
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch({
                    type: "TOGGLE_FAVOURITE",
                    payload: photo.id,
                  });
                }}
              >
                <Heart />
              </button>

              <div className="absolute text-md font-bold pl-2 bottom-4 text-white text-start opacity-100">
                <p>{photo.author}</p>
                <p>
                  {photo.width} X {photo.height}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
