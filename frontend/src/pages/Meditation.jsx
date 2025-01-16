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
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-heading font-bold text-primary-500 mb-8">
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
        </div>
    );
}

export default Meditation;