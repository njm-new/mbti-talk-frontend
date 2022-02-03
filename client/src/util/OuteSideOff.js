import { useEffect } from "react";

export const OutSideOff = (ref, btnRef, setFunction) => {
  const handleClickOutside = (event) => {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !btnRef.current.contains(event.target)
    ) {
      setFunction(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};
