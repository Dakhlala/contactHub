var avatarColors = [
  "#2563eb",
  "#5d35f8",
  "#f97316",
  "#16a34a",
  "#ec4899",
  "#0891b2",
];

var groupClassMap = {
  family: "tag-family",
  friends: "tag-friends",
  work: "tag-work",
  school: "tag-school",
  other: "tag-other",
};

var groupLabelMap = {
  family: "Family",
  friends: "Friends",
  work: "Work",
  school: "School",
  other: "Other",
};

var addContactModal = new bootstrap.Modal(
  document.getElementById("addContactModal"),
);

// ---------------- Regex validators ----------------

function isValidName(name) {
  var pattern = /^[a-zA-Z\s]{2,50}$/;
  return pattern.test(name);
}

function isValidPhone(phone) {
  var pattern = /^01[0125][0-9]{8}$/;
  return pattern.test(phone);
}

function isValidEmail(email) {
  if (email === "") {
    return true;
  }
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}


function getContacts() {
  var raw = localStorage.getItem("contacts");
  if (!raw) {
    return [];
  }
  return JSON.parse(raw);
}

function saveContactsToStorage(contacts) {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}


function getColorForContact(name) {
  var code = name.trim().toUpperCase().charCodeAt(0) || 0;
  var index = code % avatarColors.length;
  return avatarColors[index];
}

function getInitial(name) {
  return name.trim().charAt(0).toUpperCase();
}

function generateId() {
  return Date.now().toString();
}

// ---------------- Live validation helpers ----------------

function clearNameError() {
  document.getElementById("nameInput").classList.remove("is-invalid");
  document.getElementById("nameError").classList.remove("show");
  document.getElementById("nameError").textContent = "";
}

function clearPhoneError() {
  document.getElementById("phoneInput").classList.remove("is-invalid");
  document.getElementById("phoneError").classList.remove("show");
  document.getElementById("phoneError").textContent = "";
}

function clearEmailError() {
  document.getElementById("emailInput").classList.remove("is-invalid");
  document.getElementById("emailError").classList.remove("show");
  document.getElementById("emailError").textContent = "";
}

function showNameError() {
  document.getElementById("nameInput").classList.add("is-invalid");
  var err = document.getElementById("nameError");
  err.textContent = "Name should contain only letters and spaces (2-50 characters)";
  err.classList.add("show");
}

function showPhoneError() {
  document.getElementById("phoneInput").classList.add("is-invalid");
  var err = document.getElementById("phoneError");
  err.textContent = "Please enter a valid Egyptian phone number";
  err.classList.add("show");
}

function showEmailError() {
  document.getElementById("emailInput").classList.add("is-invalid");
  var err = document.getElementById("emailError");
  err.textContent = "Please enter a valid email address";
  err.classList.add("show");
}

function validateNameInput() {
  var name = document.getElementById("nameInput").value.trim();
  if (name === "") {
    clearNameError();
    return;
  }
  if (!isValidName(name)) {
    showNameError();
  } else {
    clearNameError();
  }
}

function validatePhoneInput() {
  var phone = document.getElementById("phoneInput").value.trim();
  if (phone === "") {
    clearPhoneError();
    return;
  }
  if (!isValidPhone(phone)) {
    showPhoneError();
  } else {
    clearPhoneError();
  }
}

function validateEmailInput() {
  var email = document.getElementById("emailInput").value.trim();
  if (email === "") {
    clearEmailError();
    return;
  }
  if (!isValidEmail(email)) {
    showEmailError();
  } else {
    clearEmailError();
  }
}


function getFormValues() {
  return {
    index: document.getElementById("editContactId").value,
    name: document.getElementById("nameInput").value.trim(),
    phone: document.getElementById("phoneInput").value.trim(),
    email: document.getElementById("emailInput").value.trim(),
    address: document.getElementById("addressInput").value.trim(),
    group: document.getElementById("groupInput").value,
    notes: document.getElementById("notesInput").value.trim(),
    favorite: document.getElementById("favoriteCheck").checked,
    emergency: document.getElementById("emergencyCheck").checked,
  };
}

function validateForm(values) {
  var isValid = true;

  if (!isValidName(values.name)) {
    showNameError();
    isValid = false;
  } else {
    clearNameError();
  }

  if (!isValidPhone(values.phone)) {
    showPhoneError();
    isValid = false;
  } else {
    clearPhoneError();
  }

  if (!isValidEmail(values.email)) {
    showEmailError();
    isValid = false;
  } else {
    clearEmailError();
  }

  return isValid;
}

