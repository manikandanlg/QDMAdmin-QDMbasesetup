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
import { Container, Col, Form, FormGroup, Input } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import Tabs from "../components/Tabs";


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

const api = axios.create({
  baseURL: `https://reqres.in/api`
})


function validateEmail(email){
  const re = '';
  return re.test(String(email).toLowerCase());
}

function Users() {

  var columns = [
    {title: "id", field: "id", hidden: true},
    {title: "Project Name", field: "first_name"},
    {title: "Domain", field: "projectDomain"},
    {title: "Client Name", field: "clientname"},
    {title: "Duration", field: "duration"},
    {title: "Status", field: "status"}
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
  projectName: '',
  projectDomain: '',
  client: '',            
  startDate: '',
  endDate:''
});

const addUsers = () => {
  axios.post('http://localhost:5000/api/Create/', {
      "ProjectName": state.ProjectName, "ProjectDomain": state.ProjectDomain,
      "Client": state.Client, "StartDate":state.StartDate,
      "EndDate": state.EndDate
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
  //this.setState({ [e.target.name]: e.target.value });
//}


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
           Add Users<AddBox onClick={() => setState({ isPaneOpen: true })}></AddBox>
          </div>
            <MaterialTable
              title="User Details"
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
                actionsColumnIndex: -1
              }}
            />
          </Grid>
        </Grid>
        <SlidingPane id="side-drawer" className="some-custom-class" overlayClassName="some-custom-overlay-class"
          isOpen={state.isPaneOpen}   title="Add Users" subtitle="QDM" width="300px" z-index="999999" 
          onRequestClose={() => {setState({ isPaneOpen: false });}}>   
                <Tabs>
                    <div label="User Details">
                    
                    </div>
                    <div label="Client & Projects">
                  
                    </div>
               </Tabs>
        </SlidingPane>
    </div>
  );
}

export default Users;