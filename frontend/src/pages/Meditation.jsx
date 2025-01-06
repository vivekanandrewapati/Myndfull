// import { useState, useEffect, useRef } from 'react';


// const meditationTypes = [
//     { id: 'Guided', name: 'Guided Meditation', duration: 10 },
//     { id: 'Timer', name: 'Timer Meditation', duration: 5 },
//     { id: 'Breathing', name: 'Breathing Exercise', duration: 5 },
//     { id: 'Body', name: 'Body Scan', duration: 15 }
// ];

// function Meditation() {
//     const [activeSession, setActiveSession] = useState(null);
//     const [selectedType, setSelectedType] = useState(null);
//     const [duration, setDuration] = useState(5);
//     const [timeLeft, setTimeLeft] = useState(0);
//     const [isRunning, setIsRunning] = useState(false);
//     const [history, setHistory] = useState([]);
//     const [stats, setStats] = useState(null);
//     const [error, setError] = useState('');
//     const timerRef = useRef(null);

//     useEffect(() => {
//         loadMeditationHistory();
//         loadMeditationStats();
//         return () => {
//             if (timerRef.current) clearInterval(timerRef.current);
//         };
//     }, []);

//     const loadMeditationHistory = async () => {
//         try {
//             const response = await meditationService.getMeditationHistory();
//             setHistory(response.data.sessions);
//         } catch (err) {
//             setError('Failed to load meditation history');
//         }
//     };

//     const loadMeditationStats = async () => {
//         try {
//             const response = await meditationService.getMeditationStats();
//             setStats(response.data);
//         } catch (err) {
//             console.error('Failed to load meditation stats');
//         }
//     };

//     const startMeditation = async () => {
//         if (!selectedType) {
//             setError('Please select a meditation type');
//             return;
//         }

//         try {
//             const response = await meditationService.startMeditation({
//                 type: selectedType,
//                 duration: duration
//             });

//             setActiveSession(response.data);
//             setTimeLeft(duration * 60);
//             setIsRunning(true);

//             timerRef.current = setInterval(() => {
//                 setTimeLeft(prev => {
//                     if (prev <= 1) {
//                         completeMeditation();
//                         return 0;
//                     }
//                     return prev - 1;
//                 });
//             }, 1000);
//         } catch (err) {
//             setError('Failed to start meditation session');
//         }
//     };

//     const completeMeditation = async () => {
//         if (timerRef.current) clearInterval(timerRef.current);
//         setIsRunning(false);

//         if (activeSession) {
//             try {
//                 await meditationService.updateMeditationSession(activeSession._id, {
//                     completed: true
//                 });
//                 loadMeditationHistory();
//                 loadMeditationStats();
//                 setActiveSession(null);
//             } catch (err) {
//                 setError('Failed to complete meditation session');
//             }
//         }
//     };

//     const formatTime = (seconds) => {
//         const mins = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${mins}:${secs.toString().padStart(2, '0')}`;
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold text-primary mb-8">Meditation</h1>

