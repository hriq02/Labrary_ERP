import "./Employee_module.css"
import "../../components/module_pane.css"
import "./Employee_module.css"

function Employee_Module(){

	return (
				<div className="module-pane-container">
								<div className="Employee-module-container">
												<PersonalDetails />							
								</div>
	      </div>
	 );
}


function PersonalDetails(){
				const employee = {
						id: 1,
						name: "John Doe",
						email: "6oZkM@example.com",
				}
				
				return(
								<div className="personal-info-container">
												<img src="https://www.w3schools.com/images/w3schools_green.jpg">
												</img>
												<p>ID: {employee.id}</p>
												<p>Nome: {employee.name}</p>
												<p>Email: {employee.email}</p>
												
								</div>

				);
}

export default Employee_Module
