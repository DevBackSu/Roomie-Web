import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/postWrite.css";

function PostCreatePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [fileNames, setFileNames] = useState([]);
    const navigate = useNavigate();
    const MAX_FILE_SIZE = 1 * 1024 * 1024;

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = [];
        const validNames = [];
        const excludedNames = [];

        selectedFiles.forEach(file => {
            if (file.size <= MAX_FILE_SIZE) {
                validFiles.push(file);
                validNames.push(file.name);
            } else {
                excludedNames.push(file.name);
            }
        });

        if (excludedNames.length > 0) {
            alert(`❌ 다음 파일은 1MB 초과로 제외됨: ${excludedNames.join(", ")}`);
        }

        setFiles(prev => [...prev, ...validFiles]);
        setFileNames(prev => [...prev, ...validNames]);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = [...files];
        const updatedNames = [...fileNames];
        updatedFiles.splice(index, 1);
        updatedNames.splice(index, 1);
        setFiles(updatedFiles);
        setFileNames(updatedNames);
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
                alert("✅ 게시글이 등록되었습니다!");
                navigate(`/post/${result.postCheckId}`);
            } else {
                alert("등록 실패: " + result.error);
            }
        } catch (error) {
            console.error(error);
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

                    <label>파일 첨부 (1MB 이하만 등록)</label>
                    <input type="file" multiple onChange={handleFileChange} />

                    {fileNames.length > 0 && (
                        <div className="file-preview-box">
                            <strong>🗂️ 업로드 파일 목록:</strong>
                            <ul>
                                {fileNames.map((name, idx) => (
                                    <li key={idx}>
                                        {name}{" "}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(idx)}
                                            className="remove-btn"
                                        >
                                            ❌ 삭제
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button type="submit">등록하기</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default PostCreatePage;