import React, { useState } from 'react'
import API from '../components/api.js'
import { toast } from 'react-toastify'
import './Issues.css'
function Issue() {
    const [issueTitle,setIssueTitle] = useState("")
    const [issueDiscription,setIssueDiscription]=useState("")

    const issuehandle = (e)=>{
        setIssueTitle(e.target.value)
    }
    const discriptionhandle = (e)=>{
        setIssueDiscription(e.target.value)
    }
    const save = async(e) =>{
        e.preventDefault()
        try{
            const {data} = await API.post("/PostIssues",{issueTitle,issueDiscription})
            console.log(data)
            toast.success("Issue posted successfully")
        }catch{
            toast.error("error in posting")
        }
    }
  return (
    <div className="issue-wrapper">
    <div className="issue-container">
        <h2 className="issue-title">Report an Issue</h2>
      
      <form onSubmit={save}>
      <div className="form-group">
        <label>IssueTitle</label>
        <input
        type='text'
        placeholder='Title of the issue'
        value={issueTitle}
        onChange={issuehandle}
        ></input>
      </div>
      <div className="form-group">
        <label>issueDiscription</label>
        <input
        type='text'
        placeholder='Describe the issue'
        value={issueDiscription}
        onChange={discriptionhandle}

        ></input>
      </div>
      <div>
        <button>Send</button>
      </div>
      </form>
      </div>
    </div>
  )
}

export default Issue;