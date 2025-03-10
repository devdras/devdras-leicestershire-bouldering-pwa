import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { crags } from "./Crags";

const CragDetails = () => {
  const { cragName } = useParams();
  const [crag, setCrag] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // Your effect logic here
    const thisCrag = crags.find((c) => c.name === cragName);

    if (thisCrag) {
      console.log("Crag found:", thisCrag);
    } else {
      console.log("Crag not found.");
      setNotFound(true);
    }
    setCrag(thisCrag);
  }, []);

  if (notFound) {
    return <div>Crag not found</div>;
  }

  return (
    <div>
      <h2>{crag.displayName}</h2>
      <p>{crag.about}</p>
      <button className="rounded bg-black text-white p-2">Find out more</button>
    </div>
  );
};
export default CragDetails;
