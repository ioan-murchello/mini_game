const form = document.getElementById("form");

form.addEventListener("submit", formSend);

async function formSend(e) {
  e.preventDefault();
  let error = formValidate(form);
  let formData = new FormData(form);

  formData.append("image", form_preview.files);

  if (error === 0) {
    form.classList.add("sending");

    let response = await fetch("sendmail.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      let result = await response.json();
      alert(result.message);

      form_preview.innerHTML = "";
      form.reset();

      form.classList.remove("sending");
    } else {
      alert("Some error");
      form.classList.remove("sending");
    }
  } else {
    alert("Please enter the datas");
  }
}

function formValidate(form) {
  let error = 0;
  let formRequired = document.querySelectorAll("._req");

  for (let i = 0; i < formRequired.length; i++) {
    let input = formRequired[i];
    removeError(input);

    if (input.classList.contains("_email")) {
      if (emailTest(input)) {
        addError(input);
        error++;
      }
    } else if (
      input.getAttribute("type") === "checkbox" &&
      input.checked === false
    ) {
      addError(input);
      error++;
    } else {
      if (input.value === "") {
        addError(input);
        error++;
      }
    }
  }

  return error;
}

function addError(input) {
  input.parentElement.classList.add("_error");
  input.classList.add("_error");
}

function removeError(input) {
  input.parentElement.classList.remove("_error");
  input.classList.remove("_error");
}

function emailTest(input) {
  return !/([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/.test(
    input.value
  );
}


