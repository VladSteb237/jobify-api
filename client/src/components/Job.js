import React from 'react';
import moment from 'moment';
import JobInfo from './JobInfo';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Job';
import { useAppContext } from '../context/appContext';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

const Job = (props) => {
    const { _id, company, createdAt, position, jobLocation, jobType, status } = props;

    const { setEditJob, deleteJob } = useAppContext();

    let date = moment(createdAt);
    date = date.format('Do MMM, YYYY');
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{company.charAt(0)}</div>
                <div className='info'>
                    <h5>{position}</h5>
                    <p>{company}</p>
                </div>
            </header>
            <div className='content'>
                {/* content center later */}
                <div className='content-center'>
                    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
                    <JobInfo icon={<FaCalendarAlt />} text={date} />
                    <JobInfo icon={<FaBriefcase />} text={jobType} />
                    <div className={`status ${status}`}>{status}</div>
                </div>
                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-job'
                            className='btn edit-btn'
                            onClick={() => setEditJob(_id)}
                        >
                            Edit
                        </Link>
                        <button
                            className='btn delete-btn'
                            onClick={() => deleteJob(_id)}
                        >
                            Delete
                        </button>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
};

export default Job;
