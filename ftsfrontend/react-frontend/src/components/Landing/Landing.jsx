
import { FaUsers, FaKey, FaClipboardList, FaPlus  } from 'react-icons/fa';
import { FaForward } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../authentication/authProvider';
import { useState } from 'react';
import errorRenderHandle from '../UtilsErrorRendering/ErrorRenderHandle'
import axios from 'axios';
import Cookies from 'js-cookie';
import HeaderLanding from '../Header/HeaderLanding'
import Footer from '../Footer/Footer';
import { FaMagnifyingGlass } from "react-icons/fa6";


const Landing = () => {
    const API_BASE_URL = import.meta.env.VITE_API_URL;
    const { userIn, setUserIn, hitMeandFetch } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({
                                        global: [],
                                        fields: {},
                                        success:''
                                        });
    const [inputData, setInputData ] = useState({
            email:"a4@gmail.com",
            password:"a4"
        })

    const onSupervisorEntry = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
        const response = await axios.post(`${API_BASE_URL}/accounts/api/token/`, inputData, {
            headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
            },
            withCredentials: true, 
        });
        if (response.status === 200) {
            console.log("Successfully logged in:", response.data);
            await hitMeandFetch();
            setErrors({
                        global: [],
                        fields: {},
                        success:'You are in as a supervisor'
                        })
            navigate("/fts", { replace: true });
        }
        console.log('catching response data', response.data);
        // https://axios-http.com/docs/handling_errors
        } catch (error) {
            if (error.response) {
                errorRenderHandle({
                    errorResponse: error,
                    fields: ["email", "password"],
                    setErrors: setErrors
                    })
                console.error('Error response:', error.response.data);
            } else {
                console.error("Axios config/setup error:", error.message);
                alert('Error: Could not connect to server.')
            }
        } finally {
        setLoading(false);
        }
    }
    const displayFieldErrors=(fieldName)=>{   //basically render the field errors depemding on which field we set remember errors.fields is a json obj
        if (errors.fields[fieldName]) {
            return (
            <div className={`mb-3 border rounded-lg flex justify-center items-center ps-1`}>
                {errors.fields[fieldName]}
            </div>)
        }
    }
    
  return (
    <div >
      <HeaderLanding/>
      <div className=''>
        <div className="min-h-96 bg-gradient-to-r from-purple-700 to-purple-300 ">
          <header className='px-12 pt-16'>
            <h2 className='text-4xl font-extrabold mb-2 text-gray-100'>Welcome to Crumpet</h2>
            <p className='mt-5 text-xl font-medium text-gray-300 w-2/5'>The enterprise file management and privacy compliant system</p>
          </header>
          <div className='flex flex-col px-12'>
            <header className='flex flex-row justify-between items-center my-10'>
              <h3 className='text-3xl font-thin text-purple-50 p-1'>Your workflow is 
                <span className='text-2xl text-orange-300 font-bold'> simple</span> and 
                <span className='text-2xl text-orange-300 font-bold'> intuitive</span></h3>
              <img src="/genericfts.jpg" alt="placeholder fts image" className='w-[550px] h-auto border-8
              border-purple-100 rounded-xl  shadow-md' />
            </header>
          </div>
        </div>
        <div className='flex flex-col px-12 pb-20'>
          <header className='flex flex-row items-center justify-center pt-20 pb-5 gap-5'>
            <p className='text-2xl text-gray-600 font-bold '>One User</p>
            <p className='text-2xl text-gray-600 font-bold '>One Team</p>
            <p className='text-2xl text-gray-600 font-bold '>One Access Key</p>
          </header>
          <section className='flex flex-row justify-around text-lg font-medium text-gray-800 my-16'>
            <div className="w-72 h-56 border border-gray-100 shadow-lg shadow-purple-50 rounded-xl
              flex flex-col  p-4">
              <div className="py-1">< FaUsers size='30' className='text-purple-600'/></div>
              <p className='pt-1'>Create a team</p>
              <p className='pt-1 text-sm font-thin text-gray-600'>Be a team leader and add other users to your team
                so they can be a part of your work
              </p>
            </div>
            <div className="w-72 h-56 border border-gray-100 shadow-lg shadow-purple-50 rounded-lg
            flex flex-col p-4">
              <div className="py-1"><FaKey size='30' className='text-purple-600'/></div>
              <p className='pt-1'>Make an access key</p>
              <p className='pt-1 text-sm font-thin text-gray-600'>This provides ability to upload files and work on them
                while also siloing your data from other teams
              </p>
            </div>
            <div className="w-72 h-56 border border-gray-100 shadow-lg shadow-purple-50 rounded-lg
            flex flex-col p-4">
              <div className="py-1"><FaClipboardList size='30' className='text-purple-600'/></div>
              <p className='pt-1'>Start working</p>
              <p className='pt-1 text-sm font-thin text-gray-600'>Now you are all set and ready to work!
              </p>
            </div>
          </section>
          <section className='mt-8 px-8'>
            <div className="entry flex flex-row items-center justify-center gap-6">
              <Link to='/fts/workspace'>
                <button className='group  p-5 flex flex-row items-center  bg-orange-300 rounded-lg text-gray-800 hover:bg-orange-500
                    transition-all duration-500'
                    onClick={onSupervisorEntry}>
                    Enter As Supervisor  
                    <span className='ps-3 transform transition-transform duration-300 group-hover:translate-x-2'><FaForward /></span>
                </button>
              </Link>
              <Link to='/fts/workspace'>
                <button className='group w-48 p-5 flex flex-row items-center  bg-white rounded-lg border
                    border-orange-300 text-gray-800 hover:bg-orange-500
                    transition-all duration-500'>
                    Join As Regular 
                    <span className='ps-3 transform transition-transform duration-300 group-hover:translate-x-2'><FaForward /></span>
                </button>
              </Link>
            </div>
          </section>
        </div>
        
        <div className="features bg-white py-20 px-20">
          <header className=' py-2 flex flex-row 
            text-3xl text-gray-700 font-extrabold '>
            <span className='border-b-4 border-orange-300 py-3'>Main features</span>
          </header>
          <section className=' bg-white py-4 px-6 text-gray-800'>
            <aside className='py-4 my-5 flex flex-row'>
              <div className="left w-1/2">
                <h1 className='text-2xl  font-bold py-6'>Team Creation</h1>
                <ul className='space-y-1 text-base text-gray-700 font-thin list-none'>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Users can create teams and add others and provide access to the files they upload</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>You can create only one team at a time for now to keep the flow simple</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Removing a user from a team takes away their ability to view your files</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Team leaders exercise full control over their teams</p>
                  </li>
                </ul>
              </div>
              <div className="right w-1/2 ps-10">
                <img src="/crumpetlanding2.jpg" alt="placeholder fts image" className='w-[450px] h-auto border-8
                border-orange-100 rounded-xl  shadow-md' />
              </div>
              
            </aside >
            <aside className='py-4 my-5 flex flex-row items-center justify-between'>
              <div className="left w-1/2">
                <img src="/genericfts.jpg" alt="placeholder fts image" className='w-[450px] h-auto border-8
                border-purple-100 rounded-xl  shadow-md' />
              </div>
              <div className="right w-1/2">
                <h1 className='text-2xl  font-bold pb-6'>Modifcation of files and Logging trails</h1>
                <ul className='space-y-1 text-base text-gray-700 font-thin'>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>Actions of a team are recorded in the database</p>
                  </li>
                  <li className='flex flex-row items-start gap-2 '>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>The logs are available for all members of the team to see</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <span><FaPaperclip className='text-purple-500 mt-1' size='16'/></span>
                    <p>More comprehensive logging planned. Detailed logs will point to every actions of the team members in a easy to read and intuitive way</p>
                  </li>
                </ul>
              </div>
            </aside >
            <aside className='py-4 my-5 flex flex-row'>
              <div className="left w-1/2">
                <h1 className='text-2xl  font-bold py-6'>Time Based Access Keys</h1>
                <ul className='space-y-1 text-base text-gray-700 font-thin'>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p> Access keys permit teams to upload (and work) on files. Without them, it is not possible</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p>They provide enhanced control over how a team uses its ability to upload (and work) on files</p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p>Access keys can be made to expire after a time by kicking off tasks in a celery beat scheduler </p>
                  </li>
                  <li className='flex flex-row items-start gap-2'>
                    <FaPaperclip className='text-purple-500 mt-1'/>
                    <p>It also provides more ways to perform logging actions</p>
                  </li>
                </ul>
              </div>
              <div className="right w-1/2"></div>
              
            </aside >
          </section>
        </div>

        <section className="future-scope bg-gradient-to-r from-purple-500 to-purple-300 py-20 px-20  shadow-inner mt-16">
          <header className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-50">
              Future Planned <span className="text-orange-600">Scope</span>
            </h2>
            <p className="mt-4 text-gray-100 font-light">
              What’s next for Crumpet — continuously evolving to match enterprise needs
            </p>
          </header>
          <div className="flex flex-row justify-around gap-8 flex-wrap">
            <div className="card bg-white shadow-purple-50 rounded-xl p-6 py-8 hover:shadow-xl transition w-80 h-60 border border-gray-100">
              <div className="flex flex-col items- justify-start mb-2">
                <FaMagnifyingGlass  className="text-purple-500" size={26}/>
                <h3 className="pt-5 text-xl font-semibold text-gray-800">Semantic Search</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Semantic and context-aware file search, making it easier to search through large swathes of documents.Easier to locate
                even if you dont know what you are looking for.
              </p>
            </div>

            <div className="card bg-white shadow-purple-50 rounded-xl p-6 hover:shadow-xl transition w-80 h-60 border border-gray-100">
              <div className="flex flex-col items- justify-start mb-2">
                <FaPaperclip className="text-purple-500" size={26}/>
                <h3 className="pt-5 text-xl font-semibold text-gray-800">In App editing</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Work on files with your team simultaneously with live editing, comments etc. with the help of third party applications.
              </p>
            </div>

            <div className="card bg-white shadow-purple-50 rounded-xl p-6 hover:shadow-xl transition w-80 h-60 border border-gray-100">
              <div className="flex flex-col items- justify-start mb-2">
                <FaClipboardList className="text-purple-500" size={26}/>
                <h3 className="pt-5 text-xl font-semibold text-gray-800">Advanced Security & Logging</h3>
              </div>
              <p className="text-gray-600 text-sm">
                More complex permissions systems, more details of logging and records of historical data.
              </p>
            </div>
          </div>
        </section>

      </div>
      <Footer/>
    </div>
  )
}

export default Landing
