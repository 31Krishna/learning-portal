import { useEffect } from "react";

function useProtection() {

  useEffect(() => {

    const disableContextMenu = (e) => {
      e.preventDefault();
    };

    const disableKeys = (e) => {

      // F12
      if (e.key === "F12") {
        e.preventDefault();
      }

      // Ctrl+Shift+I
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "i"
      ) {
        e.preventDefault();
      }

      // Ctrl+Shift+J
      if (
        e.ctrlKey &&
        e.shiftKey &&
        e.key.toLowerCase() === "j"
      ) {
        e.preventDefault();
      }

      // Ctrl+U
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "u"
      ) {
        e.preventDefault();
      }

    };

    document.addEventListener(
      "contextmenu",
      disableContextMenu
    );

    document.addEventListener(
      "keydown",
      disableKeys
    );

    return () => {

      document.removeEventListener(
        "contextmenu",
        disableContextMenu
      );

      document.removeEventListener(
        "keydown",
        disableKeys
      );

    };

  }, []);

}

export default useProtection;