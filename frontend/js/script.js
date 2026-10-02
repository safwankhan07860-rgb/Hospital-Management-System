const appointmentForm = document.getElementById("appointmentForm");

appointmentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const patientName = document.getElementById("patientName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const department = document.getElementById("department").value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;
    const message = document.getElementById("message").value;

    try {

        const response = await fetch(
            "http://172.20.10.2:5000/api/appointments",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    patientName: patientName,
                    phone: phone,
                    email: email,
                    department: department,
                    appointmentDate: appointmentDate,
                    appointmentTime: appointmentTime,
                    message: message
                })
            }
        );

        const data = await response.json();

        console.log("SERVER RESPONSE:", data);

        if (data.success) {

            alert(
                "✅ Appointment Booked Successfully!\n\n" +
                "Appointment ID: " + data.appointmentId
            );

            appointmentForm.reset();

        } else {

    alert(
        "SERVER KA POORA RESPONSE:\n\n" +
        JSON.stringify(data, null, 2)
    );
}

    } catch (error) {

        console.error("FETCH ERROR:", error);

        alert(
            "❌ Server se connection nahi ho pa raha.\n\n" +
            "Please check that backend server is running."
        );
    }
});