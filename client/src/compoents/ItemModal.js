import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap"
import { connect } from "react-redux"
import { addItem } from "../actions/itemActions"
import PropTypes from "prop-types";

class ItemModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: ''
        }
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    onSubmit = (e) => {
        if (e) {
            e.preventDefault()
        }
        const newItem = {
            name: this.state.name
        }
        this.props.addItem(newItem)
        this.toggle()
    }
    render() {
        return (
            <div>
                <Button color="dark" style={{ marginBottom: "2rem" }} onClick={() => this.toggle()}>Add Item</Button>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.onSubmit(e)}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add Item" onChange={(e) => this.onChange(e)} />
                            </FormGroup>
                        </Form>
                        <Button color="dark" style={{ marginBottom: "2rem", width: "100%" }} onClick={() => this.onSubmit(false)}>Create Item</Button>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

ItemModal.propTypes = {
    addItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
    item: state.item
})
export default connect(mapStateToProps, { addItem })(ItemModal);