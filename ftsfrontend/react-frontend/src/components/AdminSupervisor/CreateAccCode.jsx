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

import Cookies from 'js-cookie';
const CreateAC= ({mode}) => {   //mode:create or update
    // teamId is retrieved in createteam.jsx to render the required team it is found in route/index where it is
    //  passed in url and in team.jsx where the value is passed to it
    const {id} = useParams() 
    const [loadingTeamData, setLoadingTeamData] = useState(true)
    const [acData, setACData ] = useState({
            team:'',
            optional_description:'',
            teamOptions:[],
          })

    const [errors, setErrors] = useState({
                                        global: [],
                                        fields: {},
                                        success:''
                                        });
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)



    // ==================get team data for update to initialise past data==============================

    useEffect(()=>{
        // ========================GET INDIVIDUAL TEAM and the data with it aong with the workers==============================
        const createInitalUpdateData = async()=>{
            // setLoadingTeamData(true)
            console.log("in the createinit data")
            try {
                console.log("in the try block")
                const teamUpdateResponse = await axios.get(`http://127.0.0.1:8000/drf/accesscode/${id}/`, {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                })
                const teamUpdateData=teamUpdateResponse.data
                const INITIALUPDATEDATA = {
                            team:teamUpdateData.team,
                            optional_description:teamUpdateData.optional_description,
                            }
                setACData((prev) => ({
                ...prev,
                ...INITIALUPDATEDATA
                }));
                console.log("teams api hit")
                console.log(teamUpdateData)
                
            } catch (error){
                console.log("in the catch block")
                console.log(error)
            } finally {
                // setLoadingTeamData(false)  
                console.log("in the final block")       
            }}
        console.log("in use effect")
        if (mode==="update" || id){
                createInitalUpdateData()
            }
    }, [mode, id ])

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
            setACData(prev =>({
                ...prev,
                [name]: value
                
            }))
    }

    const teamSelectHandler =(e)=>{
        const {name, value} = e.target;
        setACData(prev =>({
            ...prev,
            team:value
        }))
    }


// ========================get teams list from api==============================
    useEffect(()=>{
        const teamListSelect = async()=>{
            setLoadingTeamData(true)
            console.log("in the getteamlist data")
            try {
                console.log("in the getteamlist try block")
                const response = await axios.get(`http://127.0.0.1:8000/drf/teams/`, {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                })

                const teamListSelectData=response.data
                setACData((prev) => ({
                    ...prev,
                    teamOptions:teamListSelectData
                }));
                console.log("teams api hit")
                console.log(teamListSelectData)
                
            } catch (error){
                console.log("in the catch block")
                console.log(error)
                setACData((prev) => ({
                    ...prev,
                    teamOptions:[]
                }));
            } finally {
                setLoadingTeamData(false)  
                console.log("in the final block")       
            }}
        console.log("in use effect")

        teamListSelect()}, []
    )  //evertime we try to add a worker, workers array length changes triggering a re fetching of users that will populate the workerrs display?


    // ===================SUBMIT FUNCTIION=====================
    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            let accessPostResponse
            if (mode==="create"){
                console.log("AC create post")
                accessPostResponse = await axios.post('http://127.0.0.1:8000/drf/accesscode/', 
                {
                    'team':acData.team,
                    'optional_description':acData.optional_description,
                },
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
                setErrors({
                    global: [],
                    fields: {},
                    success: "Accesscode created successfully!"
                })             
            } else if (mode==="update"){
                console.log("AC update post")
                accessPostResponse = await axios.put(`http://127.0.0.1:8000/drf/accesscode/${id}/`, 
                {
                    'team':acData.team,
                    'optional_description':acData.optional_description,
                },
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
                setErrors({
                    global: [],
                    fields: {},
                    success: "Accesscode updated successfully!"
                })
            }    
            console.log("AC created successfully!:", accessPostResponse.data)
            if (accessPostResponse.status === 200 || accessPostResponse.data === 201) {
            // success login 
                }
            setFormIsSubmitted(true)

            // reset the form
            setACData(prev => ({
            ...prev,
            team: "",
            optional_description: '',
        }));
        } catch (error) {
            console.error(error)
            console.log("ac crate error")
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
                const fieldNames =  ["optional_description", "team"]

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

    const displayFieldErrors=(fieldName)=>{   //basically render the field errors depemding on which field we set remember errors.fields is a json obj
            if (errors.fields[fieldName]) {
                return (
                <div className={`mb-3 border rounded-lg flex justify-center items-center ps-1 ${getFormMessageColor()}`}>
                    {errors.fields[fieldName]}
                </div>)
            }
    }
    const getFormMessageColor=()=>{
        if (!formIsSubmitted){
            return "text-red-500 border-red-500 bg-red-50"
        }
        if (formIsSubmitted){
            return "text-blue-500 border-blue-500 bg-blue-50"
        }
    }
    

  return (
    <div>
        <form onSubmit={handleSubmit} className='flex flex-row'>
            <div className="w-2/3">
                <div className="fileUpload p-4">
                    {errors?.global.length > 0 && (
                        <div className={`mb-3 border rounded-lg flex justify-center items-center ps-1 ${getFormMessageColor()}`}>
                        {errors.global}
                        </div>
                    )}
                    {errors?.success && (
                        <div className={`mb-3 border rounded-lg flex justify-center items-center ps-1 ${getFormMessageColor()}`}>
                        {errors.success}
                        </div>
                    )}
                    
                    {displayFieldErrors("optional_description")}
                    <InputLabel
                        labelName={"Description"}
                        name="optional_description"
                        inputType="text"
                        inputValue={acData.optional_description}
                        placeholder="Description"
                        onChange={onChangeHandler}
                    />
                    <Space2/>
                    {/* when we send back the data we must send url since the serialiser is a hyperlinkedmodel */}
                    {displayFieldErrors("team")}
                    <SelectInput
                        name="team"  //make sure the name is unique and matches the state name
                        value={acData.team}
                        onChange={teamSelectHandler}
                        labelName="Select Team"
                        selectField="Choose a team"
                        fieldOptions={acData.teamOptions}
                        loading={loadingTeamData}
                        keyType="id"
                        fieldDefiner="name"
                        serialiserTpe="url"
                    />
                    <Space2/>
                </div>
            </div>
            <div className="flex flex-col w-1/3 m-5">
                <AuthButton buttonText="Save Acess Code"/>
            </div>
            <div>
            </div>
        </form>
    </div>
    
  )}
export default CreateAC
