import React, { useState } from 'react';

const QuestionCompilerComponent = () => {
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('java');
    const [input, setInput] = useState('');
    const [compileResult, setCompileResult] = useState(null);
    const [iscompiled, setIsCompiled] = useState(false);



    // Mock data for questions
    const questions = [
        {
            id: 1,
            problem: 'Write a program to calculate the factorial of a number.',
            sampleInput: `**************
**************
*********
*****`,
            expectedOutput: '120',
        },
        // Add more questions here
    ];


    const handleQuestionClick = (question) => {
        if (selectedQuestion === question.id) {
            setSelectedQuestion(null);
        } else {
            setSelectedQuestion(question.id);
            setCode('');
            setInput(''); // Reset input when switching questions
            setCompileResult(null); // Reset compile result when switching questions
        }
    };


    const renderQuestionDetails = (question) => {
        if (selectedQuestion === question.id) {
            return (
                <div className="mt-4">
                    <h4>Problem Statement:</h4>
                    <p>{question.problem}</p>
                    <h4>Sample Input:</h4>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{question.sampleInput}</pre>
                    <h4>Expected Output:</h4>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{question.expectedOutput}</pre>
                </div>
            );
        }
        return null;
    };
    const handleCompile = () => {
        // Implement compilation logic
        setCompileResult('Compilation successful.');
        setIsCompiled(true)
    };


    return (
        <div className="container-fluid">
            <div className="row">
                {/* Left side: Questions */}
                <div className="col-6">
                    <h2>Questions</h2>
                    <div className="list-group">
                        {questions.map((question) => (
                            <button
                                key={question.id}
                                type="button"
                                className={`list-group-item list-group-item-action ${selectedQuestion === question ? 'active' : ''
                                    }`}
                                onClick={() => handleQuestionClick(question)}
                            >
                                Question {question.id}
                            </button>
                        ))}
                    </div>
                    {questions.map((question) => (
                        <React.Fragment key={question.id}>
                            {renderQuestionDetails(question)}
                        </React.Fragment>
                    ))}
                </div>

                {/* Right side: Compiler */}
                <div className="col-6" style={{ backgroundColor: '#FAF1E4' }}>
                    <h2>Code Compiler</h2>
                    <select
                        className="form-select mb-3"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                    <textarea
                        className="form-control mb-3"
                        rows="15"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder={`Write your ${language} code here...`}
                        style={{ textDecoration: 'none', border: 'none' }}
                    ></textarea>
                    <div class="form-floating">
                        <textarea class="form-control" placeholder="Input the condition here.." id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Input the condition here...</label>
                    </div>
                    <div className="row">

                        {
                            iscompiled ?
                                <div className="col-6">
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#compileCollapse"
                                        aria-expanded="false"
                                        aria-controls="compileCollapse"
                                    >
                                        Compilation Result
                                    </button>
                                    <div className='collapse' id="compileCollapse" style={{padding:'2px',marginTop:'2px'}}>
                                        <div className="row">
                                            <div className="col-12">
                                                <h4>Output:</h4>
                                                {/* Output section */}
                                                {compileResult && <p>{compileResult}</p>}
                                            </div>
                                        </div>
                                        <button type='button' className='btn btn-danger' onClick={()=>setIsCompiled(false)}>close</button>
                                    </div>

                                </div>
                                :
                                <div className="col-6">

                                    <button className="btn btn-primary" onClick={handleCompile}>
                                        Compile
                                    </button>
                                </div>

                        }

                    </div>


                </div>
            </div>
        </div>
    );
};

export default QuestionCompilerComponent;
