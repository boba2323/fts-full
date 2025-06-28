const AuthButton = ({ buttonText, type = "submit", ...props }) => {
    return (
        <div className="button-div pt-7 flex flex-col items-center justify-center">
                  <button
                    type={type}
                    className="w-full bg-green-600 text-gray-50 p-2 text-xs sm:text-sm rounded hover:bg-green-400 transition duration-200 font-medium"
                    {...props}
                    >
                    {buttonText}
                  </button>
        </div>
    )
}

export default AuthButton;