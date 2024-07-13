document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("exampleModal");
    var btn = document.getElementById("contactButton");
    var span = document.getElementById("modalToggler");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    document.getElementById("contactForm").addEventListener("submit", function(e) {
        e.preventDefault();
        showAlert("Loading...");

        fetch("https://getform.io/f/bdryrzgb", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: e.target["email"].value,
                firstName: e.target["firstName"].value,
                lastName: e.target["lastName"].value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showAlert("Thank you for contacting us! We will reach out to you soon.");
            modal.style.display = "none";
        })
        .catch(error => {
            console.error('Error:', error);
            showAlert("There was an error processing your request. Please try again later.");
        });
    });

    function showAlert(message) {
        var toast = document.getElementById("toast");
        var toastDesc = document.getElementById("toastDesc");

        toastDesc.textContent = message;
        toast.className = "toast show";

        setTimeout(function() {
            toast.className = toast.className.replace(" show", "");
        }, 4500);
    }


});
