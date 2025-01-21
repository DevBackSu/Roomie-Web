import React from "react";
import "../css/footer.css"; // 스타일

function Footer() {
    return (
        <footer className="footer">
            <nav className="nav">
                <div className="dev-info">
                    <p>개발 : 2024.08 ~ 2025.01 (ing)</p>
                    <p>
                        <a
                            href="https://github.com/DevBackSu"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="github-link"
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
                                alt="GitHub logo"
                                className="github-logo"
                            />
                            <span>GITHUB</span>
                        </a>
                    </p>
                </div>
            </nav>
        </footer>
    );
}

export default Footer;
