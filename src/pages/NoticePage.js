import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/noticePage.css";

function NoticePage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notice`);
                if (!response.ok) {
                    throw new Error("게시글을 불러오는 데 실패했습니다.");
                }
                const data = await response.json();
                setNotices(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, []);

    const handleNoticeClick = (noticeId) => {
        navigate(`/notice/${noticeId}`);
    };

    if (loading) return <p className="loading">게시글을 불러오는 중...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div>
            <Header />
            <div className="notice-container">
                <h1 className="notice-title">게시판</h1>
                <ul className="notice-list">
                    {notices.map((notice) => (
                        <li key={notice.notice_id} className="notice-item" onClick={() => handleNoticeClick(notice.notice_id)}>
                            <h2 className="notice-item-title">{notice.title}</h2>
                            <p className="notice-item-content">{notice.content.substring(0, 100)}...</p>
                            <div className="notice-meta">
                                <span>{new Date(notice.date).toLocaleDateString()}</span>
                                <span>조회수: {notice.views}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default NoticePage;
