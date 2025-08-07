import React from "react";

function InputField({ label, type = "text", placeholder, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700"> 
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}

export default InputField;
