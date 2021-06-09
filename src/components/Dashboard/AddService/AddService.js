import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import Sidebar from '../../Shared/Sidebar/Sidebar';
import './AddService.css'
import swal from 'sweetalert'
import { useHistory } from 'react-router';
const AddService = () => {
    const [file, setFile] = useState(null);
    const { register, handleSubmit } = useForm();
    const [demo, setDemo] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const loggedInUser = JSON.parse(sessionStorage.getItem('user'));
        if (loggedInUser.isAdmin === 'false') {
            history.replace('/');
        }
        if (loggedInUser.email === 'admin-demo@specta.com') {
            setDemo(true);
            swal("Sorry!", "You are a demo admin,this feature is not available for you.", "warning");
        }
    }, []);
    const onSubmit = data => {
        if (demo) {
            swal("Sorry!", "You are a demo admin", "warning");
        }
        else {
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

            fetch('https://specta-web.herokuapp.com/addService', {
                method: 'POST',
                body: formData
            })
                .then(response => response.json())
                .then(success => {
                    if (success) {
                        swal("Good job!", "A new service card added!", "success");
                    }
                })
                .catch(error => {
                    swal("Error!", `${error}`, "error");
                })
        }

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

                        <div className="btn_div">
                            <button type="submit" className="brand-btn" > Submit </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddService;