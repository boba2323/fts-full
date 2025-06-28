const AuthBanner = (props) => {
    return (
        <div className="flex flex-col justify-center items-center pb-10 pt-10 md:pb-10 md:pt-10">
            <h1 className="text-gray-900 text-xl sm:text-2xl md:text-2xl font-bold ">{props.title}</h1>
            <p className="text-gray-700 text-xs sm:text-xs md:text-xs">{props.subtitle}</p>
          </div>
    )
}

export default AuthBanner;