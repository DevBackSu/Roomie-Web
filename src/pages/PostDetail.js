import React, { useEffect, useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import '../css/PostDetail.css';

function PostDetail() {
    const { id } = useParams(); // postCheckId
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posting/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setPost(response.data.postDetail);
                } else {
                    setError(response.data.message || 'Failed to load post');
                }
            } catch (err) {
                setError('게시글을 불러오는 중 오류가 발생했습니다.');
                console.error(err);
            }
        };

        fetchPostDetail();
    }, [id]);

    if (error) return <div className="post-detail-error">{error}</div>;
    if (!post) return <div className="post-detail-loading">로딩 중...</div>;

    return (
        <div>
            <Header />
            <div className="post-detail-container">
                <h2 className="post-detail-title">{post.title}</h2>
                <div className="post-detail-meta">
                    <span>작성자: {post.writerName}</span>
                    <span>작성일: {post.writeDtm?.slice(0, 10)}</span>
                </div>

                <div className="post-detail-content">
                    {post.content}
                </div>

                {/* 🗂 첨부파일 섹션 (조건부 렌더링) */}
                {post.files?.length > 0 && (
                    <div className="post-detail-files">
                        <h4>📎 첨부파일</h4>
                        <ul>
                            {post.files.map((file, index) => (
                                <li key={index}>
                                    <a href={file.filePath} target="_blank" rel="noopener noreferrer">
                                        {file.originName || file.fileName}
                                    </a> <span className="post-file-type">({file.fileType})</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                <div className="post-detail-actions">
                    <button className="post-action-button" onClick={() => navigate('/post')}>목록</button>
                    <button className="post-action-button">수정</button>
                    <button className="post-action-button">삭제</button>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PostDetail;