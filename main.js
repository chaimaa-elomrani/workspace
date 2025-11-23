    // data par defaut 
    localStorage.removeItem("employees");
    let employees = [];


    function getRoleName(roleId){
    if(!rolesList.length) return "Loading...";
    const found = rolesList.find(e => e.id == roleId);
    return found? found.name: "undefined";
}


    async function fetchEmployees(){
        return fetch('data.json')
        .then(
            response => response.json()
        )
        .then(data => employees = data.employees);
    }

    
  async function fetchingRoles(){
    return fetch('roles.json')
        .then(response => {
            return response.json(); 
        })
    .then(data => {
        rolesList = data.roles;
    const roles = document.getElementById('role');
    roles.innerHTML= `<option value="">Sélectionner un rôle</option>`;
    console.log(roles);
    data.roles.forEach((item) => {
        const option = document.createElement('option');
        option.value = item.id ;
        option.textContent = item.name; 
        roles.appendChild(option); 
    });
    });
    
    displayEmployees(); 

}

fetchingRoles();
    

async function init(){
    await Promise.all([fetchingRoles(), fetchEmployees()]);
    displayEmployees();
}

init();
  localStorage.setItem("employees", JSON.stringify(employees));



    // sidebar
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('menuBtn');
    const closebtn = document.getElementById('closebtn');

    function toggleSidebar() {
      sidebar.classList.remove('hidden');
      setTimeout(() => {
        sidebar.classList.add('visible');
      }, 10);
    }

    function closeSidebar() {
      sidebar.classList.remove('visible');
      setTimeout(() => {
        sidebar.classList.add('hidden');
      }, 300);
    }


 
       const rooms = [
        { id: 'conferences', name: 'conferences', allowedRoles: [ 'Invited', 'Cleaning Staff', 'Manager'], capacity: 5, assigned: []},
        { id: 'reception', name: 'reception', allowedRoles: ['Receptionist', 'Cleaning Staff' , 'Manager'] , capacity: 3, assigned: []},
        { id: 'servers', name: 'servers', allowedRoles: ['IT Staff', 'Cleaning Staff' , 'Manager'],capacity: 4, assigned: [] },
        { id: 'security', name: 'security', allowedRoles: ['security' ,'Cleaning Staff' , 'Manager'],capacity: 2, assigned: []},
        { id: 'staff', name: 'staff', allowedRoles: ['security' , 'Invited', 'Cleaning Staff', 'Manager','IT Staff','Receptionist'],capacity: 6, assigned: []},
        { id: 'archive', name: 'archive', allowedRoles: ['Manager'],capacity: 1, assigned: []},
      ];    
 

    const listContainer = document.getElementById('assignModal');

    
    function displayEmployeeSelection(roomId){  
    const listContainer = document.getElementById('employeeSelectionList');
    listContainer.innerHTML = ''; 
    
    const room = rooms.find(room => room.id === roomId);
    if(!room) return ; 

    const allowedEmployees = employees.filter(e => {
        const roleName = getRoleName(e.role);
        
        return room.allowedRoles.includes(roleName);
    });


    allowedEmployees.forEach((employee, index) => {
      const card = document.createElement('div');
      card.className = 'bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer';
      card.innerHTML = `
        <div class="flex items-center gap-4">
          <img 
            src="${employee.photo}" 
            alt="${employee.name}"
            class="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            onerror="this.src='https://via.placeholder.com/64'"
          >
          <div class="flex-1" onclick = "details(${index})">
            <h4 class="font-semibold text-gray-800">${employee.name}</h4>
            <p class="text-sm text-blue-600">${getRoleName(employee.role)}</p>
            <p class="text-xs text-gray-500">${employee.email}</p>
          </div>
          <button 
            onclick="assignEmployee(${index})"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Assign
          </button>
        </div>
      `;
     
      listContainer.appendChild(card);

      
    
    });
   
  }

  
