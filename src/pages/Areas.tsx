import { useState } from "react";
import { data } from "../data";
import { Settings } from "lucide-react";
import Area from "../components/Area";
import { Area as AreaType } from "../types";

const Areas = () => {
  const [search, setSearch] = useState("");

  // Filter areas based on search input
  const filteredAreas = data.filter((area) =>
    area.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 flex flex-col gap-y-4">
      {/* Search & Settings */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search areas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-2 border rounded-lg text-lg"
        />
        <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Area List */}
      <div className="grid grid-cols-1 gap-y-4">
        {filteredAreas.length > 0 ? (
          filteredAreas.map((area) => (
            <div key={area.name} className="p-3 bg-gray-50 rounded-lg">
              <a href={`/${area.name}`} className="font-bold text-lg block">
                {area.displayName}
              </a>
              <Area area={area as AreaType} />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No areas found</p>
        )}
      </div>
    </div>
  );
};

export default Areas;
