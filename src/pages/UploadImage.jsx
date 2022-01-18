import React from 'react'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
const UploadImage = () => {
  const handleChangeStatus = ({ meta }, status) => {
    // console.log(status, meta)
  }

  const handleSubmit = (files, allFiles) => {
    // console.log(files.map((f) => f.meta))
    allFiles.forEach((f) => f.remove())
  }

  return (
    <Dropzone
      className='drop'
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      maxFiles={3}
      inputContent='عکس آگهی را انتخاب کنید'
      inputWithFilesContent={(files) => `${3 - files.length} more`}
      submitButtonDisabled={(files) => files.length < 3}
    />
  )
}

export default UploadImage
