import React, { useEffect, useState } from 'react'
import InputLabel from '../../pages/InputLabel'
import { FaArrowUpFromBracket } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";
import SelectInput from '../SelectInputs/SelectInput';
import Space2 from '../SpaceBetweenFields/Space2';
import axios from 'axios';

// https://www.geeksforgeeks.org/reactjs/file-uploading-in-react-js/
const FileUpload = () => {
    const [inputData, setInputData ] = useState({
            file_data:null,
            name:"",
            owner:"",
            permissions:"",
            folder:"",
            access_code:"",
            tags:"",
            folderOptions:[],
            accessCodeOptions:[]
          })
    const [loadingFields, setLoadingFields] = useState(true)

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

    const deleteFile =() =>{
        setInputData(prev =>({
                ...prev,
                file_data: null
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
                folderOptions: []
            }))
        } finally {
            setLoadingFields(false)
        }
    }
    fetchAccessCodeAPI()
    }, [])

  return (
    <div className='flex flex-row'>
        <div className="w-2/3">
            <div className="fileUpload p-4">
                <InputLabel
                    labelName={"Name"}
                    name="name"
                    inputType="text"
                    value={inputData.name}
                    placeholder="Name"
                    onChange={onChangeHandler}
                />
                <Space2/>
                <InputLabel
                    labelName={"Owner"}
                    name="owner"
                    inputType="text"
                    value={inputData.owner}
                    placeholder="Owner"
                    onChange={onChangeHandler}
                />
                <Space2/>
                <InputLabel
                    labelName={"Permissions"}
                    name="permissions"
                    inputType="text"
                    value={inputData.permissions}
                    placeholder="Permissions"
                    onChange={onChangeHandler}
                />
                <Space2/>
                <InputLabel
                    labelName={"Folder"}
                    name="folder"
                    inputType="text"
                    value={inputData.folder}
                    placeholder="Folder"
                    onChange={onChangeHandler}
                />
                <Space2/>
                <SelectInput
                    labelName="Select parent folder"
                    selectField="Choose folder"
                    fieldOptions={inputData.folderOptions}
                    loading={loadingFields}
                    keyType="id"
                    fieldDefiner="name"
                />
                <Space2/>
                <SelectInput
                    labelName="Select AccessCode"
                    selectField="Choose access code"
                    fieldOptions={inputData.accessCodeOptions}
                    loading={loadingFields}
                    keyType="code"
                    fieldDefiner="code"
                />
                <Space2/>
                <InputLabel
                    labelName={"Tags"}
                    name="tags"
                    inputType="text"
                    value={inputData.tags}
                    placeholder="Tags"
                    onChange={onChangeHandler}
                />
            </div>
        </div>
        {/* this is for file upload. we connect the label to file input field and hide the real input so we click on label icon */}
        <div className="w-1/3 h-56 flex flex-col border-dotted border-2 border-green-400 rounded-xl m-5 justify-center items-center"> 
            <div className='flex flex-col justify-center items-center'>
                <input
                    name="file_data"
                    // value={inputData.file_data}/we dont need value in 
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={onFileUpload} // Optional: add your handler
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
    </div>
  )
}

export default FileUpload
