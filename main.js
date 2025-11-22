    // data par defaut 
    localStorage.removeItem("employees");
    let employees = JSON.parse(localStorage.getItem("employees")) || [
          {
      name: "Sophie Martin",
      role: "Manager",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
      email: "sophie.martin@company.com",
      number: "06 12 34 56 78",
      experiences: [
        {
          company: "Tech Solutions",
          position: "Senior Manager",
          start: "2020-01-15",
          end: "2024-03-20"
        },
        {
          company: "Digital Corp",
          position: "Team Lead",
          start: "2017-06-01",
          end: "2019-12-31"
        }
      ]
    },
    {
      name: "Lucas Dubois",
      role: "Technicien IT",
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
      email: "lucas.dubois@company.com",
      number: "06 23 45 67 89",
      experiences: [
        {
          company: "IT Services Pro",
          position: "IT Technician",
          start: "2019-03-10",
          end: "2024-01-15"
        }
      ]
    },
    {
      name: "Emma Bernard",
      role: "Réceptionniste",
      photo: "https://randomuser.me/api/portraits/women/65.jpg",
      email: "emma.bernard@company.com",
      number: "06 34 56 78 90",
      experiences: [
        {
          company: "Hotel Plaza",
          position: "Receptionist",
          start: "2018-09-01",
          end: "2023-12-20"
        },
        {
          company: "Office Central",
          position: "Front Desk",
          start: "2016-05-15",
          end: "2018-08-30"
        }
      ]
    },
];

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


    const listContainer = document.getElementById('assignModal');
      
    function displayEmployeeSelection(){
    const listContainer = document.getElementById('employeeSelectionList');
    listContainer.innerHTML = ''; 
    
    employees.forEach((employee, index) => {
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
            <p class="text-sm text-blue-600">${employee.role}</p>
            <p class="text-xs text-gray-500">${employee.email}</p>
          </div>
          <button 
            onclick="event.stopPropagation(); assignEmployee(${index})"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Assign
          </button>
        </div>
      `;
     
      listContainer.appendChild(card);

      
    
    });
   
  }
    

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
          displayEmployeeSelection();
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
localStorage.setItem("employees", JSON.stringify(employees)); // ✅ CORRECT - save the array
displayEmployees(); // Refresh the employee list
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
                    <p class="text-xs text-blue-600 font-medium">${employee.role}</p>
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
      const room = document.getElementById(currentRoomId);

      if(!room){
          console.error('Room not found with ID:', currentRoomId);
          alert('error in the condition !room');
          return ;
      }

      if(employeAssignments[empId]){
          const previousRoom = employeAssignments[empId]; 
          const confirmation = confirm(`${employee.name} is currently in ${previousRoom}, move them to ${currentRoomId}?`);

          if(!confirmation){
              return ; 
          }

          const oldRoom = document.getElementById(previousRoom); 
          if(oldRoom){
              const oldCard = document.querySelector(`[data-type-id = "${empId}"]`);
              if(oldCard){
                  oldCard.remove();
              }
          }
      }

      console.log(room);
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
          <p class="text-xs text-gray-600">${employee.role}</p>
        </div>
        <button 
          onclick="event.stopPropagation(); unassignEmployee(${empId}, '${currentRoomId}')"
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

    if(card){
      card.remove(); 
      delete employeAssignments[empId];
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
    if(employe.experiences  && employe.experiences.lenght > 0){
    experiencesPart = employe.experiences.map(exp => `
       <div class="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
        <div class="flex justify-between items-start mb-2">
          <h4 class="font-semibold text-gray-800">${exp.position}</h4>
          <span class="text-xs text-gray-500 bg-white px-2 py-1 rounded">${exp.start} - ${exp.end}</span>
        </div>
        <p class="text-sm text-gray-600">${exp.company}</p>
      </div>
      `).join(''); 
  }else {
    experiencesPart = '<p class="text-gray-500 text-sm italic">No professional experience listed</p>';
  }

console.log(employe);
   detailsContent.innerHTML = `
   <div class="flex flex-col items-center mb-6 pb-6 border-b">
      <img 
        src="${employe.photo}" 
        alt="${employe.name}"
        class="w-32 h-32 rounded-full object-cover border-4 border-blue-500 shadow-lg mb-4"
        onerror="this.src='https://via.placeholder.com/128'"
      >
      <h2 class="text-2xl font-bold text-gray-800 mb-1">${employe.name}</h2>
      <p class="text-lg text-blue-600 font-semibold mb-2">${employe.role}</p>
      <div class="flex items-center gap-2 text-sm">
        <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
          📍 ${assignedRoom}
        </span>
      </div>
    </div>

    <div class="mb-6 pb-6 border-b">
      <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        Contact Information
      </h3>
      <div class="space-y-3">
        <div class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
          </svg>
          <div>
            <p class="text-xs text-gray-500">Email</p>
            <a href="mailto:${employe.email}" class="text-sm text-blue-600 hover:underline">${employe.email}</a>
          </div>
        </div>
        <div class="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
          </svg>
          <div>
            <p class="text-xs text-gray-500">Phone</p>
            <a href="tel:${employe.number}" class="text-sm text-blue-600 hover:underline">${employe.number}</a>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
        <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        Professional Experience
      </h3>
      <div class="space-y-3">
        ${experiencesPart}
      </div>
    </div>

    <div class="flex gap-3 pt-4 border-t">
      ${assignedRoom === 'Not assigned' ? `
        <button
          onclick="closeDetailsModal(); showAssignModal('conference')"
          class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-semibold"
        >
          Assign to Room
        </button>
      ` : `
        <button
          onclick="unassignEmployee(${emp}, '${assignedRoom}'); closeDetailsModal();"
          class="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-semibold"
        >
          Remove from ${assignedRoom}
        </button>
      `}
      <button
        onclick="closeDetailsModal()"
        class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
      >
        Close
      </button>
    </div>
  `;
 
}

function closeDetailsModal() {
    const detailsModal = document.getElementById('detailsModal');
    detailsModal.classList.add('hidden');
    detailsModal.classList.remove('flex');
}

