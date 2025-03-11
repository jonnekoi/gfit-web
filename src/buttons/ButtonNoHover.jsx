const ButtonNoHover = ({ text, onClick }) => {
    return (
        <button
            className="text-white min-w-44 bg-gradient-to-r from-orange-600 to-orange-500 font-bold p-3 bruno-ace-sc-regular rounded-lg shadow-md hover:from-orange-500 hover:to-orange-400"
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ButtonNoHover;
