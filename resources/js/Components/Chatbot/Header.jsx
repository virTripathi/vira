import CloseIcon from "../Icons/CloseIcon";

function Header({ onClick }) {
  return (
    <div className="flex justify-center items-center bg-gray-800 relative">
      <h4 className="block text-center text-xl font-medium text-white rounded-corners pt-2 pb-2">
        Chat with me
      </h4>
      <CloseIcon
        className="absolute right-2 h-6 w-6 hover:cursor-pointer"
        color="white"
        onClick={onClick}
      />
    </div>
  );
}

export default Header;
