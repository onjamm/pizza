export function validateForm(data) {
    console.log("Server side validation happens here");
    console.log(data);

    // Store error messages in an array
    const errors = [];

    //Validate first name
    if (data.fname.trim() == "") {
        errors.push("First name is required!");
    }

    //Validate last name 
    if (data.lname.trim() == "") {
        errors.push("Last name is required!");
    }

    // Validate email
    if (data.email.trim() == "") {
        errors.push("Email is required!");
    }

    //Validate method 
    const validMethods = ['pickup', 'delivery'];

    if(!validMethods.includes(data.method)) {
        errors.push("Method must be pickup or delivery");
    }

    //Validate size 
    const validSizes = ['small', 'medium', 'large'];
    
    if(!validSizes.includes(data.size)) {
        errors.push("Size must be selected");
    }

    console.log(errors);
    return {
        isValid: errors.length === 0,
        errors
    };
}

