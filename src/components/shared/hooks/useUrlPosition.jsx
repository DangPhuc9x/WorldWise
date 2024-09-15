import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // Similar to useState
  // Return an array: [currentState, func to set/update searchParam]
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return [lat, lng];
}