//             {error && (
//                 <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
//                     {error}
//                 </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                 {/* Meditation Controls */}
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     {!isRunning ? (
//                         <>
//                             <h2 className="text-xl font-semibold mb-4">Start Meditation</h2>

//                             {/* Meditation Type Selection */}
//                             <div className="grid grid-cols-2 gap-4 mb-6">
//                                 {meditationTypes.map((type) => (
//                                     <button
//                                         key={type.id}
//                                         onClick={() => {
//                                             setSelectedType(type.id);
//                                             setDuration(type.duration);
//                                         }}
//                                         className={`p-4 rounded-lg text-center ${selectedType === type.id
//                                             ? 'bg-primary text-white'
//                                             : 'bg-gray-100 hover:bg-gray-200'
//                                             }`}
//                                     >
//                                         <div className="text-lg mb-2">{type.name}</div>
//                                         <div className="text-sm">{type.duration} minutes</div>
//                                     </button>
//                                 ))}
//                             </div>

//                             {/* Duration Selector */}
//                             <div className="mb-6">
//                                 <label className="block text-sm font-medium mb-2">
//                                     Duration (minutes)
//                                 </label>
//                                 <input
//                                     type="range"
//                                     min="1"
//                                     max="60"
//                                     value={duration}
//                                     onChange={(e) => setDuration(parseInt(e.target.value))}
//                                     className="w-full"
//                                 />
//                                 <div className="text-center text-lg font-medium">
//                                     {duration} minutes
//                                 </div>
//                             </div>

//                             <button
//                                 onClick={startMeditation}
//                                 className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark"
//                             >
//                                 Start Meditation
//                             </button>
//                         </>
//                     ) : (
//                         <div className="text-center">
//                             <div className="text-6xl font-bold mb-8">
//                                 {formatTime(timeLeft)}
//                             </div>
//                             <button
//                                 onClick={completeMeditation}
//                                 className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
//                             >
//                                 End Session
//                             </button>
//                         </div>
//                     )}
//                 </div>

//                 {/* Statistics and History */}
//                 <div className="bg-white p-6 rounded-lg shadow-md">
//                     <h2 className="text-xl font-semibold mb-4">Your Progress</h2>

//                     {stats && (
//                         <div className="grid grid-cols-2 gap-4 mb-6">
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <div className="text-2xl font-bold text-primary">
//                                     {stats.totalSessions}
//                                 </div>
//                                 <div className="text-sm text-gray-600">Total Sessions</div>
//                             </div>
//                             <div className="bg-gray-100 p-4 rounded-lg text-center">
//                                 <div className="text-2xl font-bold text-primary">
//                                     {stats.totalMinutes}
//                                 </div>
//                                 <div className="text-sm text-gray-600">Total Minutes</div>
//                             </div>
//                         </div>
//                     )}

//                     <h3 className="font-semibold mb-2">Recent Sessions</h3>
//                     <div className="space-y-2">
//                         {history.map((session) => (
//                             <div
//                                 key={session._id}
//                                 className="flex justify-between items-center p-3 bg-gray-50 rounded"
//                             >
//                                 <div>
//                                     <div className="font-medium">{session.type}</div>
//                                     <div className="text-sm text-gray-600">
//                                         {new Date(session.createdAt).toLocaleDateString()}
//                                     </div>
//                                 </div>
//                                 <div className="text-primary font-medium">
//                                     {session.duration} min
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Meditation;


import { useState, useRef } from 'react';

const BREATHE_STEPS = [
    { name: 'Inhale', duration: 4, instruction: 'Breathe in slowly...' },
    { name: 'Hold', duration: 4, instruction: 'Hold your breath...' },
    { name: 'Exhale', duration: 4, instruction: 'Release slowly...' },
    { name: 'Hold', duration: 4, instruction: 'Keep lungs empty...' }
];

function Meditation() {
    const [isRunning, setIsRunning] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [duration, setDuration] = useState(5); // minutes
    const [timeLeft, setTimeLeft] = useState(0);
    const timerRef = useRef(null);

    const startBreathing = () => {
        setIsRunning(true);
        setTimeLeft(duration * 60);

        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    stopBreathing();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Start breath cycle animation
        startBreathCycle();
    };

    const startBreathCycle = () => {
        setCurrentStep(0);
        const cycleInterval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % BREATHE_STEPS.length);
        }, 4000); // 4 seconds per step

        // Store the cycle interval to clear it later
        timerRef.current = cycleInterval;
    };

    const stopBreathing = () => {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsRunning(false);
        setCurrentStep(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center">
            <div className="w-full max-w-4xl px-4">
                <h1 className="text-4xl font-heading font-bold text-primary-500 text-center mb-8">
                    Breathing Exercise
                </h1>

                <div className="bg-white p-8 rounded-lg shadow-md">
                    {!isRunning ? (
                        <div className="space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-semibold mb-4 font-heading text-primary-500 ">
                                    Box Breathing Technique
                                </h2>
                                <p className="text-gray-600 mb-6 font-body text-primary-700">
                                    A simple technique to reduce stress and improve focus
                                </p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">
                                    Duration (minutes)
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="15"
                                    value={duration}
                                    onChange={(e) => setDuration(parseInt(e.target.value))}
                                    className="w-full"
                                />
                                <div className="text-center text-lg font-medium mt-2">
                                    {duration} minutes
                                </div>
                            </div>

                            <button
                                onClick={startBreathing}
                                className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 transition-colors font-semibold"
                            >
                                Start Breathing Exercise
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <div className="relative w-64 h-64 mx-auto mb-8">
                                {/* Breathing Circle Animation */}
                                <div
                                    className={`absolute inset-0 border-4 rounded-full 
                                        ${currentStep === 0 ? 'animate-expand border-blue-500' :
                                            currentStep === 1 ? 'border-green-500' :
                                                currentStep === 2 ? 'animate-contract border-blue-500' :
                                                    'border-green-500'}`}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <p className="text-xl font-medium text-gray-800">
                                        {BREATHE_STEPS[currentStep].instruction}
                                    </p>
                                </div>
                            </div>

                            <div className="text-4xl font-bold text-primary-500 mb-8">
                                {formatTime(timeLeft)}
                            </div>

                            <button
                                onClick={stopBreathing}
                                className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold"
                            >
                                End Session
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Meditation;