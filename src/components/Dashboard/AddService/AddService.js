import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AddService.css'
const AddService = () => {
    const [file, setFile] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        const formData = new FormData()
        formData.append('file', file);
        formData.append('title', data.title);
        formData.append('price', data.price);
        formData.append('subType', data.subType);
        formData.append('speed', data.speed);
        formData.append('realIp', data.realIp);
        formData.append('opticFiber', data.opticFiber);
        formData.append('bdix', data.bdix);
        formData.append('router', data.router);

        fetch('http://localhost:5000/addService', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(success => {
                if (success) {
                    alert("data uploaded !!!!")
                }
            })
            .catch(error => {
                console.error(error)
            })
    }
    const handleFileChange = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile);
    }
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dashboard-area">
                <div className="section-header">
                <h1>Add a service</h1>
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" name="title" required placeholder="Title of service" ref={register} />

                        <input type="number" name="price" required placeholder="Price tag" ref={register} />

                        <input type="number" name="speed" required placeholder="Connection Speed" ref={register} />

                        <input type="text" name="subType" required placeholder="Subscription Type" ref={register} />

                        <div className="select-container">
                        <div className="select-div">
                            <legend>Real Ip</legend>
                            <select type="text" name="realIp" required placeholder="realIp" ref={register} >
                                <option value="Yes"> Yes </option>
                                <option value="No"> No </option>
                            </select>
                        </div>

                        <div className="select-div">
                            <legend>Optic Fiber</legend>
                            <select type="text" name="opticFiber" required placeholder="opticFiber" ref={register} >
                                <option value="Yes"> Yes </option>
                                <option value="No"> No </option>
                            </select>
                        </div>

                        <div className="select-div">
                            <legend>bdix:</legend>
                            <select type="text" name="bdix" required placeholder="bdix" ref={register} >
                                <option value="Yes"> Yes </option>
                                <option value="No"> No </option>
                            </select>
                        </div>

                    
                        <div className="select-div">
                        <legend>ROuter</legend>
                        <select type="text" name="router" required placeholder="router" ref={register} >
                            <option value="Yes"> Yes </option>
                            <option value="No"> No </option>
                        </select>
                        </div>
                    </div>

                        <input onChange={handleFileChange} type="file" />

                        <button type="submit" className="brand-btn" > Submit </button>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default AddService;