const AuthButton = ({ buttonText, type = "submit", ...props }) => {
    return (
        <div className="button-div pt-7 flex flex-col items-center justify-center">
                  <button
                    type={type}
                    className="w-full bg-white border border-orange-300 text-gray-800 p-2 text-xs sm:text-sm rounded hover:bg-orange-300 transition duration-200 font-medium"
                    {...props}
                    >
                    {buttonText}
                  </button>
        </div>
    )
}

export default AuthButton;