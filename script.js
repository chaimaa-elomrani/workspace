        const modal = document.getElementById("modal");
        const assignModal = document.getElementById('assignModal');
        function showForm() {
          modal.classList.remove("hidden");
          modal.classList.add("block");
        }

        function closeModal() {
          modal.classList.remove("block");
          modal.classList.add("hidden");
        }


        let currentRoomId = 'test' ; 

        function showAssignModal(roomId){
            currentRoomId = roomId;
            const test = document.getElementById('assignRoomName');
            test.textContent = roomId; 
          assignModal.classList.remove("hidden"); 
          displayEmployeeSelection();
        }
        
        function closeAssignModal(){
          assignModal.classList.add("hidden"); 
        }

        // Image preview
        document.getElementById("photo").addEventListener("input", (e) => {
          const url = e.target.value;
          const profile = document.getElementById("photoPreview");
          profile.innerHTML = `<img src="${url}" alt="profile" class="w-16 h-16 text-gray-400">`;
        });

        const employers = [
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
    {
      name: "Thomas Petit",
      role: "Agent de sécurité",
      photo: "https://randomuser.me/api/portraits/men/52.jpg",
      email: "thomas.petit@company.com",
      number: "06 45 67 89 01",
      experiences: [
        {
          company: "SecurGuard",
          position: "Security Officer",
          start: "2015-02-01",
          end: "2024-02-28"
        }
      ]
    },
    {
      name: "Julie Moreau",
      role: "Développeur",
      photo: "https://randomuser.me/api/portraits/women/28.jpg",
      email: "julie.moreau@company.com",
      number: "06 56 78 90 12",
      experiences: [
        {
          company: "WebDev Agency",
          position: "Full Stack Developer",
          start: "2021-04-01",
          end: "2024-03-15"
        },
        {
          company: "StartupTech",
          position: "Junior Developer",
          start: "2019-07-15",
          end: "2021-03-30"
        }
      ]
    }
        ];
        const form = document.getElementById("userForm");
        const Fullname = document.getElementById("fullName");
        const role = document.getElementById("role");
        const photo = document.getElementById("photo");
        const email = document.getElementById("email");
        const number = document.getElementById("number");

      form.addEventListener("submit", (event) => {
      event.preventDefault();
      let isValid = true;

      // Full name
      const name = document.getElementById('fullName').value;
      if (!validateName(name)) {
          document.getElementById('nameError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('nameError').classList.add('hidden');
      }

      // Email
      const emailValue = document.getElementById('email').value;
      if (!validateEmail(emailValue)) {
          document.getElementById('emailError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('emailError').classList.add('hidden');
      }

      // Phone
      const phoneValue = document.getElementById('number').value;
      if (!validatePhone(phoneValue)) {
          document.getElementById('phoneError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('phoneError').classList.add('hidden');
      }

      // Photo
      const photoUrl = document.getElementById('photo').value;
      if (!isValidUrl(photoUrl)) {
          document.getElementById('photoError').classList.remove('hidden');
          isValid = false;
      } else {
          document.getElementById('photoError').classList.add('hidden');
      }

      if (!isValid) return;

      // Build data
      const submitedData = {
          name,
          role: role.value,
          photo: photoUrl,
          email: emailValue,
          number: phoneValue,
          experiences: []
      };

      // Experiences
      const expGroups = document.querySelectorAll("#experiencesContainer > div");
      expGroups.forEach((exp) => {
          const company = exp.querySelector('input[name^="exp_company_"]').value;
          const position = exp.querySelector('input[name^="exp_position_"]').value;
          const start = exp.querySelector('input[name^="exp_start_"]').value;
          const end = exp.querySelector('input[name^="exp_end_"]').value;

          submitedData.experiences.push({ company, position, start, end });
      });

      employers.push(submitedData);
      console.log(employers);

      // displayEmployees();

      form.reset();
      document.getElementById("experiencesContainer").innerHTML = "";
      document.getElementById("photoPreview").innerHTML = `
          <svg class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
          </svg>
      `;

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




  // const detailsModal = document.getElementById("detailsModal");

        
  function displayEmployees() {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    employers.forEach((employee, index) => {
      const card = document.createElement('div');
      card.className = 'bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-2 border border-gray-200 hover:border-blue-400 cursor-pointer';
      
      card.innerHTML = `
        <div class="flex items-center gap-3 mb-3">
          <img 
            src="${employee.photo}" 
            alt="${employee.name}"
            class="w-14 h-14 rounded-full object-cover border-2 border-blue-500"
            onerror="this.src='https://via.placeholder.com/56'"
          >
          <div class="flex-1">
            <h3 id= 'title' class="font-semibold text-gray-800 text-sm">${employee.name}</h3>
            <p class="text-xs text-blue-600 font-medium">${employee.role}</p>
          </div>
        </div>  
      `;
      
  
   card.addEventListener('click', ()=>{
  //  console.error('hdbnpon');
    detailsModal.classList.remove("hidden");
  detailsModal.classList.add("block");
      });

      usersList.appendChild(card);
    });
  }
      displayEmployees();

      
    const listContainer = document.getElementById('assignModal');
      
    function displayEmployeeSelection(){
    const listContainer = document.getElementById('employeeSelectionList');
    listContainer.innerHTML = ''; // Clear previous content
    
    employers.forEach((employee, index) => {
      const card = document.createLElement('div');
      card.className = 'bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer';
      card.innerHTML = `
        <div class="flex items-center gap-4">
          <img 
            src="${employee.photo}" 
            alt="${employee.name}"
            class="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            onerror="this.src='https://via.placeholder.com/64'"
          >
          <div class="flex-1">
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
          

  const employeAssignments = {}; 
  function assignEmployee(empId){
      const employee = employers[empId];
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

  function unassignEmployee(empId, roomId){
    const room = document.getElementById(roomId);
    const card = room.querySelector(`[data-type-id = "${empId}"]`); 

    if(card){
      card.remove(); 
      delete employeAssignments[empId];
      console.log('removed successfuly');
    }
  }
  

  const detailsModal = document.getElementById("detailsModal");
 function showDetailsModal(employee) {
  const detailsContent = document.getElementById("detailsContent");

  detailsContent.innerHTML = `
      <div class="text-center mb-6">
        <img src="${employee.photo}" class="w-24 h-24 rounded-full object-cover border-4 border-blue-500 mx-auto mb-4">
        <h2 class="text-3xl font-bold">${employee.name}</h2>
        <p class="text-lg text-blue-600 font-semibold mt-2">${employee.role}</p>
      </div>
  `;

 
}

  
  function closeDetailsModal() {
    detailsModal.classList.add("hidden");
    detailsModal.classList.remove("block");
  }

