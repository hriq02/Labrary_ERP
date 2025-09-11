import "./Employee_module.css"
import "../../components/module_pane.css"
import "./Employee_module.css"

import React,{useState, useEffect} from 'react';


function Employee_Module() {
	const employee_id = "1"
	const [employee_data, setEmployeeData] = useState({
		name : "",
		role : "",
		email : "",
		phone : "",
		profile_pic : "",
	});

	useEffect(() => {
		fetch(`http://127.0.0.1:5010/api/employee/data?id=${employee_id}`)
			.then(res => res.json())
			.then(data => setEmployeeData(data))
			.catch(err => console.error(err));
	}, []);
  
  const attendance_data = {
    total_work_time: "85h 48m",
    total_working_days: 16,
    total_leave: 0,
    total_holiday: 14,
    total_absent: 0,
    total_early_left: 1,
    average_work_time: "7h 21m",
    average_checkin: "08:46 AM",
    average_checkout: "03:22 PM",
    total_present: 16,
    total_late: 2,
  }
  
  return (
	<div className="module-pane-container">
		<div className="page-container">
			<div className="profile-section">
				<img
				src={employee_data.profile_pic}
				alt="Profile"
				className="profile-pic"
				/>
				<div className="profile-info">
				<h2>{employee_data.name}</h2>
				<p>{employee_data.role}</p>
				<a href={employee_data.email}>{employee_data.email}</a>
				<p>📱 {employee_data.phone}</p>
				</div>
				<div className="edit-button">
				<button>Edit</button>
				</div>
			</div>

			<div className="summary-controls">
				<select>
				<option>This Month</option>
				</select>
				<button className="print-button">Print Summary</button>
			</div>

			<div className="summary-section">
				<h3>Summary</h3>
				<div className="summary-columns">
				<div className="left-column">
					<p>Total Work Time: <span>{attendance_data.total_work_time}</span></p>
					<p>Total Working Days: <span>{attendance_data.total_working_days}</span></p>
					<p>Total Leave: <span>{attendance_data.total_leave}</span></p>
					<p>Total Holiday: <span>{attendance_data.total_holiday}</span></p>
					<p>Total Absent: <span>{attendance_data.total_absent}</span></p>
					<p>Total Early Left: <span>{attendance_data.total_early_left}</span></p>
				</div>
				<div className="right-column">
					<p>Average Work Time: <span>{attendance_data.average_work_time}</span></p>
					<p>Average Checkin: <span>{attendance_data.average_checkin}</span></p>
					<p>Average Checkout: <span>{attendance_data.average_checkout}</span></p>
					<p>Total Present: <span>{attendance_data.total_present}</span></p>
					<p>Total Late: <span>{attendance_data.total_late}</span></p>
				</div>
				</div>
			</div>

			<table className="attendance-table">
				<thead>
				<tr>
					<th>Date</th>
					<th>Status</th>
					<th>Checkin</th>
					<th>Checkout</th>
					<th>Time Worked</th>
					<th>Comment</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>2017-06-01</td>
					<td>Present</td>
					<td>09:12:27</td>
					<td>15:42:05</td>
					<td>6h 29m</td>
					<td>Late</td>
				</tr>
				</tbody>
			</table>
		</div>
	</div>
  );
};

export default Employee_Module
