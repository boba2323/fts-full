import React from 'react'

const RemoveYourself = () => {
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
  return (
    <div>
      
    </div>
  )
}

export default RemoveYourself
