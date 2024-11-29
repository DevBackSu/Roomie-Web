export async function postUserInfo(formData) {
    const token = localStorage.getItem("accessToken");

    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/user/info`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        return response.ok;
    } catch (error) {
        console.error("Failed to post user info:", error);
        return false;
    }
}
