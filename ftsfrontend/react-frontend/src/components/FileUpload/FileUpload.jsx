import React, { useEffect, useState } from 'react'
import InputLabel from '../../pages/InputLabel'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import SelectInput from '../SelectInputs/SelectInput';
import Space2 from '../SpaceBetweenFields/Space2';
import axios from 'axios';
import AuthButton from '../../pages/AuthButton';
import Cookies from 'js-cookie';
// https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
const FileUpload = () => {

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
    const [errorMessage, setErrorMessage] = useState()
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
    fetchAccessCodeAPI()
    }, [])


    // ===================SUBMIT FUNCTIION=====================
    const handleSubmit= async (e)=>{
        e.preventDefault()
        if (!inputData.name) {
            setErrorMessage("All fields are required.");
            return;
        }
        setPostLoading(true)
        try {
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
            console.log("Successfully sent form:", response.data)
            if (response.status === 200 || response.data === 201) {
            // success login 
                console.log("Successfully sent form:", response.data);
                }
            setErrorMessage("File Successully uploaded")
            console.log("Successfully sent form:", response.data);
            setFormIsSubmitted(true)

            // reset the form
            setInputData(prev => ({
            ...prev,
            file_data: null,
            name: '',
            selectedFolder: '',
            selectedCode: ''
        }));
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
                const errorJson = {}
                // we can push non field errors into a different object by chcking if the keys don not match fields
                const errorKeyArr = Object.keys(errorDataJson)
                errorKeyArr.forEach((key)=>{
                    errorJson[key] = (getErrorMessage(errorDataJson[key]))
                })
                setErrorMessage(errorJson)
                console.log("error data object",errorData)
                console.log( "error json",errorJson)
                }

        } finally {
        setPostLoading(false)
        console.error(errorMessage)
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
                {errorMessage && (
                    <div className={`mb-3 border rounded-lg flex justify-center items-center ${getFormMessageColor()}`}>
                      {errorMessage}
                    </div>
                  )}
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
                <SelectInput
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
                />
                <Space2/>
                {/* <InputLabel
                    labelName={"Tags"}
                    name="tags"
                    inputType="text"
                    value={inputData.tags}
                    placeholder="Tags"
                    onChange={onChangeHandler}
                /> */}
            </div>
        </div>
        {/* this is for file upload. we connect the label to file input field and hide the real input so we click on label icon */}
        <div className="flex flex-col w-1/3 m-5">
            <div className=" h-56 flex flex-col border-dotted border-2 border-green-400 rounded-xl  justify-center items-center"> 
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
                        <p className='text-emerald-600 text-sm mt-3 font-semibold'>Upload File</p>
                    </label>
                    {/* https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/ */}
                    {inputData.file_data
                    ?<div className="flex flex-row">
                        <p className='text-green-900 text-xs mt-1 font-semibold'>
                            {inputData.file_data.name}
                        </p><button onClick={deleteFile} className='px-2'><FaTrash className="text-red-500"/></button>
                    </div>
                    :<p className='text-green-400 text-xs mt-1 font-normal'>No file selected</p>
                    }
                    
                </div>
            </div>
            <AuthButton buttonText="Upload File"/>
        </div>
        
    </form>
  )
}

export default FileUpload
