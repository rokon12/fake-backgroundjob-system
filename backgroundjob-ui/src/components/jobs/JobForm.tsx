import * as React from "react";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {connect} from "react-redux";
import {addJob} from "../../actions/jobActions";
import {Job} from "../../reducers/jobReducers";

interface JobFormState {
    jobName: string;
    payload: string;
    callbackUrl: string
}

export type OwnJobsNewProps = {
    addJob: (job: Job) => void;
}

class ConnectedJobForm extends React.Component<OwnJobsNewProps, JobFormState> {
    constructor(props: OwnJobsNewProps) {
        super(props);
        this.state = {jobName: "", payload: "", callbackUrl: ""}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: any) {
        const value = event.target.value;
        this.setState({
            ...this.state,
            [event.target.name]: value
        })
    }

    handleSubmit(event: any) {
        event.preventDefault();
        const {jobName, payload, callbackUrl} = this.state;
        this.props.addJob({jobName, payload, callbackUrl, uuid: ""});
        this.setState({jobName: "", payload: "", callbackUrl: ""});
    }

    render() {
        const {jobName, payload, callbackUrl} = this.state;

        return (<Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="jobNameId">
                    <Form.Label>Job Name</Form.Label>
                    <Form.Control required
                                  type="text"
                                  name="jobName"
                                  value={jobName}
                                  onChange={this.handleChange}
                                  placeholder="Enter your job name"/>
                    <Form.Text className="text-muted">
                        job name can be anything, put whatever you want to put here.
                    </Form.Text>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="payload">
                    <Form.Label>Payload</Form.Label>
                    <Form.Control required as="textarea" rows={3}
                                  name="payload"
                                  value={payload}
                                  onChange={this.handleChange}
                                  placeholder="{}"/>
                    <Form.Text className="text-muted">
                        Put whatever you want to put as a payload, doesn't really matter, since this all dummy, could be
                        json
                    </Form.Text>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>

                <Form.Group controlId="callBackUrlId">
                    <Form.Label>Callback Url</Form.Label>
                    <Form.Control required type="url"
                                  name="callbackUrl"
                                  value={callbackUrl}
                                  onChange={this.handleChange}
                                  placeholder="Enter your callback url"/>
                    <Form.Text className="text-muted">
                        Once the job is executed, this is where will call you back.
                    </Form.Text>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        )
    }
}

export const JobForm
    = connect(null, {addJob})(ConnectedJobForm)

