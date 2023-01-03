import React, {useState} from 'react';
import './App.css';
import {InboxOutlined} from '@ant-design/icons'
import type {UploadProps} from "antd";
import {Upload, message} from "antd";

const {Dragger} = Upload

function App() {

  const [ascii, setAscii] = useState("");

  const props: UploadProps = {
    name: 'file',
    multiple: false,

    action: 'http://localhost:8000/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
        setAscii(info.file.response.ascii);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <div className="App">
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Upload a single image file (jpg, jpeg, png, webp)
        </p>
      </Dragger>
      <pre className={"ascii"}>
        {ascii}
      </pre>
    </div>
  );
}

export default App;