function resetContactForm() {
  document.getElementById("addContactForm").reset();
  document.getElementById("editContactId").value = "";
  clearNameError();
  clearPhoneError();
  clearEmailError();
}

function setFormValues(contact, index) {
  document.getElementById("editContactId").value = index;
  document.getElementById("nameInput").value = contact.name;
  document.getElementById("phoneInput").value = contact.phone;
  document.getElementById("emailInput").value = contact.email;
  document.getElementById("addressInput").value = contact.address;
  document.getElementById("groupInput").value = contact.group;
  document.getElementById("notesInput").value = contact.notes;
  document.getElementById("favoriteCheck").checked = contact.favorite;
  document.getElementById("emergencyCheck").checked = contact.emergency;
}



function getContactByIndex(index, contacts) {
  if (index < 0 || index >= contacts.length) {
    return null;
  }
  return contacts[index];
}

function getRealIndexInContacts(contact, contacts) {
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i] === contact) {
      return i;
    }
  }
  return -1;
}

function addNewContact(values) {
  var contacts = getContacts();
  var contact = {
    id: generateId(),
    name: values.name,
    phone: values.phone,
    email: values.email,
    address: values.address,
    group: values.group,
    notes: values.notes,
    favorite: values.favorite,
    emergency: values.emergency,
  };
  contacts.push(contact);
  saveContactsToStorage(contacts);
}

function updateExistingContact(index, values) {
  var contacts = getContacts();
  var target = getContactByIndex(index, contacts);
  if (!target) {
    return;
  }
  contacts[index].name = values.name;
  contacts[index].phone = values.phone;
  contacts[index].email = values.email;
  contacts[index].address = values.address;
  contacts[index].group = values.group;
  contacts[index].notes = values.notes;
  contacts[index].favorite = values.favorite;
  contacts[index].emergency = values.emergency;
  saveContactsToStorage(contacts);
}

function removeContactByIndex(index) {
  var contacts = getContacts();
  if (index < 0 || index >= contacts.length) {
    return;
  }
  contacts.splice(index, 1);
  saveContactsToStorage(contacts);
}


function filterContactsByName(contacts, query) {
  var filtered = [];
  var lowerQuery = query.toLowerCase();
  for (var i = 0; i < contacts.length; i++) {
    var name = contacts[i].name.toLowerCase();
    if (name.indexOf(lowerQuery) !== -1) {
      filtered.push(contacts[i]);
    }
  }
  return filtered;
}

function getFilteredContacts(contacts) {
  var query = document.getElementById("searchInput").value.trim();
  if (query === "") {
    return contacts;
  }
  return filterContactsByName(contacts, query);
}

function searchContacts() {
  var contacts = getContacts();
  renderContactsGrid(getFilteredContacts(contacts), contacts);
}



function countFavorites(contacts) {
  var count = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite) {
      count = count + 1;
    }
  }
  return count;
}

function countEmergency(contacts) {
  var count = 0;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].emergency) {
      count = count + 1;
    }
  }
  return count;
}

function renderStats(contacts) {
  var favCount = countFavorites(contacts);
  var emergencyCount = countEmergency(contacts);

  document.getElementById("totalCount").textContent = contacts.length;
  document.getElementById("favCount").textContent = favCount;
  document.getElementById("emergencyCount").textContent = emergencyCount;
  document.getElementById("contactsSubtitle").textContent =
    "Manage and organize your " + contacts.length + " contacts";
}

