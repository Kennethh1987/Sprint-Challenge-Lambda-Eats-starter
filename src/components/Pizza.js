import React, {useState, useEffect} from 'react';
import * as yup from "yup";
import Axios from "axios";


const formScheme = yup.object().shape({
    name: yup.string().required("Name is a required field.").min(2, "Must be longer than 2 characters."),
    email: yup.string().required("Must be a valid email address"),
    size: yup.string().required("Please select a size"),
    sauce: yup.string().required("Please select a sauce"),
    pepperoni:yup.boolean(),
    sausage:yup.boolean(),
    pineapple:yup.boolean(),
    onions:yup.boolean(),
    olives:yup.boolean(),
    ham:yup.boolean(),
    extracheese:yup.boolean(),
    chicken:yup.boolean(),
    instructions:yup.string()





})



















function Pizza() {


const [ buttonDisabled, setButtonDisabled] = useState(true);

const [ formState, setFormState] = useState({

    name: "",
    email: "",
    size: "",
    instructions: "",


});

const [ errors, setErrors ] = useState({
    name: "",
    email: "",
    size: "",
    toppings: "",
    instructions: "",


});

const [ post, setPost ] = useState([]);

useEffect(() => {
    formScheme.isValid(formState).then(valid => {
        setButtonDisabled(!valid);
    });
}, [formState]);

const FormSubmit = e => {
    e.preventDefault();
    console.log("submitted");
    Axios
    .post("https://reqres.in/api/users", formState)
    .then(res => {
        setPost(res.data);
        console.log("success", post);
        setFormState({
            name: "",
            email: "",
            size: "",
            toppings: "",
            instructions: "",
            
        });
    })
    .catch(err => console.log(err.response));
};


const validateChange = e =>{
    yup
    .reach(formScheme, e.target.name)
    .validate(e.target.value)
    .then(valid => {
        setErrors({
            ...errors,
            [e.target.name]: ""
        });
    })
    .catch(err =>{
        setErrors({
            ...errors,
            [e.target.name]: err.errors[0]
        });
    });
};

const inputChange = e => {
    e.persist();
    const newFormData = {
        ...formState,
        [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
};








    return (
   <div>
       <p>hi</p> 
{/*     
     <img
       className="home-image"
       src="https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"
       alt="Pizza"
     />
  
 <img 	        
 className="home-image"
    src="https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"
    alt="Pizza"
  /> */}
  <h2>Build Your Own Pizza</h2>
  <br />
  <form onSubmit={FormSubmit}>
    <h3>Personal Info</h3>
    <br />
    <label htmlFor="name">Name: </label>
    <input
      id="name"
      type="text"
      name="name"
      value={formState.name}
      onChange={inputChange}
    />
    <label htmlfor="email"> Email:</label>
    <input 
    id="email"
    type="text"
    name="email"
    placeholder="email"
    value={formState.email}
    onChange={inputChange} 
    />
 
    <h3>Select Pizza Size. </h3>
    <label htmlFor="size">Size: </label>
    <select id="size" name="size" placeholder="size" value={formState.size} onChange={inputChange}>
      <option value="Small">Small</option>
      <option value="Medium">Medium</option>
      <option value="Large">Large</option>
      <option value="Jumbo">X-Large</option>
    </select>
    <br />
    <h3>Choice of Sauce</h3>
    <label htmlFor="sauce">Sauce: </label>
    <select id="sauce" name="sauce" placeholder="sauce" value={formState.sauce} onChange={inputChange}>
      <option value="original red">Original Red</option>
      <option value="garlic ranch">Garlic Ranch </option>
      <option value="bbq sauce">BBQ Sauce</option>
      <option value="spinach alfredo">Spinach Alfredo </option>
    </select>

    <fieldset>
                <legend>Choose your Toppings</legend>
            
            <p>Please select which ever toppings you like</p>
            
            <p> <label><input type="checkbox" name="extracheese" value="extracheese" onChange={inputChange}/> Extra Cheese </label>
                <label><input type="checkbox" name="chicken" value="chicken" onChange={inputChange}/> Chicken </label>
                <label><input type="checkbox" name="pepperoni" value="pepperoni" onChange={inputChange}/> Pepperoni</label>
                <label><input type="checkbox" name="ham" value="ham" onChange={inputChange}/> Ham </label>
                <label><input type="checkbox" name="sausage" value="sausage" onChange={inputChange}/> Sausage </label>
                <label><input type="checkbox" name="pineapple" value="pineapple" onChange={inputChange}/>Pineapple </label>
                <label><input type="checkbox" name="onions" value="onions" onChange={inputChange}/> Onions </label>
                <label><input type="checkbox" name="olives" value="olives" onChange={inputChange}/> Olives </label>

            </p>
            
            </fieldset>
    <h3>Special Instructions?</h3>
    <label htmlFor="instructions">Special Instructions: </label>
    <textarea
      id="instructions"
      type="text"
      name="instructions"
      value={formState.name}
      onChange={inputChange}
    /> 
      <pre>{JSON.stringify(post, null, 2)}</pre>
    <button className="submitBtn" disabled={buttonDisabled}>Submit Order</button>
   
  </form>
</div>
);

};

export default Pizza;
