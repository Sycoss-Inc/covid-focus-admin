import { useLayoutEffect } from "react";

function Modal(props) {
  useLayoutEffect(() => {
    document.body.style.paddingRight =
      (window.innerWidth - document.body.clientWidth).toString() + "px";
    document.body.style.overflow = "hidden";

    const checkKey = (e) => {
      if (e.key === "Escape") props.setShowModal(false);
    };
    document.addEventListener("keydown", checkKey);

    return () => {
      document.body.style = "";
      document.removeEventListener("keydown", checkKey);
    };
  }, [props]);

  return (
    <div className="fixed z-20 inset-0">
      <div
        className="absolute inset-0 bg-black opacity-75"
        onClick={() => props.setShowModal(false)}
      ></div>
      <div
        className="absolute left-1/2 top-1/2 pointer-events-none"
        style={{ transform: "translate(-50%,-50%)", touchAction: "none" }}
      >
        <div className="w-screen p-5 sm:p-10">
          <img
            className="w-full max-w-screen-md max-h-screen m-auto pointer-events-auto"
            src={props.imageUrl}
            alt="pic"
            style={{ touchAction: "auto" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Modal;