function buildContactCardHTML(contact, index) {
  var color = getColorForContact(contact.name);
  var initial = getInitial(contact.name);
  var groupClass = groupClassMap[contact.group] || "tag-other";
  var groupLabel = groupLabelMap[contact.group] || "Other";

  var favBadge = contact.favorite
    ? `<span class="contact-badge-fav d-flex align-items-center justify-content-center"><i class="fa-solid fa-star"></i></span>`
    : "";

  var emgBadge = contact.emergency
    ? `<span class="contact-badge-emg d-flex align-items-center justify-content-center"><i class="fa-solid fa-heart-pulse"></i></span>`
    : "";

  var emailRow = contact.email
    ? `<div class="d-flex align-items-center contact-detail-row mt-1"><div class="detail-icon detail-icon-email"><i class="fa-solid fa-envelope"></i></div>${contact.email}</div>`
    : "";

  var addressRow = contact.address
    ? `<div class="d-flex align-items-center contact-detail-row mt-1"><div class="detail-icon detail-icon-location"><i class="fa-solid fa-location-dot"></i></div>${contact.address}</div>`
    : "";

  var emergencyTag = contact.emergency
    ? `<span class="tag-pill tag-emergency"><i class="fa-solid fa-heart-pulse"></i> Emergency</span>`
    : "";

  return `
    <div class="col-12 col-md-6">
      <div class="contact-card bg-white rounded-4 border-light-subtle p-3 h-100">
        <div class="d-flex align-items-start gap-3 mb-2">
          <div class="contact-avatar-wrap">
            <div class="contact-avatar d-flex align-items-center justify-content-center" style="background-color:${color}">${initial}</div>
            ${favBadge}
            ${emgBadge}
          </div>
          <div class="flex-grow-1">
            <div class="fs-16 fw-bold text-dark">${contact.name}</div>
            <div class="d-flex align-items-center contact-detail-row mt-1"><div class="detail-icon detail-icon-phone"><i class="fa-solid fa-phone"></i></div>${contact.phone}</div>
          </div>
        </div>

        ${emailRow}
        ${addressRow}

        <div class="d-flex flex-wrap gap-2 my-3">
          <span class="tag-pill ${groupClass}">${groupLabel}</span>
          ${emergencyTag}
        </div>

        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex gap-2">
            <button type="button" class="card-action-btn action-call d-flex align-items-center justify-content-center" onclick="callContact('${contact.phone}')" data-tooltip="Call" aria-label="Call">
              <i class="fa-solid fa-phone"></i>
            </button>
            <button type="button" class="card-action-btn action-email d-flex align-items-center justify-content-center" onclick="emailContact('${contact.email}')" data-tooltip="Email" aria-label="Email">
              <i class="fa-solid fa-envelope"></i>
            </button>
          </div>
          <div class="d-flex gap-2">
            <button type="button" class="card-action-btn action-star ${contact.favorite ? "active" : ""} d-flex align-items-center justify-content-center" onclick="toggleFavorite(${index})" data-tooltip="Favorite" aria-label="Toggle favorite">
              <i class="fa-regular fa-star"></i>
            </button>
            <button type="button" class="card-action-btn action-heart ${contact.emergency ? "active" : ""} d-flex align-items-center justify-content-center" onclick="toggleEmergency(${index})" data-tooltip="Emergency" aria-label="Toggle emergency">
              <i class="fa-regular fa-heart"></i>
            </button>
            <button type="button" class="card-action-btn action-edit d-flex align-items-center justify-content-center" onclick="openEditModal(${index})" data-bs-toggle="modal" data-bs-target="#addContactModal" data-tooltip="Edit" aria-label="Edit">
             <i class="fa-solid fa-pen"></i>
            </button>
            <button type="button" class="card-action-btn action-delete d-flex align-items-center justify-content-center" onclick="deleteContact(${index})" data-tooltip="Delete" aria-label="Delete">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderContactsGrid(contacts, allContacts) {
  var grid = document.getElementById("contactsGrid");

  if (contacts.length === 0) {
    grid.innerHTML = "";
    return;
  }

  var html = "";
  for (var i = 0; i < contacts.length; i++) {
    var realIndex = getRealIndexInContacts(contacts[i], allContacts);
    html = html + buildContactCardHTML(contacts[i], realIndex);
  }
  grid.innerHTML = html;
}

function buildSideItemHTML(contact, callClass) {
  var color = getColorForContact(contact.name);
  var initial = getInitial(contact.name);

  return `
    <div class="d-flex align-items-center side-contact-item">
      <div class="side-avatar d-flex align-items-center justify-content-center" style="background-color:${color}">${initial}</div>
      <div class="flex-grow-1">
        <div class="side-name">${contact.name}</div>
        <div class="side-phone">${contact.phone}</div>
      </div>
      <button type="button" class="side-call-btn ${callClass} d-flex align-items-center justify-content-center" onclick="callContact('${contact.phone}')" aria-label="Call ${contact.name}">
        <i class="fa-solid fa-phone fs-11"></i>
      </button>
    </div>
  `;
}

function renderSidebar(contacts) {
  var favList = document.getElementById("favoritesList");
  var emergencyList = document.getElementById("emergencyList");

  var favHtml = "";
  var emergencyHtml = "";

  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].favorite) {
      favHtml = favHtml + buildSideItemHTML(contacts[i], "side-call-fav");
    }
    if (contacts[i].emergency) {
      emergencyHtml =
        emergencyHtml + buildSideItemHTML(contacts[i], "side-call-emg");
    }
  }

  if (favHtml === "") {
    favList.className =
      "widget-body d-flex align-items-center justify-content-center flex-grow-1 py-5";
    favList.innerHTML = `<span class="fs-14 text-secondary opacity-75">No favorites yet</span>`;
  } else {
    favList.className = "widget-body p-3 flex-grow-1";
    favList.innerHTML = favHtml;
  }

  if (emergencyHtml === "") {
    emergencyList.className =
      "widget-body d-flex align-items-center justify-content-center flex-grow-1 py-5";
    emergencyList.innerHTML = `<span class="fs-14 text-secondary opacity-75">No emergency contacts</span>`;
  } else {
    emergencyList.className = "widget-body p-3 flex-grow-1";
    emergencyList.innerHTML = emergencyHtml;
  }
}

function renderEmptyState() {
  var emptyState = document.getElementById("emptyState");
  var contacts = getContacts();
  if (contacts.length === 0) {
    emptyState.style.setProperty("display", "flex", "important");
  } else {
    emptyState.style.setProperty("display", "none", "important");
  }
}

function renderAll() {
  var contacts = getContacts();
  renderStats(contacts);
  renderSidebar(contacts);
  renderContactsGrid(getFilteredContacts(contacts), contacts);
  renderEmptyState();
}


function openAddModal() {
  resetContactForm();
  document.getElementById("addContactModalLabel").textContent =
    "Add New Contact";
  document.getElementById("saveContactBtnText").textContent = "Save Contact";
}

function openEditModal(index) {
  var contacts = getContacts();
  var contact = getContactByIndex(index, contacts);

  if (!contact) {
    return;
  }

  resetContactForm();
  document.getElementById("addContactModalLabel").textContent = "Edit Contact";
  document.getElementById("saveContactBtnText").textContent = "Update Contact";
  setFormValues(contact, index);
}


function saveContact() {
  var values = getFormValues();

  if (values.group === "Select a group" || values.group === "") {
    values.group = "other";
  }

  if (!validateForm(values)) {
    return;
  }

  if (values.index === "") {
    addNewContact(values);
    addContactModal.hide();
    renderAll();
    Swal.fire({
      icon: "success",
      title: "Added!",
      text: "Contact has been added successfully.",
    });
  } else {
    updateExistingContact(Number(values.index), values);
    addContactModal.hide();
    renderAll();
    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Contact has been updated successfully.",
    });
  }
}

function deleteContact(index) {
  var contacts = getContacts();
  var target = getContactByIndex(index, contacts);

  if (!target) {
    return;
  }

  Swal.fire({
    icon: "warning",
    title: "Delete Contact?",
    text:
      "Are you sure you want to delete " +
      target.name +
      "? This action cannot be undone.",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    confirmButtonColor: "#dc2626",
    cancelButtonText: "Cancel",
  }).then(function (result) {
    if (result.isConfirmed) {
      removeContactByIndex(index);
      renderAll();
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Contact has been deleted successfully.",
      });
    }
  });
}

function toggleFavorite(index) {
  var contacts = getContacts();
  var target = getContactByIndex(index, contacts);
  if (!target) {
    return;
  }
  target.favorite = !target.favorite;
  saveContactsToStorage(contacts);
  renderAll();
}

function toggleEmergency(index) {
  var contacts = getContacts();
  var target = getContactByIndex(index, contacts);
  if (!target) {
    return;
  }
  target.emergency = !target.emergency;
  saveContactsToStorage(contacts);
  renderAll();
}

function callContact(phone) {
  window.location.href = "tel:" + phone;
}

function emailContact(email) {
  if (email === "") {
    Swal.fire({
      icon: "info",
      title: "No email on file",
      text: "This contact doesn't have an email address saved.",
    });
    return;
  }
  window.location.href = "mailto:" + email;
}



renderAll();