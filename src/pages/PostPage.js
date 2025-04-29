import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/postPage.css";

function PostPage() {
    const [posts, setPost] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [totalPosts, setTotalPosts] = useState(0);
    const navigate = useNavigate();

    const totalPages = Math.ceil(totalPosts / size);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/posting?page=${page}&size=${size}`);
                if (!response.ok) {
                    throw new Error("게시글을 불러오는 데 실패했습니다.");
                }
                const data = await response.json();
                if (data.success === "true") {
                    setPost(data.postData.postList);
                    setTotalPosts(data.postData.totalPosts); // 전체 게시글 수 저장
                } else {
                    throw new Error("데이터를 불러오지 못했습니다.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page, size]);

    const handlePostClick = (postId) => {
        navigate(`/post/${postId}`);
    };

    const handlePageClick = (pageNum) => {
        if (pageNum >= 0 && pageNum < totalPages) {
            setPage(pageNum);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const range = 2; // 현재 페이지 기준으로 앞뒤로 몇 개씩 보여줄지

        const start = Math.max(0, page - range);
        const end = Math.min(totalPages - 1, page + range);

        for (let i = start; i <= end; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={i === page ? "active" : ""}
                >
                    {i + 1}
                </button>
            );
        }
        return pageNumbers;
    };

    if (loading) return <p className="loading">게시글을 불러오는 중...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <Header />
            <div className="post-container">
                <h1 className="post-title">게시판</h1>
                <div className="post-summary">총 게시글 수: {totalPosts}</div>
                <ul className="post-list">
                    {posts.map((post) => (
                        <li key={post.postId} className="post-item" onClick={() => handlePostClick(post.postId)}>
                            <h2 className="post-item-title">{post.title}</h2>
                            <p className="post-item-content">{post.content.substring(0, 100)}...</p>
                            <div className="post-meta">
                                <span>{new Date(post.writeDtm).toLocaleDateString()}</span>
                                <span>조회수: {post.views}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button onClick={() => setPage(0)} disabled={page === 0}>⏮</button>
                    <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>◀</button>
                    {renderPageNumbers()}
                    <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={page === totalPages - 1}>▶</button>
                    <button onClick={() => setPage(totalPages - 1)} disabled={page === totalPages - 1}>⏭</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostPage;
