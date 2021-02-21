import React from 'react';
import {Job} from '../../reducers/jobReducers';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup} from "react-bootstrap";

interface JobListItemProps {
    job: Job;
}

const JobsListItem = ({job}: JobListItemProps) => (
    <tr>
        <td>
            <Link to={`/jobs/${job.uuid}`} className="header">
                {job.jobName}
            </Link>
        </td>
        <td>
            <div className="description">
                <p>{job.payload}</p>
            </div>
        </td>
        <td>
            <div className="">{job.status}</div>
        </td>
        <td>
            <div className="">{job.callbackUrl}</div>
        </td>
        <td>
            <div>
                <ButtonGroup className="sm">
                    <Button disabled href={'/jobs/edit/' + job.uuid} variant="primary" size="sm">Edit</Button>{' '}
                    <Button disabled href={'/jobs/delete/' + job.uuid} variant="danger" size="sm">Delete</Button>{' '}
                </ButtonGroup>
            </div>
        </td>
    </tr>
);

export default JobsListItem;