document.getElementById('contactForm').onsubmit = () => {
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const linkedin = document.getElementById("linkedin").value.trim();
  const meeting = document.getElementById("meeting").value;
  const mailingList = document.getElementById("mailingList").checked;

  clearErrors();
  let validcheck = true;

  if (!lastName) {
    document.getElementById("errorLastName").style.display = "block";
    validcheck = false;
  }
  if (!firstName) {
    document.getElementById("errorFirstName").style.display = "block";
    validcheck = false;
  }

    if (email) {
    if (!email.includes("@") || !email.includes(".")) {
      document.getElementById("errorEmail").style.display = "block";
      validcheck = false;
    }
  }

     if (mailingList && !email) {
    document.getElementById("errorEmail").textContent = "Email required if joining mailing list.";
    document.getElementById("errorEmail").style.display = "block";
    validcheck = false;
  }
     if (linkedin && !linkedin.startsWith("https://linkedin.com/in/")) {
    document.getElementById("errorLinkedIn").style.display = "block";
    validcheck = false;
  }
    if (!meeting) {
    document.getElementById("errorMeeting").style.display = "block";
    validcheck = false;
  }

  return validcheck;
}
function clearErrors() {
    let errors = document.getElementsByClassName("error");
    for (let i=0; i<errors.length; i++) {
        errors[i].style.display="none";
    }
}


meeting.addEventListener("change", () => {
    const oField = document.getElementById("addition");
    if (meeting.value === "Other") {
      addition.style.display = "block";
    } else {
      addition.style.display = "none";
    }
  });

mailingList.addEventListener("change", () => {
    const emailSection = document.querySelector(".email-format");
    emailSection.style.display = mailingList.checked ? "block" : "none";
  });