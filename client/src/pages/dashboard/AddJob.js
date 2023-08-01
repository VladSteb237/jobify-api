import React from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const AddJob = () => {
    const {
        isLoading,
        isEditing,
        showAlert,
        displayAlert,
        position,
        company,
        jobLocation,
        statusOptions,
        jobTypeOptions,
        jobType,
        status,
        handleChange,
        clearValues,
        createJob,
        editJob,
    } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !company || !jobLocation) {
            displayAlert();
            return;
        };
        if (isEditing) {
            editJob();
            return;
        };
        createJob();
    };

    const handleJobInput = (e) => {
        handleChange({ name: e.target.name, value: e.target.value });
    };

    return (
        <Wrapper>
            <form className='form'>
                <h3>{isEditing ? 'edit job' : 'add job'}</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='position'
                        value={position}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        name='company'
                        value={company}
                        handleChange={handleJobInput}
                    />
                    <FormRow
                        type='text'
                        labelText='location'
                        name='jobLocation'
                        value={jobLocation}
                        handleChange={handleJobInput}
                    />
                    {/* job status */}
                    <FormRowSelect
                        name='status'
                        value={status}
                        labelText='Status Type'
                        handleChange={handleJobInput}
                        list={statusOptions}
                    />
                    {/* job type */}
                    <FormRowSelect
                        name='jobType'
                        value={jobType}
                        labelText='Job Type'
                        handleChange={handleJobInput}
                        list={jobTypeOptions}
                    />
                    <div className='btn-container'>
                        <button
                            type="submit"
                            className='btn btn-block submit-btn'
                            onClick={handleSubmit}
                            disabled={isLoading}

                        >
                            submit
                        </button>
                        <button className='btn btn-block clear-btn'
                            onClick={(e) => {
                                e.preventDefault();
                                clearValues();
                            }}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
