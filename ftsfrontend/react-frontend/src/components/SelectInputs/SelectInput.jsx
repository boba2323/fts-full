import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'

const SelectInput = ({
    labelName, 
    selectField,
    fieldOptions,
    loading,
    keyType,
    fieldDefiner 
    // onChange,
    // inputValue  //this prop is obtained from signup page the parent component. we pass the value from there to the 
    // inputlabel component to maintain a single source of truth for the input value
    }) => {
  return (
    <div>
      <label htmlFor="customselect" className="selectinput flex flex-start items-center justify-start w-full text-gray-700 my-1 sm:text-xs font-bold mb-2 py-2">{labelName}</label>
           
            {/* <option selected>{selectField}</option> */}
            {loading
            ?<Loading/>
            :<>
                <select id="customselect" 
                        className="bg-gray-50 border border-gray-300
                        text-gray-700 my-1 sm:text-xs font-bold mb-2 rounded-lg
                        focus:ring-green-500 focus:border-green-500 block w-full p-2.5
                        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                            dark:text-white dark:focus:ring-green-500 dark:focus:border-yellow-500">
                    <option value="">{selectField}</option>  
                    {fieldOptions.map((field)=>{
                        return<option key={field[keyType]} value={field[keyType]}>{field[fieldDefiner]}</option>
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
