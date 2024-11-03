document.addEventListener('DOMContentLoaded', () => {
    // Handle dropdown functionality
    document.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.addEventListener('click', () => {
            dropdown.classList.toggle('active');
            const content = dropdown.querySelector('.dropdown-content');
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        });
    });

    // Handle sidebar link clicks to show the relevant section
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Handle sign-out button click
    document.getElementById('sign-out-btn')?.addEventListener('click', signOut);

    // Handle form submissions
    function handleFormSubmit(formId, successMessageId) {
        document.getElementById(formId)?.addEventListener('submit', (event) => {
            event.preventDefault();
            // Perform form submission logic here

            // Show success message
            const messageElement = document.getElementById(successMessageId);
            messageElement.style.display = 'block';

            // Clear the form fields
            document.getElementById(formId).reset();
        });
    }

    // Handle add member form submission
    document.getElementById('add-member-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById('form-success-message').style.display = 'block';
        document.getElementById('add-member-form').reset();
    });

    // Handle change password form submission
document.getElementById('change-password-form')?.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission

    if (!checkPasswordMatch()) return; // Check if passwords match

    // Perform password change logic here

    // Show success message
    const messageElement = document.getElementById('change-password-success-message');
    if (messageElement) {
        messageElement.style.display = 'block';
    }

    // Clear the form fields
    document.getElementById('change-password-form').reset();
});

    // Handle edit profile form submission
    document.getElementById('edit-profile-form')?.addEventListener('submit', (event) => {
        event.preventDefault();
        // Perform the update profile logic here

        // Show success message
        const messageElement = document.getElementById('edit-profile-success-message');
        if (messageElement) {
            messageElement.style.display = 'block';
        }

        // Clear form fields
        document.getElementById('edit-profile-form').reset();
    });
});

