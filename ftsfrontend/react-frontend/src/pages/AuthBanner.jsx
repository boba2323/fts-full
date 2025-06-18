const AuthBanner = (props) => {
    return (
        <div className="flex flex-col justify-center items-center pb-10 pt-10">
            <h1 className="text-gray-900 text-2xl font-bold ">{props.title}</h1>
            <p className="text-gray-700 sm:text-xs">{props.subtitle}</p>
          </div>
    )
}

export default AuthBanner;