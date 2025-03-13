import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/noticePage.css";

function NoticePage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);
    const [size] = useState(10); // 페이지당 10개 고정
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notice?page=${page}&size=${size}`);
                if (!response.ok) {
                    throw new Error("게시글을 불러오는 데 실패했습니다.");
                }
                const data = await response.json();
                if (data.success === "true") {
                    setNotices(data.noticeList); // "noticeList" 키를 사용하여 데이터 저장
                } else {
                    throw new Error("데이터를 불러오지 못했습니다.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNotices();
    }, [page]); // page 값이 바뀔 때마다 실행

    const handleNoticeClick = (noticeId) => {
        navigate(`/notice/${noticeId}`);
    };

    const handleNextPage = () => {
        if (notices.length === size) { // 다음 페이지로 갈 수 있는지 확인
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
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
                        <li key={notice.noticeId} className="notice-item" onClick={() => handleNoticeClick(notice.noticeId)}>
                            <h2 className="notice-item-title">{notice.title}</h2>
                            <p className="notice-item-content">{notice.content.substring(0, 100)}...</p>
                            <div className="notice-meta">
                                <span>{new Date(notice.writeDtm).toLocaleDateString()}</span>
                                <span>조회수: {notice.views}</span>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="pagination">
                    <button onClick={handlePrevPage} disabled={page === 0}>이전</button>
                    <span>페이지 {page + 1}</span>
                    <button onClick={handleNextPage} disabled={notices.length < size}>다음</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default NoticePage;
