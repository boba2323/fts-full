import React, { useEffect, useState } from 'react'
import InputLabel from '../../pages/InputLabel'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import SelectInput from '../SelectInputs/SelectInput';
import Space2 from '../SpaceBetweenFields/Space2';
import axios from 'axios';
import AuthButton from '../../pages/AuthButton';

const CreateTeam = () => {
    const INITIAL_STATE = {
    }

    const [inputData, setInputData ] = useState({
            name:"",
            leader:"",
            level:'',
            leaderOptions:[],
            LEVELOPTIONS:[  {"level":"L1", "def": "Level 1 - Full Access"},
                            {"level":"L2", "def":"Level 2 - Limited Access"},
                            {"level":"L3", "def":'Level 3 - Read Only'}
                        ]
          })

    const [loadingFields, setLoadingFields] = useState(true)
    const [postSuccessful, setPostSuccessful] = useState(false)
    const [errors, setErrors] = useState({
                                        global: [],
                                        fields: {},
                                        success:''
                                        });
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
            setInputData(prev =>({
                ...prev,
                [name]: value
                
            }))
    }


    const leaderSelectHandler =(e)=>{
        const {name, value} = e.target;
        setInputData(prev =>({
            ...prev,
            leader:value
        }))
    }

    const levelSelectHandler =(e)=>{
        const {name, value} = e.target;
        setInputData(prev =>({
            ...prev,
            level:value
        }))
    }
// =======================================USER LEADER API===================================
    useEffect(()=>{
    const fetchFolderAPI =async()=>{
        setLoadingFields(true)
        try {
            const response = await axios.get("http://127.0.0.1:8000/drf/users/", {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            setInputData((prev)=>({
                ...prev,
                leaderOptions: response.data
            }))
        } catch (error) {

            console.error(error)
            setInputData((prev)=>({
                ...prev,
                leaderOptions: []
            }))
        } finally {
            setLoadingFields(false)
        }
    }
    fetchFolderAPI()
    }, [])

    
    // ===================SUBMIT FUNCTIION=====================
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if (!inputData.name) {
            setErrors({
                 global: ["All fields are required"],
                 fields: {},
                 success: ""
            });
            return;
        }
        setPostSuccessful(false)
        try {
            const response = await axios.post('http://127.0.0.1:8000/drf/teams/', 
                {
                    'name':inputData.name,
                    'leader':inputData.leader,
                    'level':inputData.level,
                },
                {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            console.log("Team created successfully!:", response.data)
            if (response.status === 200 || response.data === 201) {
            // success login 
                console.log("Team created successfully!:", response.data);
                }
            setErrors({
                 global: [],
                 fields: {},
                 success: "Team created successfully!"
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
                  
                {displayFieldErrors("name")}
                <InputLabel
                    labelName={"Name"}
                    name="name"
                    inputType="text"
                    inputValue={inputData.name}
                    placeholder="Name"
                    onChange={onChangeHandler}
                />
                <Space2/>
                {/* when we send back the data we must send url since the serialiser is a hyperlinkedmodel */}
                {displayFieldErrors("leader")}
                <SelectInput
                    name="selectedUser"  //make sure the name is unique and matches the state name
                    value={inputData.leader}
                    onChange={leaderSelectHandler}
                    labelName="Select Leader"
                    selectField="Choose a user"
                    fieldOptions={inputData.leaderOptions}
                    loading={loadingFields}
                    keyType="id"
                    fieldDefiner="username"
                    serialiserTpe="url"
                />
                <Space2/>
                {displayFieldErrors("level")}
                <SelectInput
                    name="selectedLevel"
                    value={inputData.level}
                    onChange={levelSelectHandler}
                    labelName="Select Level"
                    selectField="Choose level"
                    fieldOptions={inputData.LEVELOPTIONS}
                    loading={loadingFields}
                    keyType="level"      //will have l1, l2, l3 keys
                    fieldDefiner="def"  //
                    serialiserTpe="level"  //this is key to value. the values should be strings "L1" .... we will have field["level"] = "L1"
                />
            </div>
        </div>
        {/* this is for file upload. we connect the label to file input field and hide the real input so we click on label icon */}
        <div className="flex flex-col w-1/3 m-5">
            <AuthButton buttonText="Save Team"/>
        </div>
        
    </form>
  )}
export default CreateTeam
