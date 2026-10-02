async function loadAppointments() {

    const table = document.getElementById("appointmentTable");
    const totalAppointments =
        document.getElementById("totalAppointments");
    const totalPatients =
        document.getElementById("totalPatients");

    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/appointments"
        );

        console.log("API Status:", response.status);

        if (!response.ok) {
            throw new Error("HTTP Error: " + response.status);
        }

        const result = await response.json();

        console.log("FULL API DATA:", result);

        const appointments = result.appointments || [];

        console.log("APPOINTMENTS:", appointments);

        // Total appointments
        if (totalAppointments) {
            totalAppointments.textContent =
                appointments.length;
        }

        // Total unique patients
        if (totalPatients) {

            const patients = new Set(
                appointments.map(
                    appointment => appointment.patient_name
                )
            );

            totalPatients.textContent = patients.size;
        }

        // Recent appointments table
        if (table) {

            if (appointments.length === 0) {

                table.innerHTML = `
                    <tr>
                        <td colspan="6">
                            No appointments found
                        </td>
                    </tr>
                `;

                return;
            }

            table.innerHTML = appointments.map(
                appointment => `
                    <tr>
                        <td>${appointment.id || "-"}</td>

                        <td>${appointment.patient_name || "-"}</td>

                        <td>${appointment.phone || "-"}</td>

                        <td>${appointment.department || "-"}</td>

                        <td>${appointment.appointment_date || "-"}</td>

                        <td>${appointment.appointment_time || "-"}</td>
                    </tr>
                `
            ).join("");
        }

    } catch (error) {

        console.error("APPOINTMENT ERROR:", error);

        if (table) {
            table.innerHTML = `
                <tr>
                    <td colspan="6">
                        Unable to load appointments
                    </td>
                </tr>
            `;
        }
    }
}


// Page load hote hi appointments load karo
document.addEventListener(
    "DOMContentLoaded",
    function () {
        loadAppointments();
    }
);