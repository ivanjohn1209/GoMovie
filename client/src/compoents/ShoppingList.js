import React, { Component, Fragment } from 'react';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from "reactstrap";
import { connect } from "react-redux";
import { getItems, deleteItem, editItem } from "../actions/itemActions";
import PropTypes from "prop-types";
import ItemModal from './ItemModal';

class ShoppingList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            itemName: '',
            itemId: ''
        }
        this.deleteListItem = this.deleteListItem.bind(this);
    }
    componentDidMount() {
        this.props.getItems();
    }
    deleteListItem(id) {
        this.props.deleteItem(id);
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };
    toggle = (val) => {
        this.setState({
            isOpen: !this.state.isOpen,
            itemName: val ? val.name : '',
            itemId: val ? val._id : ''
        })
    };
    onSubmit = (e) => {
        if (e) {
            e.preventDefault()
        }
        const update = {
            name: this.state.name,
            id: this.state.itemId
        }
        this.props.editItem(update)
        this.toggle()
    }
    render() {
        const { item, isAuthenticated } = this.props;
        const { itemName } = this.state;
        const textNotLogin = (
            <Fragment>
                <h3>Please Login to Manage Items</h3>
            </Fragment>
        )
        return (
            <Container>
                {
                    isAuthenticated ? <ItemModal /> : textNotLogin
                }
                <ListGroup>
                    {
                        item.items.map((val, key) => {
                            return (
                                <ListGroupItem key={key} style={{ margin: "10px 0", border: "1px solid #cbcbcb" }}>
                                    {
                                        isAuthenticated ? <Button className="remove-btn btn-danger" onClick={() => this.deleteListItem(val._id)}>
                                            &times;
                                        </Button> : ''
                                    }
                                    <h4 style={{ display: "initial" }}>{val.name}</h4>
                                    {
                                        isAuthenticated ? <Button className="remove-btn btn-info" onClick={() => this.toggle(val)}>
                                            edit
                                         </Button> : ''
                                    }

                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={(e) => this.onSubmit(e)}>
                            <FormGroup>
                                <Label for="item">Edit Item</Label>
                                <Input type="text" name="name" id="item" placeholder={itemName} onChange={(e) => this.onChange(e)} />
                            </FormGroup>
                        </Form>
                        <Button color="dark" style={{ marginBottom: "2rem", width: "100%" }} onClick={() => this.onSubmit(false)}>Save</Button>
                    </ModalBody>
                </Modal>

            </Container>
        );
    }
}

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool,

}
const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated,
})
export default connect(mapStateToProps, { getItems, deleteItem, editItem })(ShoppingList);