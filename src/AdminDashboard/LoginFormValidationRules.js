export default function validate(values) {
    //apply all validation rule here 
    let errors = {};
    //Client component validation 
    if (!values.clientName) {
        errors.clientName = 'Clientname  is required';
    }
    else{
        if (values.clientName) {
            errors.clientName = '';
        }
    }
    if (!values.category) {
        errors.category = 'Category  is required';
    }
    else{
        if (values.category) {
            errors.category = '';
        }
    }
    if (!values.website) {
        errors.website = 'Website URL  is required';
    }
    else{
        if (values.website) {
            errors.website = '';
        }
    }

    if (!values.emailID) {
      errors.emailID = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.emailID)) {
      errors.emailID = 'Email address is invalid';
    }


    if (!values.contactNumber) {
      errors.contactNumber = 'Contactnumber is required';
    } else if (values.contactNumber.length <= 10) {
      errors.contactNumber = 'Contactnumber must be 10 characters';
    }

    //Project Component validation 
    if (!values.projectName) {
        errors.projectName = 'Projectname  is required';
    }
    else{
        if (values.projectName) {
            errors.projectName = '';
        }
    }

    if (!values.startDate) {
        errors.startDate = 'Startdate  is required';
    }
    else{
        if (values.startDate) {
            errors.startDate = '';
        }
    }

    if (!values.endDate) {
        errors.endDate = 'Enddate  is required';
    }
    else{
        if (values.endDate) {
            errors.endDate = '';
        }
    }

    //ManageUser Component validation
    if (!values.userName) {
        errors.userName = 'Username  is required';
    }
    else{
        if (values.userName) {
            errors.userName = '';
        }
    }

    //ManageRole  Component validation
    if (!values.roleName) {
        errors.roleName = 'RoleName  is required';
    }
    else{
        if (values.roleName) {
            errors.roleName = '';
        }
    }
    if (!values.description) {
        errors.description = 'Description  is required';
    }
    else{
        if (values.description) {
            errors.description = '';
        }
    }
    return errors;
  };