import React, { useState } from 'react'

// https://medium.com/@matthudson1509/explicit-prop-spreading-in-react-explicitly-spread-the-%EF%B8%8F-ec061609ac69
// EPS
const errorRenderHandle = ({errorResponse, fields, setErrors}) => {
    if (errorResponse.response) {
        console.log("in erreor handler")
        const fieldErrors = {}      //field errors need fieldnames as keys
        const globalErrors = []    //global errors dont need field names hence no keys
        const fieldNames = fields
        const errorDataJson = errorResponse.response.data  //get a json obj out of the data
        // a whole bunch of error handling, this could be in a different component
        // we can push non field errors into a different object by chcking if the keys don not match fields
        const errorKeyArr = Object.keys(errorDataJson)  //turn this into a array of keys of the error data object
        console.log(errorKeyArr)
        const getErrorMessage = (field) => {
                if (Array.isArray(field)) 
                    return field.join(', ');
                if (typeof field === "string") {
                    return field;
                } else {
                    return ''
                }
            }
        // we loop for all the keys aka the field names that we retrieved from the error json
        errorKeyArr.forEach((key)=>{
            if (fieldNames.includes(key)){
                fieldErrors[key] = getErrorMessage(errorDataJson[key])      //get a json obj of field names only as keys
            } else {
                globalErrors.push(getErrorMessage(errorDataJson[key]))      //array of global errors
            }
        })
        setErrors({      
            global:globalErrors,
            fields:fieldErrors,
            success:''
        })
        }
}

export default errorRenderHandle
