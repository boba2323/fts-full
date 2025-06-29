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
const CreateTeam = ({mode}) => {   //mode:create or update
    // teamId is retrieved in createteam.jsx to render the required team it is found in route/index where it is
    //  passed in url and in team.jsx where the value is passed to it
    const {teamId} = useParams() 
    const [finishloadingTeamUpdateData, setFinishLoadingTeamUpdateData] = useState(false)
    const [inputData, setInputData ] = useState({
            name:"",
            leader:"",
            level:'',
            workers:[],
            leaderOptions:[],
            LEVELOPTIONS:[  {"level":"L1", "def": "Level 1 - Full Access"},
                            {"level":"L2", "def":"Level 2 - Limited Access"},
                            {"level":"L3", "def":'Level 3 - Read Only'}
                        ]
          })

    const [loadingFields, setLoadingFields] = useState(true)
    const [errors, setErrors] = useState({
                                        global: [],
                                        fields: {},
                                        success:''
                                        });
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)
    const [addWorker, setAddWorker] = useState(false)
    const [inputWorker, setInputWorker] = useState()


    useEffect(() => {
            console.log(" useeffect Updated workers list:", inputData.workers);
            }, [inputData.workers]);



    // ==================get team data==============================

    useEffect(()=>{
        // ========================GET INDIVIDUAL TEAM and the data with it aong with the workers==============================
        const createInitalUpdateData = async()=>{
            setFinishLoadingTeamUpdateData(false)
            console.log("in the createinit data")
            try {
                console.log("in the try block")
                const response = await axios.get(`http://127.0.0.1:8000/drf/teams/${teamId}/`, {
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    withCredentials: true,
                })
                const iniData=response.data
                const INITIALUPDATEDATA = {
                            name:iniData['name'],
                            leader:iniData['leader'],
                            level:iniData['level'],
                            workers:iniData['workers']
                            }
                setInputData((prev) => ({
                ...prev,
                ...INITIALUPDATEDATA
                }));
                console.log("teams api hit")
                console.log(iniData['workers'])
                console.log(inputData)
                
            } catch (error){
                console.log("in the catch block")
                console.log(error)
            } finally {
                setFinishLoadingTeamUpdateData(true)  
                console.log("in the final block")       
            }}
        console.log("in use effect")
        if (mode==="update" || teamId){
                createInitalUpdateData()
            }
    }, [mode, teamId ])

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


    // ===================================onchange memberships=============================
    const workerChangeHandler=(e)=>{
        const {name, value} = e.target
        setInputWorker(value)
    }

    const levelSelectHandler =(e)=>{
        const {name, value} = e.target;
        setInputData(prev =>({
            ...prev,
            level:value
        }))
    }
// =======================================USER  API===================================
    useEffect(()=>{
    const fetchUserNonTeamApi =async()=>{
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
    fetchUserNonTeamApi()
    }, [inputData.workers])  //evertime we try to add a worker, workers array length changes triggering a re fetching of users that will populate the workerrs display?

    // =====================handle worker===========================
    const handleAddWorker=()=>{
        setAddWorker(true)
    }
// ==========================delete worker=============================
    const removeWoker = async( url, workerId)=>{
        try {
            const response = await axios.delete(url, 
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
            });
            setInputData((prev)=>{
                const updatedWorkers = prev.workers.filter(worker=> worker.id !== workerId)  // it does not select the workers that we have removed 
                console.log("old wokers vs ")
                console.log(prev.workers)
                console.log("updated not state workers after delete")
                console.log(updatedWorkers)
                return ({
                    ...prev,
                workers:updatedWorkers
            })
            })
            console.log("state after setting")
            console.log(inputData.workers)
            
        } catch (error) {
            console.error(error)
        } finally {
        }
    }
    
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
        try {
            let response
            let responseMembership
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
            }
            if (addWorker){
                console.log(response.data.url, inputWorker)
                responseMembership = await axios.post('http://127.0.0.1:8000/drf/teammembership/', 
                {
                    'user':inputWorker,
                    'team':response.data.url,
                    'role':'worker',
                },
                {
                headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
                },
                withCredentials: true, // Optional: only needed if cookies are set
                });
                
                console.log( "response data",responseMembership.data)
                const team_url = responseMembership.data.team
                console.log("membership team url", team_url)
                console.log("team url" ,team_url)
                const teamData = await axios.get(team_url, {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken')
                    },
                    withCredentials: true
                });
                console.log("teamData",  teamData)
                const team = teamData.data
                console.log('team', team)
                console.log('team data workers', team.workers)
                setInputData(prev=>(
                    {...prev,
                        workers:team.workers
                    }
                ))

            }
            
            console.log("Team created successfully!:", response.data)
            if (response.status === 200 || response.data === 201) {
            // success login 
                }
            setErrors({
                 global: [],
                 fields: {},
                 success: "Team updated successfully!"
            })
            setFormIsSubmitted(true)

            // reset the form
            setInputData(prev => ({
            ...prev,
            name: "",
            leader: '',
            level: '',
        }));
        } catch (error) {
            console.error(error)
            console.log("team crate error")
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
                <div className="workers p-4 flex flex-col">
                    <h1 className='text-gray-700 my-1 sm:text-base font-bold mb-2'>WORKERS</h1>
                    {inputData?.workers?.length > 0
                    ?inputData.workers.map((worker)=>(
                        <div key={worker.url} className='userrow mt-2 flex flex-row border border-green-100 rounded-lg w-full justify-between align-middle items-center'>
                            <div className='px-2 flex flex-row align-middle items-center text-gray-700 sm:text-sm font-semibold py-1'>{worker.user}</div>
                            <button type='button' onClick={()=>{removeWoker(worker.team_membership, worker.id)}}
                                className='px-2 flex flex-row align-middle items-center bg-red-50 rounded-lg py-1 text-gray-700 sm:text-sm font-semibold'
                                >Remove Worker</button>
                        </div>
                    ))
                    :<div>no workers</div>}
                </div>
            </div>
            {/* this is for file upload. we connect the label to file input field and hide the real input so we click on label icon */}
            <div className="flex flex-col w-1/3 m-5">
            {/* https://stackoverflow.com/questions/37462047/how-to-create-several-submit-buttons-in-a-react-js-form/41288712 */}
                <AuthButton buttonText="Add worker" type='button' onClick={handleAddWorker}/>
                {/* {inputData?.workers?.length > 0? <button type="button" className='mt-2 py-1 flex border-2 border-red-300 text-center align-middle justify-center rounded-md' 
                onClick={removeWoker}>Remove Worker</button>
                                   :<></> } */}
                {addWorker? <button type="button" className='mt-2 py-1 flex border-2 bg-red-300 border-red-300 text-center align-middle justify-center rounded-md' 
                onClick={()=>setAddWorker(false)}>Cancel</button>
                          : <></>}
                <AuthButton buttonText="Save Team"/>
                {addWorker?<>
                            <Space2/>
                            {displayFieldErrors("user")}
                            <SelectInput 
                            name="selectedWorkers"
                            value={inputWorker}  // the value is an url not an object 
                            onChange={workerChangeHandler}
                            labelName="Add a Worker"
                            selectField="Choose a user as worker"
                            fieldOptions={inputData.leaderOptions}
                            loading={loadingFields}
                            keyType="id"
                            fieldDefiner="username"
                            serialiserTpe="url"
                            />
                            </>
                        
                          :<></>}
            </div>
            <div>
            </div>
        </form>
    </div>
    
  )}
export default CreateTeam