// Function to check if new passwords match and validate the password strength
function checkPasswordMatch() {
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-new-password').value;
    const errorElement = document.getElementById('password-error');
    
    const passwordRegex = /^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()+}{":;'?/>.<,])[A-Za-z\d!@#$%^&*()+}{":;'?/>.<,]{8,}$/;
    
    
    
    // Check if the new password is not the same as the current password
    if (currentPassword ==newPassword && currentPassword == confirmPassword) {
        errorElement.textContent = 'New password should not be the same as the current password.';
        return false;
    }

    // Validate password strength
    if (!passwordRegex.test(newPassword)) {
        errorElement.textContent = 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character.';
        return false;
    }
    
    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
        errorElement.textContent = 'Passwords do not match!';
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
 }
 document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const inputId = toggle.getAttribute('data-input');
            const inputElement = document.getElementById(inputId);
            
            // Toggle between password and text input types
            if (inputElement.type === 'password') {
                inputElement.type = 'text';
                toggle.classList.remove('fa-eye');
                toggle.classList.add('fa-eye-slash');
            } else {
                inputElement.type = 'password';
                toggle.classList.remove('fa-eye-slash');
                toggle.classList.add('fa-eye');
            }
        });
    });
 });



 // Sign out function
 function signOut() {
    window.location.href = 'index.html'; // Adjust the URL to match your login page
 }


    // Initialize members array
    // Load saved grievances

    // Function to populate the table with data
    // function populateTable(member) {
    //     const tableBody = document.querySelector('#members-table tbody');
    //     tableBody.innerHTML = ''; // Clear the table before populating
    //     members.forEach(member => {
    //         const row = document.createElement('tr');
    //         row.innerHTML = `
    //             <td>${member.srNo}</td>
    //             <td>${member.name}</td>
    //             <td>${member.gender}</td>
    //             <td>${member.designation}</td>
    //             <td>${member.email}</td>
    //             <td>${member.contact}</td>
    //             <td><button class="action-button" onclick="deleteMember(${member.srNo})"><i class="fas fa-trash-alt"></i></button></td>
    //         `;
    //         tableBody.appendChild(row);
    //     });
    // }

    // Function to handle member deletion
    function deleteMember(srNo) {
        const confirmation = confirm('Are you sure you want to delete this member?');
        if (confirmation) {
            // Remove the member from the data array
            const index = members.findIndex(member => member.srNo === srNo);
            if (index !== -1) {
                members.splice(index, 1);
                 // Save updated members to localStorage
                 localStorage.setItem('members', JSON.stringify(members));
                // Refresh the table
                //populateTable();
            }
        }
    }

    // Handle form submission
    document.getElementById('add-member-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Get form values
        const name = document.getElementById('member-name').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const designation = document.getElementById('member-degination').value;
        const email = document.getElementById('member-email').value;
        const contact = document.getElementById('member-contact').value;
        const password = document.getElementById('member-password').value;

        // Generate new member object
        const newMember = {
            srNo: members.length + 1,
            name,
            gender,
            designation,
            email,
            contact,
            password
        };

        // Add new member to the array and refresh the table
        members.push(newMember);
        // Save updated members to localStorage
        localStorage.setItem('members', JSON.stringify(members));
       // populateTable();

        // Show success message and reset the form
        document.getElementById('form-success-message').style.display = 'block';
        setTimeout(() => {
            document.getElementById('form-success-message').style.display = 'none';
        }, 3000);
        document.getElementById('add-member-form').reset();
    });

    // Populate the table on page load (if you want to add some initial data, you can do it here)
    //document.addEventListener('DOMContentLoaded', populateTable);




    async function getApprovedMember(collection){
        try{
            const response = await fetch("https://backend-server-ohpm.onrender.com/api/v1/get_approved_users");
            const responseJson = await response.json();
            if(collection=="student"){
                return responseJson[0];
            }
            else if(collection=="teacher"){
                return responseJson[1];
            }
            else{
                return responseJson[2];
            }
        }
        catch(error){
            console.log("error");
            alert(`${error} caused failure`);
        }

    }
    async function getNotApprovedMember(collection){
        try{
            const response = await fetch("https://backend-server-ohpm.onrender.com/api/v1/admin/get_pending_approval_users");
            const responseJson = await response.json();
            if(collection=="student"){
                return responseJson[0];
            }
            else if(collection=="teacher"){
                return responseJson[1];
            }
            else{
                return responseJson[2];
            }
        }
        catch(error){
            console.log("error");
            alert(`${error} caused failure`);
        }

    }




    

     // Function to display pending students
     async function displayStudents() {
        const students = await getNotApprovedMember("student");
        console.log(students);
        const tbody = document.querySelector('#studentTable tbody');
        tbody.innerHTML = ''; // Clear existing entries
        
        students.forEach((student, index) => {
           const row = document.createElement('tr');
           row.innerHTML = `
               <td>${index + 1}</td>
               <td>${student.name}</td>
               <td>${student.gender}</td>
               <td>${student.batch}</td>
               <td>${student.course}</td>
               <td>${student.mobile_no}</td>
               <td>${student.roll_no}</td>
               <td>${student.email}</td>
               <td>
                   <button class="approveStudentBtn" data-index="${index}">Approve</button>
                   <button class="deleteStudentBtn" data-index="${index}">Delete</button>
               </td>
           `;
           tbody.appendChild(row);
       });
   
       // Attach event listeners for the buttons
       document.querySelectorAll('.approveStudentBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               approveStudent(index);
           });
       });
   
       document.querySelectorAll('.deleteStudentBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               deleteStudent(index);
           });
       });
   }
   
   // Function to display approved students
   async function displayApprovedStudents() {
       const approvedStudents = await getApprovedMember("student");
       console.log(approvedStudents)
       const tbody = document.querySelector('#approvedStudents tbody');
       tbody.innerHTML = ''; // Clear existing entries
   
       approvedStudents.forEach((student, index) => {
           const row = document.createElement('tr');
           row.innerHTML = `
               <td>${index + 1}</td>
               <td>${student.name}</td>
               <td>${student.gender}</td>
               <td>${student.course}</td>
               <td>${student.batch}</td>
               <td>${student.roll_no}</td>
               <td>${student.email}</td>
               <td>${student.mobile_no}</td>
               <td><button class="deleteStudentBtn" data-index="${index}">Delete</button></td>
           `;
           tbody.appendChild(row);
       });
   
       document.querySelectorAll('.deleteStudentBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               deleteApprovedStudent(index);
           });
       });
   }
   
   // Function to delete a student
   function deleteStudent(index) {
       const students = JSON.parse(localStorage.getItem('students')) || [];
       students.splice(index, 1);
       localStorage.setItem('students', JSON.stringify(students));
       displayStudents(); // Refresh the displayed list
   }
   
   // Function to delete approved student
   function deleteApprovedStudent(index) {
       const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents')) || [];
       approvedStudents.splice(index, 1);
       localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));
       displayApprovedStudents();
   }
   
   // Function to approve a student
   function approveStudent(index) {
       const students = JSON.parse(localStorage.getItem('students')) || [];
       const approvedStudents = JSON.parse(localStorage.getItem('approvedStudents')) || [];
       const approvedStudent = students.splice(index, 1)[0]; // Move student to approved list
       approvedStudents.push(approvedStudent);
   
       // Save updated data to localStorage
       localStorage.setItem('students', JSON.stringify(students));
       localStorage.setItem('approvedStudents', JSON.stringify(approvedStudents));
   
       // Refresh both tables
       displayStudents();
       displayApprovedStudents();
   }
   
   
   // Function to display pending teachers
   async function displayTeachers() {
       const teachers = await getNotApprovedMember("teacher");
       console.log(teachers);
       const tbody = document.querySelector('#teacherTable tbody');
       tbody.innerHTML = ''; // Clear existing entries
   
       teachers.forEach((teacher, index) => {
           // Check if the teacher is valid and has the necessary properties
           if (teacher && teacher.name) { 
               const row = document.createElement('tr');
               row.innerHTML = `
                   <td>${index + 1}</td>
                   <td>${teacher.name}</td>
                   <td>${teacher.gender || 'N/A'}</td>
                   <td>${teacher.department || 'N/A'}</td>
                   <td>${teacher.designation || 'N/A'}</td>
                   <td>${teacher.email || 'N/A'}</td>
                   <td>${teacher.mobile_no || 'N/A'}</td>
                   <td>
                       <button class="approveTeacherBtn" data-index="${index}">Approve</button>
                       <button class="deleteTeacherBtn" data-index="${index}">Delete</button>
                   </td>
               `;
               tbody.appendChild(row);
           } else {
               console.warn('Teacher at index ${index} is null or missing name', teacher); // Log the problematic teacher entry
           }
       });
   
       // Attach event listeners for the buttons
       document.querySelectorAll('.approveTeacherBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               approveTeacher(index);
           });
       });
   
       document.querySelectorAll('.deleteTeacherBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               deleteTeacher(index);
           });
       });
   }
   
   // Function to display approved teachers
   async function displayApprovedTeachers() {
       const approvedTeachers = await getApprovedMember("teacher");
       console.log(approvedTeachers);
       const tbody = document.querySelector('#approvedTeachers tbody');
       tbody.innerHTML = ''; // Clear existing entries
   
       approvedTeachers.forEach((teacher, index) => {
           // Check if the teacher is valid and has the necessary properties
           if (teacher && teacher.name) {
               const row = document.createElement('tr');
               row.innerHTML = `
                   <td>${index + 1}</td>
                   <td>${teacher.name}</td>
                   <td>${teacher.gender || 'N/A'}</td>
                   <td>${teacher.department || 'N/A'}</td>
                   <td>${teacher.designation || 'N/A'}</td>
                   <td>${teacher.email || 'N/A'}</td>
                   <td>${teacher.mobile_no || 'N/A'}</td>
                   <td><button class="deleteTeacherBtn" data-index="${index}">Delete</button></td>
               `;
               tbody.appendChild(row);
           } else {
               console.warn('Approved teacher at index ${index} is null or missing name', teacher); // Log the problematic teacher entry
           }
       });
   
       document.querySelectorAll('.deleteTeacherBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               deleteApprovedTeacher(index);
           });
       });
   }
   
   // Function to approve a teacher
   function approveTeacher(index) {
       const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
       const approvedTeachers = JSON.parse(localStorage.getItem('approvedTeachers')) || [];
   
       if (teachers[index]) { // Ensure the teacher exists before trying to approve
           const approvedTeacher = teachers.splice(index, 1)[0]; // Move teacher to approved list
           approvedTeachers.push(approvedTeacher);
   
           // Save updated data to localStorage
           localStorage.setItem('teachers', JSON.stringify(teachers));
           localStorage.setItem('approvedTeachers', JSON.stringify(approvedTeachers));
   
           // Refresh both tables
           displayTeachers();
           displayApprovedTeachers();
       } else {
           console.error('No teacher found at index ${index}'); // Log an error if no teacher is found
       }
   }
   
   // Function to delete a teacher
   function deleteTeacher(index) {
       const teachers = JSON.parse(localStorage.getItem('teachers')) || [];
       teachers.splice(index, 1);
       localStorage.setItem('teachers', JSON.stringify(teachers));
       displayTeachers(); // Refresh the displayed list
   }
   
   // Function to delete approved teacher
   function deleteApprovedTeacher(index) {
       const approvedTeachers = JSON.parse(localStorage.getItem('approvedTeachers')) || [];
       approvedTeachers.splice(index, 1);
       localStorage.setItem('approvedTeachers', JSON.stringify(approvedTeachers));
       displayApprovedTeachers();
   }
   
   
   
   // Function to display pending staff
   async function displayStaff() {
       const staff = await getNotApprovedMember("staff");
       console.log(staff);
       const tbody = document.querySelector('#staffTable tbody');
       tbody.innerHTML = ''; // Clear existing entries
   
       staff.forEach((staffMember, index) => {
           const row = document.createElement('tr');
           row.innerHTML = `
               <td>${index + 1}</td>
               <td>${staffMember.name}</td>
               <td>${staffMember.gender || 'N/A'}</td>
               <td>${staffMember.department || 'N/A'}</td>
               <td>${staffMember.position || 'N/A'}</td>
               <td>${staffMember.email || 'N/A'}</td>
               <td>${staffMember.mobile_no || 'N/A'}</td>
               <td>
                   <button class="approveStaffBtn" data-index="${index}">Approve</button>
                   <button class="deleteStaffBtn" data-index="${index}">Delete</button>
               </td>
           `;
           tbody.appendChild(row);
       });
   
       // Attach event listeners for the buttons
       document.querySelectorAll('.approveStaffBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               approveStaff(index);
           });
       });
   
       document.querySelectorAll('.deleteStaffBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               deleteStaff(index);
           });
       });
   }
   // Function to display approved staff
   async function displayApprovedStaff() {
       const approvedStaff = await getApprovedMember("staff");
       console.log(approvedStaff);
       const tbody = document.querySelector('#approvedStaff tbody');
       tbody.innerHTML = ''; // Clear existing entries
   
       approvedStaff.forEach((staffMember, index) => {
           // Check if staffMember is defined
           if (staffMember && staffMember.name) {
               const row = document.createElement('tr');
               row.innerHTML = `
                   <td>${index + 1}</td>
                   <td>${staffMember.name}</td>
                   <td>${staffMember.gender || 'N/A'}</td>
                   <td>${staffMember.department || 'N/A'}</td>
                   <td>${staffMember.designation || 'N/A'}</td>
                   <td>${staffMember.email || 'N/A'}</td>
                   <td>${staffMember.mobile_no || 'N/A'}</td>
                   <td><button class="deleteStaffBtn" data-index="${index}">Delete</button></td>
               `;
               tbody.appendChild(row);
           } else {
               console.warn(`Approved staff member at index ${index} is null or missing name`, staffMember);
           }
       });
   
       document.querySelectorAll('.deleteStaffBtn').forEach(button => {
           button.addEventListener('click', function () {
               const index = this.dataset.index;
               deleteApprovedStaff(index);
           });
       });
   }
   
   // Function to delete a staff member
   function deleteStaff(index) {
       const staff = JSON.parse(localStorage.getItem('staff')) || [];
       staff.splice(index, 1);
       localStorage.setItem('staff', JSON.stringify(staff));
       displayStaff(); // Refresh the displayed list
   }
   
   // Function to delete approved staff member
   function deleteApprovedStaff(index) {
       const approvedStaff = JSON.parse(localStorage.getItem('approvedStaff')) || [];
       approvedStaff.splice(index, 1);
       localStorage.setItem('approvedStaff', JSON.stringify(approvedStaff));
       displayApprovedStaff();
   }
   function approveStaff(index) {
       const staff = JSON.parse(localStorage.getItem('staff')) || [];
       const approvedStaff= JSON.parse(localStorage.getItem('approvedStaff')) || [];
       const approvedStaffMember = staff.splice(index, 1)[0]; // Move student to approved list
       approvedStaff.push(approvedStaffMember);
   
       // Save updated data to localStorage
       localStorage.setItem('staff', JSON.stringify(staff));
       localStorage.setItem('approvedStaff', JSON.stringify(approvedStaff));
   
       // Refresh both tables
       displayStaff();
       displayApprovedStaff();
   }
   
   // Define a single function to initialize the display of all entities
   function initialize() {
       console.log("Intialized");
       displayStudents();          // Call to display students
       displayTeachers();          // Call to display teachers
       displayStaff();             // Call to display staff
       displayApprovedStudents();  // Call to display approved students
       displayApprovedTeachers();  // Call to display approved teachers
       displayApprovedStaff();     // Call to display approved staff
   }
   
   
   // Assign the initialize function to window.onload
   window.onload = initialize;
   
   // Handling student form submission
   document.getElementById('student-form').addEventListener('submit', function (event) {
       event.preventDefault();
   
       // Get values from the form
       const name = document.getElementById('student-name').value;
       const gender = document.querySelector('input[name="gender"]:checked').value;
       const course = document.getElementById('course').value;
       const batch = document.getElementById('batch').value;
       const roll_no = document.getElementById('roll-no').value;
       const email = document.getElementById('email').value;
       const mobile_no = document.getElementById('contact-number').value;
       const password = document.getElementById('password').value;
   
       const studentData = { name, gender, course, batch, roll_no, email, mobile_no,password };
   
       // Save the data to local storage
       const existingStudents = JSON.parse(localStorage.getItem('students')) || [];
       existingStudents.push(studentData);
       localStorage.setItem('students', JSON.stringify(existingStudents));
       
   
       // Show success message
       const successMessage = document.getElementById('success-message');
       successMessage.style.display = 'block';
   
       // Refresh the displayed students
       displayStudents();
   });
   
   // Handling teacher form submission
   document.getElementById('teacher-form').addEventListener('submit', function (event) {
       event.preventDefault();
   
       // Get values from the form
       const name = document.getElementById('teacher-name').value;
       const gender = document.querySelector('input[name="gender"]:checked').value;
       const department = document.getElementById('department').value;
       const designation = document.getElementById('designation').value;
       const email = document.getElementById('teacher-email').value;
       const mobile_no = document.getElementById('teacher-contact').value;
       const password = document.getElementById('password').value;
   
       const teacherData = { name, gender, department, designation, email, mobile_no, password };
   
       // Save the data to local storage
       const existingTeachers = JSON.parse(localStorage.getItem('teachers')) || [];
       existingTeachers.push(teacherData);
       localStorage.setItem('teachers', JSON.stringify(existingTeachers));
   
       // Show success message
       const successMessage = document.getElementById('success-message');
       successMessage.style.display = 'block';
   
       // Refresh the displayed teachers
       displayTeachers();
   });
   
   // Handling staff form submission
   document.getElementById('staff-form').addEventListener('submit', function (event) {
       event.preventDefault();
   
       // Get values from the form
       const name = document.getElementById('staff-name').value;
       const gender = document.querySelector('input[name="gender"]:checked').value;
       const department = document.getElementById('staff-department').value;
       const designation = document.getElementById('staff-designation').value; // Corrected from 'designation' to 'staff-designation'
       const email = document.getElementById('staff-email').value;
       const mobile_no = document.getElementById('staff-contact').value;
       const password = document.getElementById('password').value;
   
       const staffData = { name, gender, department, designation, email, mobile_no, password };
   
       // Save the data to local storage
       const existingStaff = JSON.parse(localStorage.getItem('staff')) || [];
       existingStaff.push(staffData);
       localStorage.setItem('staff', JSON.stringify(existingStaff));
   
       // Show success message
       const successMessage = document.getElementById('success-message');
       successMessage.style.display = 'block';
   
       // Refresh the displayed staff
       displayStaff();
    });
   
   
   
   
   
   