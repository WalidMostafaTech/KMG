import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getSearch } from "@/services/mainServices";
import { useNavigate } from "react-router";

const HeaderSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const navigate = useNavigate();

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // React Query for search
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", debouncedSearch],
    queryFn: () => getSearch(debouncedSearch),
    enabled: debouncedSearch.length > 0,
    staleTime: 30000,
  });

  const handleGameClick = (game) => {
    navigate(`/games/accounts/${game.id}`);
    setIsModalOpen(false);
    setSearchTerm("");
    setDebouncedSearch("");
    // Add your navigation logic here
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearch("");
  };

  const SearchResults = ({ mobile = false }) => {
    if (!debouncedSearch) return null;

    if (isLoading) {
      return (
        <div
          className={`p-4 text-center text-gray-500 ${mobile ? "" : "card"}`}
        >
          جاري البحث...
        </div>
      );
    }

    if (!searchResults || searchResults.length === 0) {
      return (
        <div
          className={`p-4 text-center text-gray-500 ${mobile ? "" : "card"}`}
        >
          لا توجد نتائج
        </div>
      );
    }

    return (
      <div className={`mt-2 max-h-96 overflow-y-auto ${mobile ? "" : "card"}`}>
        {searchResults.map((game) => (
          <button
            key={game.id}
            onClick={() => handleGameClick(game)}
            className={`w-full flex items-center gap-3 p-3 bg-muted rounded-md hover:brightness-90 transition-colors`}
          >
            <img
              src={game.icon || game.image}
              alt={game.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1 text-right">
              <h3 className="font-semibold">{game.name}</h3>
              {game.service && (
                <p className="text-sm text-gray-500">{game.service}</p>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="flex-1">
        {/* Mobile Search Button */}
        <div className="lg:hidden flex justify-end">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => setIsModalOpen(true)}
          >
            <Search />
          </Button>
        </div>

        {/* Desktop Search */}
        <div className="hidden lg:block relative">
          <div className="w-full flex items-center gap-2 bg-input py-2 px-4 rounded-full">
            <Search className="text-gray-500" />
            <input
              placeholder="بحث ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 outline-none border-none bg-transparent"
            />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {searchTerm && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50">
              <SearchResults />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="fixed top-4 left-1/2 -translate-x-1/2 translate-y-0 sm:max-w-md w-[calc(100%-2rem)] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center"></DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-2 bg-input py-2 px-4 rounded-full">
              <Search className="text-gray-500" />
              <input
                placeholder="بحث ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 outline-none border-none bg-transparent"
                autoFocus
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <SearchResults mobile={true} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default HeaderSearch;
