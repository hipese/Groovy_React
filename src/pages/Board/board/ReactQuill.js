import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Reactquill({ id, value, setValue, isDisabled }) {
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }, { 'color': [] }, { 'background': [] }],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'align',
    'color',
    'background',
  ];

  const editorStyle = {
    minHeight: '300px', // Add min-height here
  };

  return (
    <ReactQuill
      id={id}
      className="form-control text-editor"
      theme="snow"
      modules={modules}
      formats={formats}
      value={value || ''}
      onChange={(content, delta, source, editor) => setValue(content)}
      style={{ width: '100%', height: '100%', ...editorStyle }}
      readOnly={isDisabled}
    />
  );
}

export default Reactquill;
