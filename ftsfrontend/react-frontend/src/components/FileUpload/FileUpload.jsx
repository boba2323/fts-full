import React, { useEffect, useState } from 'react'
import InputLabel from '../../pages/InputLabel'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import SelectInput from '../SelectInputs/SelectInput';
import Space2 from '../SpaceBetweenFields/Space2';
import axios from 'axios';
import AuthButton from '../../pages/AuthButton';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../authentication/authProvider';
// https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
const FileUpload = () => {
    const {userIn} = useAuth()
    if (userIn.is_temp || userIn.is_not_god_only_L2_L3_worker){
        return <Navigate to="/fts" />
    }
    const {teamId} = useParams()
    const INITIAL_STATE = {
        file_data:null,
        name:"",
        // tags:"",
        folderOptions:[],
        accessCodeOptions:[],
        selectedFolder:'',
        selectedCode:'',
    }

    const [inputData, setInputData ] = useState({
            file_data:null,
            name:"",
            // tags:"",
            folderOptions:[],
            accessCodeOptions:[],
            selectedFolder:'',
            selectedCode:'',
          })
    const [loadingFields, setLoadingFields] = useState(true)
    const [postLoading, setPostLoading] = useState(true)
    const [errors, setErrors] = useState({
                                        global: [],
                                        fields: {},
                                        success:''
                                        });
    const [formIsSubmitted, setFormIsSubmitted] = useState(false)

    // to target files we do this, but we set it to the same state we use
    const onFileUpload = (e) => {
        const file = e.target.files[0]
        setInputData(prev =>({
                ...prev,
                file_data: file
            }))
	    };

    const onChangeHandler = (e) => {
        const {name, value} = e.target;
            setInputData(prev =>({
                ...prev,
                [name]: value
                
            }))
    }

    const deleteFile =(e) =>{
        setInputData(prev =>({
                ...prev,
                file_data: null
            }))
    }

    const folderSelectHandler =(e)=>{
        const {name, value} = e.target;
        setInputData(prev =>({
            ...prev,
            selectedFolder:value
        }))
    }

    const accessCodeSelectHandler =(e)=>{
        const {name, value} = e.target;
        setInputData(prev =>({
            ...prev,
            selectedCode:value
        }))
    }
// =======================================FOLDER API===================================
    useEffect(()=>{
    const fetchFolderAPI =async()=>{
        setLoadingFields(true)
        try {
            const response = await axios.get("http://127.0.0.1:8000/drf/folders/", {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            setInputData((prev)=>({
                ...prev,
                folderOptions: response.data
            }))
        } catch (error) {

            console.error(error)
            setInputData((prev)=>({
                ...prev,
                folderOptions: []
            }))
        } finally {
            setLoadingFields(false)
        }
    }
    fetchFolderAPI()
    }, [])

    // ===============================ACCESSCODEAPI==============================
    useEffect(()=>{
    const fetchAccessCodeAPI =async()=>{
        setLoadingFields(true)
        if (userIn.is_not_god_only_L2_L3 || userIn.is_temp){
            try {
            const response = await axios.get(`http://127.0.0.1:8000/drf/accesscode/?teamId=${teamId}`, {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            setInputData((prev)=>({
                ...prev,
                accessCodeOptions: response.data
            }))

            if (response.status===200){
                console.log("accesscode api hit")
            }
        } catch (error) {

            console.error(error)
            setInputData((prev)=>({
                ...prev,
                accessCodeOptions: []
            }))
        } finally {
            setLoadingFields(false)
        }
        } else {
                        try {
            const response = await axios.get("http://127.0.0.1:8000/drf/accesscode/", {
                headers: {
                'Content-Type': 'application/json'
                },
                withCredentials: true,
            })
            setInputData((prev)=>({
                ...prev,
                accessCodeOptions: response.data
            }))

            if (response.status===200){
                console.log("accesscode api hit")
            }
        } catch (error) {

            console.error(error)
            setInputData((prev)=>({
                ...prev,
                accessCodeOptions: []
            }))
        } finally {
            setLoadingFields(false)
        }
        }
        
    }
    fetchAccessCodeAPI()
    }, [])


    // ===================SUBMIT FUNCTIION=====================
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if (!inputData.name) {
            setErrors({global:'Provide a name for the file!',
                        fields:'',
                        success:''})
            return;
        }
        setPostLoading(true)
        try {
                if (userIn.is_not_god_only_L2_L3) {
                    console.log(userIn?.user_team_access_code_url?.[0])
                    const userCode = userIn?.user_team_access_code_url?.[0]
                    if (!userCode){
                        setErrors( {global:'User does not have an access code',
                                    fields:'',
                                    success:''})
                                        return;
                                    }
                    const response = await axios.post('http://127.0.0.1:8000/drf/files/', 
                    {
                        "file_data": inputData.file_data,
                        "name": inputData.name,
                        "folder": inputData.selectedFolder,
                        "access_code": userCode
                    },
                    {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken')
                    },
                    withCredentials: true, // Optional: only needed if cookies are set
                });
                console.log("Successfully uploaded file", response.data)
                if (response.status === 200 || response.status === 201) {
                // success login 
    
                    }
                setErrors({global:'',
                            fields:'',
                            success:'Uploaded file successfully'})

                setFormIsSubmitted(true)

                // reset the form
                setInputData(prev => ({
                ...prev,
                file_data: null,
                name: '',
                selectedFolder: '',
                selectedCode: ''
            }));
            } else {
                    const response = await axios.post('http://127.0.0.1:8000/drf/files/', 
                    {
                        "file_data": inputData.file_data,
                        "name": inputData.name,
                        "folder": inputData.selectedFolder,
                        "access_code": inputData.selectedCode
                    },
                    {
                    headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFToken': Cookies.get('csrftoken')
                    },
                    withCredentials: true, // Optional: only needed if cookies are set
                });
                console.log("Successfully uploaded file", response.data)
                if (response.status === 200 || response.status === 201) {
                // success login 
    
                    }
                setErrors(prev=>({
                    ...prev,
                    success:"Successfully uploaded file"
                }))
    
                setFormIsSubmitted(true)

                // reset the form
                setInputData(prev => ({
                ...prev,
                file_data: null,
                name: '',
                selectedFolder: '',
                selectedCode: ''
            }));
            }
        } catch (error) {
            setFormIsSubmitted(false)
            console.log("fileupload error")
            console.error(error)
            // we get this from login boiler code
            if (error.response) {
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
                const errorDataJson = error.response.data
                // we can push non field errors into a different object by chcking if the keys don not match fields
                const errorKeyArr = Object.keys(errorDataJson)
                console.log(errorKeyArr)

                const errorJson = {}
                const globalErrors = []    //global errors dont need field names hence no keys
                const fieldNames = ["name", "folder", "access_code"]  

                errorKeyArr.forEach((key)=>{
                    if (fieldNames.includes(key)){
                        errorJson[key] = getErrorMessage(errorDataJson[key])      //get a json obj of field names only as keys
                    } else {
                        globalErrors.push(getErrorMessage(errorDataJson[key]))      //array of global errors
                    }
                })
                setErrors({      
                    global:globalErrors,
                    fields:errorJson,
                    success:''
                })
                console.log("error data object",errorData)
                console.log( "error json",errorJson)
                }

        } finally {
        setPostLoading(false)
        console.error(errors)
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

    const displayFieldErrors=(fieldName)=>{   //basically render the field errors depemding on which field we set remember errors.fields is a json obj
            if (errors.fields[fieldName]) {
                return (
                <div className={`mt-3 border rounded flex justify-center items-center ps-1 ${getFormMessageColor()}`}>
                    {errors.fields[fieldName]}
                </div>)
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
                {displayFieldErrors('name')}
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
                {displayFieldErrors('folder')}
                <SelectInput
                    name="selectedFolder"  //make sure the name is unique and matches the state name
                    value={inputData.selectedFolder}
                    onChange={folderSelectHandler}
                    labelName="Select parent folder"
                    selectField="Choose folder"
                    fieldOptions={inputData.folderOptions}
                    loading={loadingFields}
                    keyType="id"
                    fieldDefiner="name"
                    serialiserTpe="url"
                />
                <Space2/>
                {displayFieldErrors('access_code')}
                {userIn.is_not_god_only_L2_L3_leader
                ?<></>
                :<SelectInput
                    name="selectedCode"
                    value={inputData.selectedCode}
                    onChange={accessCodeSelectHandler}
                    labelName="Select AccessCode"
                    selectField="Choose access code"
                    fieldOptions={inputData.accessCodeOptions}
                    loading={loadingFields}
                    keyType="code"
                    fieldDefiner="code"
                    serialiserTpe="url"
                />}
                
                <Space2/>
            </div>
        </div>
        {/* this is for file upload. we connect the label to file input field and hide the real input so we click on label icon */}
        <div className="flex flex-col w-1/3 m-5">
            <div className=" h-56 flex flex-col border-dotted border-2 border-gray-600 rounded-xl  justify-center items-center"> 
                
                <div className='flex flex-col justify-center items-center'>
                    <input
                        name="file_data"
                        // value={inputData.file_data}/we dont need value in 
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={onFileUpload} // Optional: add your handler
                        required
                    />
                    <label htmlFor="file-upload" className=" cursor-pointer flex flex-col justify-center items-center">
                        <FaArrowUpFromBracket size={24}/>
                        <p className='text-emerald-600 text-sm mt-3 font-semibold hover:text-purple-400'>
                            Upload File</p>
                    </label>
                    {/* https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/ */}
                    {inputData.file_data
                    ?<div className="flex flex-row">
                        <p className='text-gray-800 text-xs mt-1 font-semibold'>
                            {inputData.file_data.name}
                        </p><button onClick={deleteFile} className='px-2'><FaTrash className="text-red-500"/></button>
                    </div>
                    :<p className='text-gray-600 text-xs mt-1 font-normal'>No file selected</p>
                    }
                    
                </div>
            </div>
            <div className='flex w-full flex-row justify-center items-center '>
                <button className='border border-gray-400 rounded-lg mt-4 py-3 w-32 text-gray-800 text-sm
                hover:text-purple-400 hover:border-purple-400'>
                    Upload File</button>
            </div>
            
            {/* <AuthButton buttonText="Upload File"/> */}
        </div>
        
    </form>
  )
}

export default FileUpload
