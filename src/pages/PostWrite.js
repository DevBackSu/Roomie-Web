import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/postWrite.css";

function PostCreatePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem("accessToken");

        const formData = new FormData();
        formData.append(
            "post",
            new Blob([JSON.stringify({ title, content })], { type: "application/json" })
        );
        files.forEach(file => formData.append("files", file));

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posting/create`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData
            });

            const result = await response.json();

            if (result.success === "true" || result.success === true) {
                alert("게시글이 등록되었습니다!");
                const postCheckId = result.postCheckId;
                navigate(`/post/${postCheckId}`);
            } else {
                alert("게시글 등록에 실패했습니다: " + result.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("서버 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <Header />
            <div className="post-create-container">
                <h1>게시글 작성</h1>
                <form onSubmit={handleSubmit} className="post-create-form">
                    <label>제목</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label>내용</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />

                    <label>파일 첨부</label>
                    <input type="file" multiple onChange={handleFileChange} />

                    <button type="submit">등록하기</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default PostCreatePage;