const AuthButton = (props) => {
    return (
        <div className="button-div pt-7 flex flex-col items-center justify-center">
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-gray-900 p-2 sm:text-sm rounded hover:bg-green-400 transition duration-200 font-medium"
                    >
                    {props.buttonText}
                  </button>
        </div>
    )
}

export default AuthButton;