import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Nav} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

class NameEditor extends React.Component {
  constructor(props) {
    super(props);
    this.updateData = this.updateData.bind(this);
    this.getOverlayValue = this.getOverlayValue.bind(this);
    this.state = {
      name: props.defaultValue,
      open: true
    };
  }
  focus() {
    this.getOverlayValue(this.refs.inputRef.value)
    this.refs.inputRef.focus();
  }
  updateData() {
    this.props.onUpdate(this.state.name);
  }

  flagValue =  null

  getOverlayValue(value){
    this.flagValue =  value
  }

  close = () => {
    this.setState({ open: false });
    this.props.onUpdate(this.props.defaultValue);
  }
  render() {

    const fadeIn = this.state.open ? 'in' : '';
    const display = this.state.open ? 'block' : 'none';

    let renderVal = null
    let displaySaveButton = null

    if(this.flagValue === './image.jpg'){
      renderVal = <Image/>
      displaySaveButton = null
    }
    else {
      renderVal = <input
        ref='inputRef'
        className={ ( this.props.editorClass || '') + ' form-control editor edit-text' }
        style={ { display: 'inline', width: '50%' } }
        type='text'
        value={ this.state.name }
        onChange={ e => { this.setState({ name: e.currentTarget.value }); } } />
        displaySaveButton = <button type='button' className='btn btn-primary' onClick={ this.updateData }>Save</button>
    }

    
    return (
      <div className={ `modal fade ${fadeIn}` } id='myModal' role='dialog' style={ { display } }>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-body'>
                {renderVal}
            </div>
            <div className='modal-footer'>
              {displaySaveButton}
              <button type='button' className='btn btn-default' onClick={ this.close }>Close</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class Image extends React.Component {
  render() {
    return (
      <img src="./image.jpg" className="thumbnailImage"/>
    );
  }
}


export default class Home extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){
    console.log("componentDidMount Product Home")
  }

  render() {
    var products = [{
      id: 1000,
      title: "Product 1 Title",
      brand: "Product 1 Brand",
      image: "./image.jpg",
      price: 120,
      salePrice: 80,
      stock: 10
    }, {
      id: 1001,
      title: "Product 2 Title",
      brand: "Product 2 Brand",
      image: "./image.jpg",
      price: 80,
      salePrice: 70,
      stock: 5
    }, {
      id: 1002,
      title: "Product 3 Title",
      brand: "Product 3 Brand",
      image: "./image.jpg",
      price: 150,
      salePrice: 110,
      stock: 11
    }, {
      id: 1003,
      title: "Product 4 Title",
      brand: "Product 4 Brand",
      image: "./image.jpg",
      price: 100,
      salePrice: 60,
      stock: 9
    }, {
      id: 1004,
      title: "Product 5 Title",
      brand: "Product 5 Brand",
      image: "./image.jpg",
      price: 30,
      salePrice: 25,
      stock: 8
    }];
    function onAfterSaveCell(row, cellName, cellValue) {
      let rowStr = '';
      for (const prop in row) {
        rowStr += prop + ': ' + row[prop] + '\n';
      }
    }

    function onBeforeSaveCell(row, cellName, cellValue) {
      // You can do any validation on here for editing value,
      // return false for reject the editing
      return true;
    }

    function imageFormatter(cell, row){
      return "<a href='#' class='thumbnailAnchor'><img width='30px' height='30px' src='"+cell+"'/>" ;
    }

    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      beforeSaveCell: onBeforeSaveCell, // a hook for before saving cell
      afterSaveCell: onAfterSaveCell  // a hook for after saving cell
    };

    const createNameEditor = (onUpdate, props) => (<NameEditor onUpdate={ onUpdate } {...props}/>);

    return (
      <div className="home">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/home">MENU</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/home" className="active">Product</Nav.Link>
            <Nav.Link href="/orders">Orders</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
        </Navbar>
        <h1>Products</h1>
        <div className="col-md-12 demo-div heading-section">
          <BootstrapTable data={ products } cellEdit={ cellEditProp }>
            <TableHeaderColumn dataField='id' isKey>Product ID</TableHeaderColumn>
            <TableHeaderColumn editable={ false } dataField='title'>Title</TableHeaderColumn>
            <TableHeaderColumn editable={ false } dataField='brand'>Brand</TableHeaderColumn>
            <TableHeaderColumn dataField='image' dataFormat={imageFormatter} customEditor={ { getElement: createNameEditor } }>
              Product Image
            </TableHeaderColumn>
            <TableHeaderColumn dataField='price'>Price</TableHeaderColumn>
            <TableHeaderColumn dataField='salePrice' customEditor={ { getElement: createNameEditor } }>Sale Price</TableHeaderColumn>
            <TableHeaderColumn dataField='stock'>Stock</TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}
