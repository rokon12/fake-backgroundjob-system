import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import JobsListItem from '../../components/jobs/JobsListItem';
import {fetchJobs} from '../../actions/jobActions';
import {RootState} from '../../store/store';
import {Job} from '../../reducers/jobReducers';
import {Table} from 'react-bootstrap';

export interface JobsListProps {
    jobs: Job[];
    fetchJobs: () => any;
}

class JobList extends Component<JobsListProps> {
    componentDidMount(): void {
        this.props.fetchJobs();
    }

    renderJobs(): JSX.Element[] | null {
        const {jobs} = this.props;
        if (!jobs) {
            return null;
        }
        return jobs.map((job: Job) => {
            return <JobsListItem job={job} key={job.uuid}/>;
        });
    }

    render() {
        return (
            <Table striped bordered hover responsive size="lg">
                <thead>
                <tr>
                    <th>Job</th>
                    <th>Payload</th>
                    <th>Status</th>
                    <th>Callback Url</th>
                    <th>#</th>
                </tr>
                </thead>
                <tbody>
                {this.renderJobs()}
                </tbody>
            </Table>
        );
    }
}

const mapStateToProps = (state: RootState) => {
    return {
        jobs: _.values(state.jobs.items)
    };
};

export default connect(
    mapStateToProps,
    {fetchJobs}
)(JobList);

