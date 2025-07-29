import React, { useState } from 'react';
import { icons } from './icons';
import Spinner from './Spinner';

const AIAssistantModal = ({ job, onClose }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [promptType, setPromptType] = useState('');

    const generateContent = async (promptTemplate, type) => {
        if (!job) return;
        
        const userPrompt = promptTemplate
            .replace('{position}', job.position)
            .replace('{company}', job.company)
            .replace('{description}', job.jobDescription || 'No description provided.');

        setPromptType(type); // Set the prompt type for UI feedback
        setIsLoading(true);
        setAiResponse('');

        try {
            const chatHistory = [{ role: "user", parts: [{ text: userPrompt }] }];
            const payload = { contents: chatHistory };
            const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0) {
                const text = result.candidates[0].content.parts[0].text;
                setAiResponse(text);
            } else {
                setAiResponse("Sorry, I couldn't generate a response. Please try again.");
            }
        } catch (error) {
            console.error("AI generation error:", error);
            setAiResponse(`An error occurred: ${error.message}.`);
        } finally {
            setIsLoading(false);
        }
    };
    
    const promptTemplates = {
        coverLetter: "Generate a concise, bullet-point outline for a cover letter for the position of {position} at {company}. Use the following job description as context: {description}",
        interviewQuestions: "Based on the job description for a {position} at {company}, suggest 5 potential interview questions they might ask me. Description: {description}",
        emailFollowUp: "Write a brief, professional follow-up email template I can use after an interview for the {position} role at {company}."
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                <header className="p-4 border-b flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
                    <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full">{icons.close}</button>
                </header>
                <div className="p-6 flex-grow overflow-y-auto">
                    <div className="mb-6">
                        <h3 className="font-semibold text-gray-700">{job.position}</h3>
                        <p className="text-gray-500">{job.company}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button onClick={() => generateContent(promptTemplates.coverLetter, 'Cover Letter Outline')} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm">Cover Letter Outline</button>
                        <button onClick={() => generateContent(promptTemplates.interviewQuestions, 'Interview Questions')} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 text-sm">Interview Questions</button>
                        <button onClick={() => generateContent(promptTemplates.emailFollowUp, 'Follow-up Email')} className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 text-sm">Follow-up Email</button>
                    </div>
                    {isLoading && <div className="text-center p-8"><Spinner /><p className="mt-4 text-gray-600">Generating {promptType}...</p></div>}
                    {aiResponse && <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg border"><pre className="whitespace-pre-wrap font-sans text-sm">{aiResponse}</pre></div>}
                </div>
            </div>
        </div>
    );
};

export default AIAssistantModal;
