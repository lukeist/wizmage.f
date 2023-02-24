import { useCallback, useEffect, useState } from "react";

export default function useInfinityScroll(ref) {
  let [isVisible, setIsVisible] = useState(false);

  const handleIntersection = useCallback(([entry]) => {
    if (entry.isIntersecting) {
      setIsVisible(true);
    } else if (!entry.isIntersecting) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    let element;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    };

    // Create the observer, passing in the callback
    const observer = new IntersectionObserver(handleIntersection, options);

    // If we have a ref value, start observing it
    if (ref.current) {
      element = ref.current;
      observer.observe(element);
    }

    // If unmounting, disconnect the observer
    return () => {
      if (element instanceof Element) {
        observer.unobserve(element);
      }
      observer.disconnect();
    };
  }, [ref.current, handleIntersection]);

  console.log(isVisible);
  return isVisible;
}

// backup file: https://codesandbox.io/s/blazing-field-p5m6pu?file=/src/components/CountriesSection.jsx
