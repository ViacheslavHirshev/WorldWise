import { useSearchParams } from "react-router-dom";

export const useUrlPosition = () => {
  const [queryParams] = useSearchParams();

  const lat = queryParams.get("lat");
  const lng = queryParams.get("lng");

  return [lat, lng];
};
