import React, { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import Grid from '@material-ui/core/Grid'
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import axios from 'axios'
import Alert from '@material-ui/lab/Alert';
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap';

//table button and Icons
const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

//API client information
const api = axios.create({
  baseURL: `https://reqres.in/api`
})

//Emailvalidation
function validateEmail(email){
  const re = '';
  return re.test(String(email).toLowerCase());
}

//Grid item
function Client() {
  var columns = [
    {title: "id", field: "id", hidden: true},
    {title: "Client name", field: "first_name"},
    {title: "Organization", field: "Organization"},
    {title: "Website", field: "Website"},
    {title: "ContactNumber", field: "ContactNumber"},
    {title: "Email", field: "email"},
    {title: "country", field: "country"},
    {title: "Name", field: "Name"}
   
  ]
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  useEffect(() => { 
    api.get("/users")
        .then(res => {               
            setData(res.data.data)
         })
         .catch(error=>{
             console.log("Error")
         })
  }, [])

  //Update
  const handleRowUpdate = (newData, oldData, resolve) => {
    //validation
    let errorList = []
    if(newData.first_name === ""){
      errorList.push("Please enter first name")
    }   
    if(newData.email === "" || validateEmail(newData.email) === false){
      errorList.push("Please enter a valid email")
    }

    if(errorList.length < 1){
      api.patch("/users/"+newData.id, newData)
      .then(res => {
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()
        setIserror(false)
        setErrorMessages([])
      })
      .catch(error => {
        setErrorMessages(["Update failed! Server error"])
        setIserror(true)
        resolve()
        
      })
    }else{
      setErrorMessages(errorList)
      setIserror(true)
      resolve()

    }    
  }

  //delete
  const handleRowDelete = (oldData, resolve) => {    
    api.delete("/users/"+oldData.id)
      .then(res => {
        const dataDelete = [...data];
        const index = oldData.tableData.id;
        dataDelete.splice(index, 1);
        setData([...dataDelete]);
        resolve()
      })
      .catch(error => {
        setErrorMessages(["Delete failed! Server error"])
        setIserror(true)
        resolve()
      })
  }

  //slide panel and add client
  const [state, setState] = useState({
    isPaneOpen: false,
    isPaneOpenLeft: false,
    ClientName: '',
    Category: '',
    Website: '',            
    ContactNumber: '',
    Country:''
  });

  const AddClient = () => {
    axios.post('http://localhost:5000/api/Create/', {
        "ClientName": state.ClientName, "Website": state.Website,
        "Category": state.Category, "ContactNumber": Number(state.ContactNumber),
        "Country": state.Country
    })
        .then(json => {
            if (json.data !== undefined) {
                console.log(json.data.Status);
                alert("Data Save Successfully");
                //this.props.history.push('/Client')                    
            }
            else {
                alert('Data not Saved');
                //this.props.history.push('/Client')
            }
        })
}
//const handleChange = (e) => {
  //  this.setState({ [e.target.name]: e.target.value });
//}


 //div - error message | Grid - Metrial table with action | slide panel - add client
  return (
    <div className="App">      
      <Grid container spacing={1}>       
          <Grid item xs={6}>
          <div>
            {iserror && 
              <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                      return <div key={i}>{msg}</div>
                  })}
              </Alert>
            }       
          </div>

          <div id="addMenu">
           Add Clients<AddBox onClick={() => setState({ isPaneOpen: true })}></AddBox>
          </div>

            <MaterialTable
              title="Client Data"
              columns={columns}
              data={data}
              icons={tableIcons}
              editable={{
                onRowUpdate: (newData, oldData) =>
                  new Promise((resolve) => {
                      handleRowUpdate(newData, oldData, resolve);                      
                  }),               
                onRowDelete: (oldData) =>
                  new Promise((resolve) => {
                    handleRowDelete(oldData, resolve)
                  }),
              }}              
              options={{
                actionsColumnIndex: -1,
                exportButton: true,
                filtering: false
              }}              
            />
          </Grid>
        </Grid>

        <SlidingPane id="side-drawer" className="some-custom-class" overlayClassName="some-custom-overlay-class"
          isOpen={state.isPaneOpen}   title="Add Client" subtitle="QDM" width="300px" z-index="999999" 
          onRequestClose={() => {setState({ isPaneOpen: false });}}>   
               <Container className="App">
                <h4 className="PageHeading">Add Client</h4>
                <Form className="form">
                    <Col>
                        <FormGroup>                            
                            <Col sm={10}>
                                <Input type="text" name="ClientName"  value={state.ClientName}  placeholder="Client Name"
                                 />
                            </Col>                            
                        </FormGroup>
                        <br/> 
                        <FormGroup>                            
                            <Col sm={10}>
                                <select name="Category" value={state.value}>                               
                                  <option value="-1"> Organization Category</option>
                                    <option value="0">Test1</option>
                                    <option value="1">Test2</option>
                                    <option value="2">Test3</option>
                                    <option value="3">Test4</option>
                                </select>
                            </Col>
                        </FormGroup>
                        <br/> 
                        <FormGroup>                            
                            <Col sm={10}>
                                <Input type="text" name="Website" value={state.Website} placeholder="Website" />
                            </Col>
                        </FormGroup>
                        <br/> 
                        <FormGroup>                           
                            <Col sm={10}>
                                <Input type="number" name="ContactNumber" value={state.ContactNumber} placeholder="Contact Number" />
                            </Col>
                        </FormGroup>
                        <br/>    
                        <FormGroup>                            
                            <Col sm={10}>
                                <select name="Country" value={state.value}>                               
                                  <option value="-1">Country</option>
                                    <option value="0">India</option>
                                    <option value="1">Singapur</option>
                                    <option value="2">Dubai</option>
                                    <option value="3">Malasiya</option>
                                </select>
                            </Col>
                        </FormGroup>  
                        <hr/>
                        <FormGroup>
                            <Label for="In-Charge Details" sm={2}>In-Charge Details</Label>
                            <Col sm={10}>
                                <Input type="text" name="Name" value={state.Name}  placeholder="Name"
                                    required />
                            </Col>
                        </FormGroup>
                        <br/>
                        <FormGroup>                            
                            <Col sm={10}>
                                <Input type="text" name="EmailID" value={state.EmailID} placeholder="EmailID"/>
                            </Col>
                        </FormGroup>             
                    </Col>
                    <br/>
                    <Col>
                        <FormGroup>
                            <Col sm={10}>
                            </Col>
                            <Col sm={10}>
                                <button type="button" onClick={AddClient} class="button button5">Submit</button>
                                <button type="button" class="button button5">Cancel</button>{' '}                                 
                            </Col>
                            <Col sm={5}>
                            </Col>
                        </FormGroup>
                    </Col>                  
                </Form>
            </Container>
        </SlidingPane>

    </div>
  );
}

export default Client;