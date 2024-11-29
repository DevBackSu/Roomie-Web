import React, { useState } from "react";

function InfoPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        additionalInfo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/info`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Info submitted successfully!");
                window.location.href = "/";
            } else {
                alert("Failed to submit info.");
            }
        } catch (error) {
            console.error("Error submitting info:", error);
        }
    };

    return (
        <div>
            <h1>Info Page</h1>
            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                />
                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="additionalInfo"
                    placeholder="Additional Info"
                    onChange={handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default InfoPage;
