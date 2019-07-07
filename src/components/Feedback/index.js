import React from 'react'
import { Form, Input, message } from 'antd'
import { ToggleButton, ShowIcon, HideIcon, StyledDiv, SubmitButton } from './styled'
import axios from 'axios'

const { TextArea } = Input

const initialState = {
    isFormVisible: false,
    email: '',
    message: '',
    wasSubmitClicked: false,
    emailValidateStatus: '',
    messageValidateStatus: ''
}

class Feedback extends React.Component {

    constructor(props) {
        super(props)
        this.state = initialState
    }

    handleToggle = () => {
        this.setState((state) => ({ isFormVisible: !state.isFormVisible }))
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        // validate fields on change only after submit has been clicked
        if (this.state.wasSubmitClicked) {
            this.setState({
                ...this.validateField(event.target.name, event.target.value)
            })
        }
    }

    validateField(field, value) {
        switch (field) {
            case 'email':
                return {
                    // source https://html.spec.whatwg.org/multipage/input.html#e-mail-state-(type=email)
                    emailValidateStatus: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ? '' : 'error'
                }
            case 'message':
                return {
                    messageValidateStatus: value !== '' ? '' : 'error'
                }
            default:
                return
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState((state) => ({
            wasSubmitClicked: true,
            ...this.validateField('email', state.email),
            ...this.validateField('message', state.message)
        }), () => {
            if (this.state.emailValidateStatus === '' && this.state.messageValidateStatus === '') {
                const hideLoadingMessage = message.loading('Sending message...', 0);
                axios.post(this.props.apiUrl, {
                    email: this.state.email,
                    message: this.state.message
                })
                .then(() => {
                    hideLoadingMessage();
                    setTimeout(() => { message.success('Message sent') }, 750)
                })
                .catch(() => {
                    hideLoadingMessage();
                    setTimeout(() => { message.error('Error while sending message') }, 750)
                })
                this.setState(initialState)
            }
        })
    }

    render() {
        let toggleIcon;
        if (this.state.isFormVisible) {
            toggleIcon = <HideIcon type='plus' rotate='45' />
        } else {
            toggleIcon = <ShowIcon type='message' theme='filled' />
        }
        return (
            <>
                <ToggleButton shape='circle' type='primary' onClick={this.handleToggle}>
                    {toggleIcon}
                </ToggleButton>
                {this.state.isFormVisible && <StyledDiv>
                    <h3>Leave us a message</h3>
                    <Form layout='vertical'>
                        <Form.Item validateStatus={this.state.emailValidateStatus} help={this.state.emailValidateStatus === 'error' ? 'Please insert a valid email' : ''}>
                            <Input name='email' placeholder='Your email' value={this.state.email} onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item validateStatus={this.state.messageValidateStatus} help={this.state.messageValidateStatus === 'error' ? 'Please insert a message' : ''} >
                            <TextArea name='message' autosize={{ minRows: 8, maxRows: 8 }} placeholder='Your message' value={this.state.message} onChange={this.handleChange} />
                        </Form.Item>
                        <Form.Item>
                            <SubmitButton type='primary' shape='round' onClick={this.handleSubmit}>Submit</SubmitButton>
                        </Form.Item>
                    </Form>
                </StyledDiv>}
            </>
        )
    }
}

export default Feedback