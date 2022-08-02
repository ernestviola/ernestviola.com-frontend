import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import { Auth } from 'aws-amplify';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import { useParams } from 'react-router-dom';

import { API } from 'aws-amplify';
import CustomEditor from '../CustomEditor';





const Read = () => {
  const [contentState, setContentState] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [editorState, setEditorState] = useState('Edit')
  let { uuid } = useParams()

  const onChange = (data) => {
    setContentState(data)
    console.log(contentState)
  }

  const handleSubmit = async () => {
    const contentText = JSON.stringify(contentState)
    const date = new Date().getTime()

    const resData = await API.put('blogsApi', '/blogs', {
      body: {
        uuid,
        title,
        content: contentText,
        updated_at: date
      }
    })

    console.log(resData)
  }

  const handleEdit = () => {

    if (readOnly) {
      setEditorState('ReadOnly')
      setReadOnly(false)
    } else {
      setEditorState('Edit')
      setReadOnly(true)
    }

  }

  const handleSignOut = async () => {
    try {
      console.log('Attempting signout')
      const resData = await Auth.signOut({ global: true });
      console.log(resData)
      checkAuthenticated()
    } catch (error) {
      console.log('error signing out: ', error);
    }

  }

  const fetchBlog = async () => {

    const resData = await API.get('blogsApi', '/blogs/object/' + uuid)
    setContentState(JSON.parse(resData.content))
    setTitle(resData.title)
    setIsLoading(false)
  }

  const checkAuthenticated = async () => {
    try {
      const resData = await Auth.currentAuthenticatedUser()
      console.log(resData)
      setIsAuthenticated(true)
    } catch {
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    fetchBlog()
    checkAuthenticated()
  }, []);


  return (
    (isLoading ?
      <>Loding...</> :
      <div className='page'>
        {readOnly ? <h1>{title}</h1> : <input value={title} onChange={(e) => setTitle(e.target.value)} />}
        <CustomEditor readOnly={readOnly} contentState={contentState} onChange={onChange} />
        {isAuthenticated ?
          <>
            <Button onClick={handleSubmit}>Submit</Button>
            <Button onClick={handleEdit}>{editorState}</Button>
            <Button onClick={handleSignOut}>Sign out</Button>
          </>
          :
          <></>
        }
      </div>
    )
  )
}

export default Read