let rolesList = []; 

    

    // assign userform
      const modal = document.getElementById("modal");
      function showForm() {
          modal.classList.remove("hidden");
          modal.classList.add("block");
        }
        
        function closeModal() {
            modal.classList.remove("block");
            modal.classList.add("hidden");
        }
        
        const assignModal = document.getElementById('assignModal');
        let currentRoomId = 'test' ; 

         function showAssignModal(roomId){
            currentRoomId = roomId;
            const roomName = document.getElementById('assignRoomName');
            roomName.textContent = roomId; 
          assignModal.classList.remove("hidden"); 
          displayEmployeeSelection(roomId);
        }

         function closeAssignModal(){
          assignModal.classList.add("hidden"); 
        }


        // img prev in the form 
         document.getElementById("photo").addEventListener("input", (e) => {
          const url = e.target.value;
          const profile = document.getElementById("photoPreview");
          profile.innerHTML = `<img src="${url}" alt="profile" class="w-16 h-16 text-gray-400">`;
        });


       const form = document.getElementById("userForm");
        const Fullname = document.getElementById("fullName");
        const role = document.getElementById("role");
        const photo = document.getElementById("photo");
        const email = document.getElementById("email");
        const number = document.getElementById("number");

      form.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;

      const name = document.getElementById('fullName').value;
      if (!validateName(name)) {
          document.getElementById('nameError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('nameError').classList.add('hidden');
      }

      const emailValue = document.getElementById('email').value;
      if (!validateEmail(emailValue)) {
          document.getElementById('emailError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('emailError').classList.add('hidden');
      }

      const phoneValue = document.getElementById('number').value;
      if (!validatePhone(phoneValue)) {
          document.getElementById('phoneError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('phoneError').classList.add('hidden');
      }

      const photoUrl = document.getElementById('photo').value;
      if (!isValidUrl(photoUrl)) {
          document.getElementById('photoError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('photoError').classList.add('hidden');
      }

      if (!isValid) return;

      const submitedData = {
          name,
          role: role.value,
          photo: photoUrl,
          email: emailValue,
          number: phoneValue,
          experiences: []
      };

      const expGroups = document.querySelectorAll("#experiencesContainer > div");
      expGroups.forEach((exp) => {
          const company = exp.querySelector('input[name^="exp_company_"]').value;
          const position = exp.querySelector('input[name^="exp_position_"]').value;
          const start = exp.querySelector('input[name^="exp_start_"]').value;
          const end = exp.querySelector('input[name^="exp_end_"]').value;

          submitedData.experiences.push({ company, position, start, end });
      });

   employees.push(submitedData);
   console.log(submitedData);
   localStorage.setItem("employees", JSON.stringify(employees)); 
   displayEmployees(); 
   console.log(employees); 

      form.reset();
      document.getElementById("experiencesContainer").innerHTML = "";
      document.getElementById("photoPreview").innerHTML = `
          <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
      `;

        form.reset();
      closeModal();
    });
        
    let experienceCounter = 0;

    // Experiences
    document
        .getElementById("addExperience")
        .addEventListener("click", (e) => {
        experienceCounter++;
        const exp_container = document.getElementById(
            "experiencesContainer"
        );
        const content = document.createElement("div");
        content.className = "bg-gray-50 p-4 rounded-lg space-y-3 relative";
        content.innerHTML = `
            <button type="button" class="absolute top-2 right-2 text-red-500 hover:text-red-700 remove-exp" data-exp="${experienceCounter}">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
            </button>

            <input 
            type="text" 
            name="exp_company_${experienceCounter}"
            class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Entreprise"
            required
            >

            <input 
            type="text" 
            name="exp_position_${experienceCounter}"
            class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Poste occupé"
            required
            >

            <div class="grid grid-cols-2 gap-3">
            <div>
                <label class="block text-xs text-gray-600 mb-1">Date de début</label>
                <input 
                type="date" 
                name="exp_start_${experienceCounter}"
                class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 exp-start"
                required
                >
            </div>
            <div>
                <label class="block text-xs text-gray-600 mb-1">Date de fin</label>
                <input 
                type="date" 
                name="exp_end_${experienceCounter}"
                class="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 exp-end"
                data-start="exp_start_${experienceCounter}"
                required
                >
                <span class="text-red-500 text-xs mt-1 hidden date-error">La date de fin doit être après la date de début</span>
            </div>
            </div>
        `;
        exp_container.appendChild(content);
        });

         document.addEventListener('click', (e) =>{
            if(e.target.closest('.remove-exp')){
              e.target.closest('.bg-gray-50').remove();
            }
          });

           function isValidUrl(string) {
              try {
                  new URL(string);
                  return true;
              } catch (_) {
                  return false;
              }
          }

            function validateName(name) {
              const regex = /^[a-zA-ZÀ-ÿ\s]{2,}$/;
              return regex.test(name);
          }

          function validateEmail(email) {
              const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              return regex.test(email);
          }

          function validatePhone(phone) {
              const regex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
              return regex.test(phone.replace(/\s/g, ''));
          }


   function displayEmployees() {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    if (employees.length === 0) {
        usersList.innerHTML = '<div class="text-center text-gray-400 text-sm py-8">No team members yet</div>';
        return;
    }
    
    employees.forEach((employee, index) => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow d uration-300 p-2 border border-gray-200 hover:border-blue-400 cursor-pointer';
        
        card.innerHTML = `
            <div onclick = "details(${index})" class="flex items-center gap-3 mb-3">
                <img 
                    src="${employee.photo}" 
                    alt="${employee.name}"
                    class="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
                    onerror="this.src='https://via.placeholder.com/56'"
                >
                <div class="flex-1">
                    <h3 class="font-semibold text-gray-800 text-sm">${employee.name}</h3>
                    <p class="text-xs text-blue-600 font-medium">${getRoleName(employee.role)}</p>
                </div>
            </div>  
        `;
        usersList.appendChild(card); 

    });
}



displayEmployees();
// assigning employes 
  const employeAssignments = {}; 

  function assignEmployee(empId){
    const employee = employees[empId];
    const room  = document.getElementById(currentRoomId);
    const roomData = rooms.find(r => r.id === currentRoomId);   

    if (!room) {
        console.error('Room not found with ID:', currentRoomId);
        alert('Error: Room element not found!');
        return;
    }

    if (!roomData) {
        console.error('Room data not found:', currentRoomId);
        return;
    }
    

      if(employeAssignments[empId]){
          const previousRoom = employeAssignments[empId]; 
          const confirmation = confirm(`${employee.name} is currently in ${previousRoom}, move them to ${currentRoomId}?`);

          if(!confirmation){
              return ; 
          }

        //   removing the person from assigned array to not mess up with the capacity later
          const oldRoomData = rooms.find(r => r.id === previousRoom);
          if(oldRoomData){
            const index = oldRoomData.assigned.indexOf(empId);
            if(index > -1){
                oldRoomData.assigned.splice(index,1);
                console.log(`Removed from ${previousRoom}. Now has ${oldRoomData.assigned.length}/${oldRoomData.capacity}`);
            }
          }

          const oldRoom = document.getElementById(previousRoom); 
          if(oldRoom){
              const oldCard = document.querySelector(`[data-type-id = "${empId}"]`);
              if(oldCard){
                  oldCard.remove();
              }
          }
      }

      if(roomData.assigned.length >= roomData.capacity){
        alert(`Cannot assign to ${currentRoomId}. Room is at full capacity (${roomData.assigned.length}/${roomData.capacity})`);
        return ;
    }

     roomData.assigned.push(empId);
     console.log('added in the assigned array');

      
      const empCard = document.createElement('div');
      empCard.className = 'absolute bottom-2 left-2 bg-white rounded-lg shadow-lg p-2';
      empCard.setAttribute('data-type-id' , empId); 
      empCard.innerHTML = `
          <div class="flex items-center gap-2">
        <img 
          src="${employee.photo}" 
          alt="${employee.name}"  
          class="w-10 h-10 rounded-full object-cover"
        >
       <div class="flex-1" >
          <p  class="text-xs font-semibold text-gray-800 cursor-pointer hover:text-blue-600">${employee.name}</p>
          <p class="text-xs text-gray-600">${getRoleName(employee.role)}</p>
        </div>
        <button 
          onclick=" unassignEmployee(${empId}, '${currentRoomId}')"
          class="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center shadow-md transition-all duration-200 hover:scale-110"
          title="Remove ${employee.name} from ${currentRoomId}"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      `;

      room.style.position = 'relative';
      room.appendChild(empCard);
      employeAssignments[empId] = currentRoomId; 
      closeAssignModal(); 

  }


//   unassign employe 
 function unassignEmployee(empId, roomId){
    const room = document.getElementById(roomId);
    const card = room.querySelector(`[data-type-id = "${empId}"]`); 
    const roomData = rooms.find(r => r.id === roomId);

    if(card){
      card.remove(); 
      delete employeAssignments[empId];
      
      if(roomData){
          const index = roomData.assigned.indexOf(empId);
          console.log('removed ')
        }
        console.log('removed successfuly');
    }
  }
  



 function details(emp) {
  const detailsModal = document.getElementById('detailsModal');
    detailsModal.classList.remove('hidden');
    detailsModal.classList.add('flex');
//  console.log(employees[emp]);
    const employe = employees[emp];
    const detailsContent = document.getElementById('detailsContent');
    const  assignedRoom = employeAssignments[emp] || 'walloooooooooo';
    let experiencesPart = '' ;
    if(employe.experiences  && employe.experiences.length > 0){
    experiencesPart = employe.experiences.map(exp => `
       <div class="space-y-3">
            <div class=" p-4 ">
                <div class="flex justify-between items-start mb-2">
                  <h4 class="font-semibold text-gray-800">${exp.position}</h4>
                  <span class="text-xs text-gray-500 bg-white px-2 py-1 rounded">${exp.start} - ${exp.end}</span>
                </div>
                <p class="text-sm text-gray-600">${exp.company}</p>
              </div> 
        </div>
      `).join(''); 
  }else {
    experiencesPart = '<p class="text-gray-500 text-sm italic">No professional experience listed</p>';
  }

console.log(employe);
   detailsContent.innerHTML = `
   <div class="flex items-center gap-4 pb-6 border-b">
        <img
          src="${employe.photo}"
          class="w-20 h-20 rounded-full object-cover border border-gray-300 shadow-sm"
        >
        <div>
          <h2 class="text-2xl font-semibold text-gray-900">${employe.name}</h2>
          <p class="text-gray-600 text-sm">${getRoleName(employe.role)}</p>
        </div>
      </div>

      <div class="space-y-4 pb-6 border-b">
        <h3 class="text-lg font-semibold text-gray-900">Contact Information</h3>

        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 12H8m8 0l-4 4m4-4l-4-4M4 6h16M4 18h16"/>
          </svg>
          <span class="text-gray-700 text-sm">${employe.email}</span>
        </div>

        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 5a2 2 0 012-2h3.28L10 9l-2.28 1.14a10 10 0 005.58 5.58L15 14l5 1.72A2 2 0 0122 18v1a2 2 0 01-2 2h-1C9.16 21 3 14.84 3 7V5z"/>
          </svg>
          <span class="text-gray-700 text-sm">${employe.number}</span>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-900">Professional Experience</h3>
        <p class="text-gray-700 text-sm"></p>
        ${experiencesPart}
      </div>

     </div>
   </div>
  `;
 
}

function closeDetailsModal() {
    const detailsModal = document.getElementById('detailsModal');
    detailsModal.classList.add('hidden');
    detailsModal.classList.remove('flex');
}





// filter function
function filterByRole(roleId) {
    const filtered = employees.filter(e => e.role == roleId);
    console.log(filtered);
    return filtered;
};

console.log(filterByRole(4));
