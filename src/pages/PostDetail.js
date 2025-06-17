import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PostDetail.css'; // 스타일 분리 시 사용

function PostDetail() {
    const { id } = useParams(); // postCheckId
    const [post, setPost] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPostDetail = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`/api/post/detail/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (response.data.success) {
                    setPost(response.data.data);
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

    if (error) {
        return <div className="post-detail-error">{error}</div>;
    }

    if (!post) {
        return <div className="post-detail-loading">로딩 중...</div>;
    }

    return (
        <div className="post-detail-container">
            <h2 className="post-detail-title">{post.title}</h2>
            <div className="post-detail-meta">
                <span>작성자: {post.writerName}</span>
                <span>작성일: {post.writeDtm}</span>
            </div>
            <div className="post-detail-content">
                {post.content}
            </div>
        </div>
    );
}

export default PostDetail;
