import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

// https://react.dev/reference/react-dom/components/select
const SelectInput = ({
    name,
    value,
    onChange,
    labelName, 
    selectField,
    fieldOptions,
    loading,
    keyType,
    fieldDefiner ,
    serialiserTpe
    // onChange,
    // inputValue  //this prop is obtained from signup page the parent component. we pass the value from there to the 
    // inputlabel component to maintain a single source of truth for the input value
    }) => {
  return (
    <div>
      <label htmlFor={name}  className="selectinput flex flex-start items-center justify-start w-full text-gray-700 my-1 sm:text-xs font-bold mb-2 py-2">{labelName}</label>  
        {/* <option selected>{selectField}</option> */}
        {loading
        ?<Loading/>
        :<>
            <select 
              name={name}
              onChange={onChange}
              id={name} 
              value={value}
              className="bg-gray-50 border border-gray-300
              text-gray-700 my-1 sm:text-xs font-bold mb-2 rounded-lg
              focus:ring-green-500 focus:border-green-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-green-500 dark:focus:border-yellow-500">

                {/* https://forum.djangoproject.com/t/post-to-hyperlinkedmodelserializer/6889 */}
                {/* for value, we must enter the urls since the serialiser in backend in a a hyperlinkedomdel */}
              <option value=''>{selectField}</option>  
              {fieldOptions.map((field)=>{
                  return<option key={field[keyType]} value={field[serialiserTpe]}>{field[fieldDefiner]}</option>
                      }
                  )
              }
            </select>
         </>
        }
           
    </div>
  )
}

export default SelectInput
