(function(){
    function populateProfiles() {
        let dropdown = document.getElementById('profiles');
        removeOptions(dropdown);
        for(let i of Object.entries(profiles)) {
            let node = window.document.createElement('option');
            node.text = i[0];
            dropdown.appendChild(node);
        }
    }

    function populateChecklists() {
        let currentProfile = document.getElementById('profiles').value;
        let checklist = profiles[currentProfile];
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        for(let i of checkboxes) {
            if(checklist.includes(i.getAttribute('id')))
                i.checked = true;
            else
                i.checked = false;
        }
    }

    function removeOptions(select) {
        while(select.firstChild) {
            select.removeChild(select.firstChild);
        }
    }

    function removeProfile() {
        let currentProfile = document.getElementById('profiles').value;
        delete profiles[currentProfile];
        setProfiles();
        populateProfiles();
    }

    function getProfiles() {
        return JSON.parse(window.localStorage.getItem('profiles'));
    }

    function setProfiles() {
        window.localStorage
            .setItem('profiles', JSON.stringify(profiles));
    }

    function watchClicks() {
        document.getElementById('profileAdd')
            .addEventListener('click', addProfile);
        document.getElementById('profileRemove')
            .addEventListener('click', removeProfile);
        document.getElementById('profiles')
            .addEventListener('change', populateChecklists);

        let checkboxes = document.querySelectorAll('input[type=checkbox]');

        for(let i of checkboxes) {
            i.addEventListener('change', saveCheckbox);
        }
    }

    function saveCheckbox() {
        let checkboxes = document.querySelectorAll('input[type=checkbox]');
        let currentProfile = document.getElementById('profiles').value;
        let tasksCompleted = [];
        for(let i of checkboxes) {
            if(i.checked)
                tasksCompleted.push(i.getAttribute('id'));
        }
        profiles[currentProfile] = tasksCompleted;
        setProfiles();
    }

    function addProfile(event) {
        document.getElementById('profileAddText')
            .setAttribute('style', 'visibility: visible');
        document.getElementById('profileAdd')
            .removeEventListener('click', addProfile);
        document.getElementById('profileAdd')
            .innerHTML = 'Save Profile';
        document.getElementById('profileAdd')
            .addEventListener('click', saveProfile);
    }

    function saveProfile() {
        let newProfileName = document.getElementById('profileAddText').value;
        profiles[newProfileName] = [];
        setProfiles();
        populateProfiles();
        document.getElementById('profiles').value = newProfileName;
        populateChecklists();
        document.getElementById('profileAddText')
            .setAttribute('style', 'visibility: hidden');
        document.getElementById('profileAddText')
            .value = '';
        document.getElementById('profileAdd')
            .removeEventListener('click', saveProfile);
        document.getElementById('profileAdd')
            .addEventListener('click', addProfile);
        document.getElementById('profileAdd')
            .innerHTML = 'Add Profile';
    }

    let profiles = getProfiles();

    if(!profiles || Object.keys(profiles).length === 0)
        profiles = {'default': []};

    populateProfiles();
    populateChecklists();

    watchClicks();

})();
