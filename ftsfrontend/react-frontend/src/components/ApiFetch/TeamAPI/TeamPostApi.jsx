import React, { useEffect, useState } from 'react'
import InputLabel from '../../pages/InputLabel'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import SelectInput from '../SelectInputs/SelectInput';
import Space2 from '../SpaceBetweenFields/Space2';
import axios from 'axios';
import AuthButton from '../../pages/AuthButton';
import Team from '../Team/Team';
import { useParams } from 'react-router-dom';


const TeamPostApi = async()=>{
    try {
        let response
        if (mode==="create"){
            response = await axios.post('http://127.0.0.1:8000/drf/teams/', 
            {
                'name':inputData.name,
                'leader':inputData.leader,
                'level':inputData.level,
            },
            {
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true, // Optional: only needed if cookies are set
        });
        } else if (mode==="update"){
            response = await axios.put(`http://127.0.0.1:8000/drf/teams/${teamId}/`, 
            {
                'name':teamData.name,
                'leader':teamData.leader,
                'level':teamData.level,
            },
            {
            headers: {
            'Content-Type': 'application/json'
            },
            withCredentials: true, // Optional: only needed if cookies are set
        });
        }
        
        console.log("Team created successfully!:", response.data)
        if (response.status === 200 || response.data === 201) {
        // success login 
            console.log("Team created successfully!:", response.data);
            }
        setErrors({
                global: [],
                fields: {},
                success: "Team updated successfully!"
        })
        console.log("Team Successully created:", response.data);
        setFormIsSubmitted(true)

        // reset the form
        setInputData(prev => ({
        ...prev,
        name: "",
        leader: '',
        level: '',
    }));
    } catch (error) {
        setFormIsSubmitted(false)
        // we get this from login boiler code
        if (error.response) {
            // a whole bunch of error handling, this could be in a different component
            const errorData = error.response.data
            const getErrorMessage = (field) => {
                    if (Array.isArray(field)) 
                        return field.join(', ');
                    if (typeof field === "string") {
                        return field;
                    } else {
                        return ''
                    }
                }
            const errorDataJson = error.response.data  //get a json obj out of the data
            const fieldErrors = {}      //field errors need fieldnames as keys
            const globalErrors = []    //global errors dont need field names hence no keys
            const fieldNames = ["name", "leader", "level"]

            // we can push non field errors into a different object by chcking if the keys don not match fields
            const errorKeyArr = Object.keys(errorDataJson)  //turn this into a array of keys of the error data object

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
            
            console.log("error data object",errorData)
            console.log( "error json",errorDataJson)
            }
    } finally {
    console.log(errors)
    }
}

export default TeamPostApi

        