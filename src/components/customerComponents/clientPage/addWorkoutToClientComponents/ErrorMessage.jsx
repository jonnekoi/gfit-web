const ErrorMessage = ({ message }) => {
    return (
        <div className="mt-5 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 montserrat-text text-center font-medium">{message}</p>
        </div>
    );
};

export default ErrorMessage;
