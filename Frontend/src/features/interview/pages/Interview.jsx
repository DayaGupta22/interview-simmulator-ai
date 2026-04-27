import { useState } from 'react'
import '../style/interview.scss'

// UI Layer - Presentational Components

// Sidebar Button Component
const SidebarButton = ({ label, isActive, onClick, icon }) => (
    <button
        className={`sidebar-button ${isActive ? 'active' : ''}`}
        onClick={onClick}
    >
        <span className="button-icon">{icon}</span>
        {label}
    </button>
)

// Skill Badge Component
const SkillBadge = ({ skill }) => (
    <div className="skill-badge">{skill}</div>
)

// Left Sidebar Component
const LeftSidebar = ({ activeTab, onTabChange }) => (
    <aside className="sidebar sidebar-left">
        <div className="sidebar-content">
            <SidebarButton
                icon="📋"
                label="Technical questions"
                isActive={activeTab === 'technical'}
                onClick={() => onTabChange('technical')}
            />
            <SidebarButton
                icon="💬"
                label="Behavioral questions"
                isActive={activeTab === 'behavioral'}
                onClick={() => onTabChange('behavioral')}
            />
            <SidebarButton
                icon="🗺️"
                label="Road Map"
                isActive={activeTab === 'roadmap'}
                onClick={() => onTabChange('roadmap')}
            />
        </div>
    </aside>
)

// Right Sidebar Component
const RightSidebar = ({ skillGaps = [] }) => (
    <aside className="sidebar sidebar-right">
        <div className="sidebar-header">
            <h3 className="sidebar-title">Skill Gaps</h3>
        </div>
        <div className="sidebar-content">
            {skillGaps && skillGaps.length > 0 ? (
                skillGaps.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} />
                ))
            ) : (
                <p className="empty-state">No skill gaps identified</p>
            )}
        </div>
    </aside>
)

// Main Content Area Component
const MainContent = ({ activeTab, data }) => {
    const renderContent = () => {
        switch (activeTab) {
            case 'technical':
                return (
                    <div className="content-section">
                        <h2 className="content-title">Technical Questions</h2>
                        {data?.technicalQuestion && data.technicalQuestion.length > 0 ? (
                            <div className="questions-list">
                                {data.technicalQuestion.map((question, idx) => (
                                    <div key={idx} className="question-card">
                                        <div className="question-header">
                                            <p className="question-text">{question.question || 'Question'}</p>
                                            {question.intention && (
                                                <span className="question-intention">{question.intention}</span>
                                            )}
                                        </div>
                                        {question.answerType && (
                                            <p className="answer-type">Answer Type: {question.answerType}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-placeholder">here will be the main content</p>
                        )}
                    </div>
                )
            case 'behavioral':
                return (
                    <div className="content-section">
                        <h2 className="content-title">Behavioral Questions</h2>
                        {data?.behavioralQuestions && data.behavioralQuestions.length > 0 ? (
                            <div className="questions-list">
                                {data.behavioralQuestions.map((question, idx) => (
                                    <div key={idx} className="question-card">
                                        <div className="question-header">
                                            <p className="question-text">{question.question || 'Question'}</p>
                                            {question.intention && (
                                                <span className="question-intention">{question.intention}</span>
                                            )}
                                        </div>
                                        {question.answerType && (
                                            <p className="answer-type">Answer Type: {question.answerType}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-placeholder">here will be the main content</p>
                        )}
                    </div>
                )
            case 'roadmap':
                return (
                    <div className="content-section">
                        <h2 className="content-title">Preparation Plan</h2>
                        {data?.preprationPlan && data.preprationPlan.length > 0 ? (
                            <div className="roadmap-list">
                                {data.preprationPlan.map((step, idx) => (
                                    <div key={idx} className="roadmap-item">
                                        <span className="step-number">{idx + 1}</span>
                                        <p className="step-text">{step.title || step}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="empty-placeholder">here will be the main content</p>
                        )}
                    </div>
                )
            default:
                return <p className="empty-placeholder">here will be the main content</p>
        }
    }

    return <main className="main-content">{renderContent()}</main>
}

// Main Interview Component
const Interview = () => {
    const [activeTab, setActiveTab] = useState('technical')

    // Sample data - Replace with actual data from props or API
    const interviewData = {
        technicalQuestion: [
            {
                question: 'Explain the concept of closures in JavaScript',
                intention: 'Assess understanding of core JS concepts',
                answerType: 'Conceptual'
            },
            {
                question: 'What is the difference between async/await and promises?',
                intention: 'Check async programming knowledge',
                answerType: 'Comparison'
            }
        ],
        behavioralQuestions: [
            {
                question: 'Tell me about a time you had to work with a difficult team member',
                intention: 'Assess communication and conflict resolution',
                answerType: 'STAR'
            }
        ],
        skillGaps: ['Redis', 'Message Queue', 'Event Loop'],
        preprationPlan: [
            { title: 'Day 1-2: Review JavaScript fundamentals' },
            { title: 'Day 3-4: Practice async patterns' },
            { title: 'Day 5: Mock interview session' }
        ]
    }

    return (
        <div className="interview">
            <LeftSidebar activeTab={activeTab} onTabChange={setActiveTab} />
            <MainContent activeTab={activeTab} data={interviewData} />
            <RightSidebar skillGaps={interviewData.skillGaps} />
        </div>
    )
}

export default Interview
