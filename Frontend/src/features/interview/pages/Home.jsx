import { useState } from "react"
import "../style/home.scss"

// UI Layer - Presentational Components

// Badge Component
const Badge = ({ text, variant = "required" }) => (
    <span className={`badge badge-${variant}`}>{text}</span>
)

// Section Header Component
const SectionHeader = ({ icon, title, badge }) => (
    <div className="section-header">
        <div className="header-left">
            <span className="section-icon">{icon}</span>
            <h3 className="section-title">{title}</h3>
        </div>
        {badge && <Badge text={badge.text} variant={badge.variant} />}
    </div>
)

// TextArea Component
const TextAreaField = ({ label, value, onChange, placeholder, maxChars, charCount }) => (
    <div className="textarea-field">
        <label className="field-label">{label}</label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxChars}
            className="textarea-input"
        />
        {maxChars && <span className="char-count">{charCount} / {maxChars} chars</span>}
    </div>
)

// Upload Area Component
const UploadArea = ({ label, badge, onFileChange }) => (
    <div className="upload-section">
        <div className="upload-header">
            <p className="upload-label">{label}</p>
            {badge && <Badge text={badge.text} variant={badge.variant} />}
        </div>
        <div className="upload-area">
            <input
                type="file"
                id="resume"
                hidden
                accept=".pdf,.docx"
                onChange={onFileChange}
                className="file-input"
            />
            <label htmlFor="resume" className="upload-box">
                <div className="upload-icon">☁️</div>
                <p className="upload-text">Click to upload or drag & drop</p>
                <p className="upload-subtext">PDF or DOCX (Max 5MB)</p>
            </label>
        </div>
    </div>
)

// Info Box Component
const InfoBox = ({ text }) => (
    <div className="info-box">
        <span className="info-icon">ℹ️</span>
        <p className="info-text">{text}</p>
    </div>
)

// Header Component
const PageHeader = () => (
    <div className="page-header">
        <h1 className="page-title">
            Create Your Custom <span className="highlight-text">Interview Plan</span>
        </h1>
        <p className="page-subtitle">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
        </p>
    </div>
)

// Footer Component
const PageFooter = () => (
    <footer className="page-footer">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#help">Help Center</a>
    </footer>
)

// Main Form Component
const InterviewForm = ({
    jobDescription,
    selfDescription,
    onJobDescriptionChange,
    onSelfDescriptionChange,
    onResumeChange,
    onSubmit,
    isLoading = false,
    jobDescriptionChars = 0
}) => (
    <div className="interview-form-wrapper">
        <form className="interview-form" onSubmit={onSubmit}>
            <div className="form-content">
                {/* Left Section - Job Description */}
                <div className="form-section form-left">
                    <SectionHeader
                        icon="📋"
                        title="Target Job Description"
                        badge={{ text: "REQUIRED", variant: "required" }}
                    />
                    <TextAreaField
                        label=""
                        value={jobDescription}
                        onChange={onJobDescriptionChange}
                        placeholder="Paste the full job description here...
e.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'"
                        maxChars={5000}
                        charCount={jobDescriptionChars}
                    />
                </div>

                {/* Right Section - User Profile */}
                <div className="form-section form-right">
                    <SectionHeader
                        icon="👤"
                        title="Your Profile"
                    />
                    
                    <UploadArea
                        label="Upload Resume"
                        badge={{ text: "BEST RESULTS", variant: "best-results" }}
                        onFileChange={onResumeChange}
                    />

                    <div className="or-divider">
                        <span>OR</span>
                    </div>

                    <TextAreaField
                        label="Quick Self-Description"
                        value={selfDescription}
                        onChange={onSelfDescriptionChange}
                        placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                    />

                    <InfoBox
                        text="Either a Resume or a Self Description is required to generate a personalized plan."
                    />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="form-footer">
                <div className="footer-info">
                    <span className="ai-info">🤖 AI-Powered Strategy Generation · Approx 30s</span>
                </div>
                <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                >
                    <span className="star-icon">★</span>
                    {isLoading ? "Generating..." : "Generate My Interview Strategy"}
                </button>
            </div>
        </form>
    </div>
)

// Main Home Component
const Home = () => {
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")

    return (
        <main className="home">
            <PageHeader />
            <InterviewForm
                jobDescription={jobDescription}
                selfDescription={selfDescription}
                onJobDescriptionChange={(e) => setJobDescription(e.target.value)}
                onSelfDescriptionChange={(e) => setSelfDescription(e.target.value)}
                onResumeChange={() => {}}
                onSubmit={(e) => e.preventDefault()}
                jobDescriptionChars={jobDescription.length}
            />
            <PageFooter />
        </main>
    )
}

export default Home

