const Button = ({ text, onClick, active }) => {
    return (
        <button
            className={`text-white min-w-0 flex-grow md:flex-grow-0 md:min-w-32 bg-gradient-to-r 
                ${active
                ? "from-orange-500 to-orange-400"
                : "from-orange-600 to-orange-500"} 
                font-bold py-2 px-3 bruno-ace-sc-regular rounded-lg shadow-md 
                hover:from-orange-500 hover:to-orange-400 transition-all transform hover:scale-105`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default Button;
