import { Bounce, ToastContainer, toast } from "react-toastify";

export default function Character({ character }: { character: string }) {
  const notify = () =>
    toast.success(`${character} copied to clipboard`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
  function copyToClipboard() {
    navigator.clipboard.writeText(character);
    notify();
  }

  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 bg-black/5 shadow-md rounded-lg md:w-1/4 w-full ">
      <div className="text-center">
        <h1 className="text-3xl font-bold">{character}</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={copyToClipboard}
        >
          Copy
        </button>
        <ToastContainer />
      </div>
    </div>
  );
}
