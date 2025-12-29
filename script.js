// ================================
// Resolution Reality Check - Pure Logic Oracle
// ================================

// State
let currentResolution = '';
let currentResult = null;

// DOM Elements
const inputSection = document.getElementById('input-section');
const loadingSection = document.getElementById('loading-section');
const resultSection = document.getElementById('result-section');
const examples = document.getElementById('examples');
const resolutionInput = document.getElementById('resolution-input');
const checkBtn = document.getElementById('check-btn');
const charCount = document.getElementById('char-count');
const loadingText = document.getElementById('loading-text');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupInputListeners();
});

// Input listeners
function setupInputListeners() {
    resolutionInput.addEventListener('input', (e) => {
        charCount.textContent = e.target.value.length;
        checkBtn.disabled = e.target.value.trim().length < 3;
    });

    resolutionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim().length >= 3) {
            checkResolution();
        }
    });
}

// Use example resolution
function useExample(text) {
    resolutionInput.value = text;
    charCount.textContent = text.length;
    checkBtn.disabled = false;
    resolutionInput.focus();
}

// Main check function
function checkResolution() {
    const resolution = resolutionInput.value.trim();
    if (!resolution || resolution.length < 3) return;

    currentResolution = resolution;

    // Show loading with futuristic scanning feel
    inputSection.classList.add('hidden');
    examples.classList.add('hidden');
    resultSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    const loadingMessages = [
        "INITIALIZING NEURAL PROBABILITY MATRIX...",
        "SCANNING INTENT VECTORS...",
        "DEBUNKING JANUARY OPTIMISM...",
        "CALCULATING DISCIPLINE DECAY RATE...",
        "FINALIZING BRUTAL HONESTY PROTOCOL..."
    ];

    let msgIndex = 0;
    const loadingInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[msgIndex];
    }, 800);

    // Simulate "Processing" with a slight delay for dramatic effect
    setTimeout(() => {
        const result = sophisticatedAnalysis(resolution);
        currentResult = result;
        clearInterval(loadingInterval);
        showResult(result);
    }, 4000);
}

// 🧠 The "Best Analysis Engine Possible" (No-AI)
function sophisticatedAnalysis(resolution) {
    const text = resolution.toLowerCase();

    // 1. Safety & Ethics Protocol
    const harmfulPatterns = /kill|bomb|steal|hurt|crime|illegal|murder|attack|destroy/i;
    if (harmfulPatterns.test(text)) {
        return {
            category: 'delusional',
            score: 1,
            roast: "PROTOCOL BREACH: Resolution involves non-compliant variables. The Oracle does not calculate probabilities for chaos. Seek a different hobby."
        };
    }

    // 2. Gibberish & Entropy Check
    if (text.length < 5 || /([^aeiouy\s]{5,})/.test(text) || /(.)\1{4,}/.test(text)) {
        return {
            category: 'delusional',
            score: 3,
            roast: "Our sensors detect high entropy. That isn't a resolution; it's a keyboard spasm. Try using actual words next time."
        };
    }

    // 3. Intent Mapping
    const intents = [
        { key: 'fitness', patterns: /gym|workout|exercise|run|weight|lose|muscle|fit|body/i, base: 60 },
        { key: 'career', patterns: /job|money|billionaire|millionaire|rich|business|startup|promotion|career/i, base: 40 },
        { key: 'habits', patterns: /sleep|early|wake|morning|meditate|read|book|journal|habit/i, base: 55 },
        { key: 'tech', patterns: /code|programming|app|learn|language|software|career/i, base: 65 },
        { key: 'social', patterns: /love|marry|date|friends|social|family|quit/i, base: 50 },
        { key: 'unrealistic', patterns: /world|ruler|galaxy|magic|superpower|lottery|win/i, base: 10 }
    ];

    let detectedIntent = intents.find(i => i.patterns.test(text)) || { key: 'general', base: 45 };

    // 4. Qualifier Extraction (Intensity & Frequency)
    const qualifiers = [
        { patterns: /every single day|daily|always|365/i, mod: -35, label: 'Hyper-Frequent' },
        { patterns: /never|completely|quit|stop/i, mod: -25, label: 'Absolute' },
        { patterns: /sometimes|weekly|often|try/i, mod: +15, label: 'Realistic' },
        { patterns: /more|better|improve/i, mod: +10, label: 'Incremental' }
    ];

    let detectedQualifier = qualifiers.find(q => q.patterns.test(text)) || { mod: 0, label: 'Standard' };

    // 5. Score Calculation
    let finalScore = detectedIntent.base + detectedQualifier.mod + (Math.random() * 10 - 5);
    finalScore = Math.min(95, Math.max(5, Math.floor(finalScore)));

    // 6. Contextual Roast Generation
    let category = 'optimistic';
    if (finalScore > 70) category = 'achievable';
    if (finalScore < 30) category = 'delusional';

    const roastTemplates = {
        achievable: [
            `Strategic. You've targeted a ${detectedIntent.key} goal with ${detectedQualifier.label} parameters. This is mathematically sound.`,
            `The Oracle approves. Your resolution for "${resolution}" reflects a rare trait: emotional maturity. Carry on.`,
            `Incremental progress detected. By focusing on ${detectedIntent.key}, you've avoided the January Pitfall. Logic prevails.`
        ],
        optimistic: [
            `A solid ${detectedIntent.key} goal, but your ${detectedQualifier.label} approach creates friction. Probability of failure spikes in week 3.`,
            `The spirit is willing, but the dopamine receptors are weak. "${resolution}" is possible, but statistically improbable given your current trajectory.`,
            `You're aiming for the moon. You'll likely hit the ceiling. Adjust your ${detectedQualifier.label} expectations for better results.`
        ],
        delusional: [
            `ERROR: Ambition levels exceeding reality threshold. Your ${detectedIntent.key} delusions are impressive, if not entirely fictional.`,
            `"${resolution}"? We've cross-referenced this with 4 billion failed dreams. You have a 0.003% chance. It's almost legendary.`,
            `The ${detectedQualifier.label} nature of this goal suggests you might be living in a simulation. Please return to Earth before February.`
        ]
    };

    const roastPool = roastTemplates[category];
    const roast = roastPool[Math.floor(Math.random() * roastPool.length)];

    return { category, score: finalScore, roast };
}

// Show result
function showResult(result) {
    loadingSection.classList.add('hidden');
    resultSection.classList.remove('hidden');

    const resultCard = document.getElementById('result-card');
    const categoryEmoji = document.getElementById('category-emoji');
    const categoryText = document.getElementById('category-text');
    const resultResolution = document.getElementById('result-resolution');
    const roastText = document.getElementById('roast-text');
    const meterFill = document.getElementById('meter-fill');
    const meterValue = document.getElementById('meter-value');

    // Set category styling
    resultCard.className = 'result-card ' + result.category;
    categoryText.className = 'category-text ' + result.category;
    meterFill.className = 'meter-fill ' + result.category;

    // Set content
    const emojis = { achievable: '🟢', optimistic: '🟡', delusional: '🔴' };
    const labels = {
        achievable: 'ANALysis: COMPLIANT',
        optimistic: 'ANALYSIS: UNLIKELY',
        delusional: 'ANALYSIS: CRITICAL'
    };

    categoryEmoji.textContent = emojis[result.category];
    categoryText.textContent = labels[result.category];
    resultResolution.textContent = `"${currentResolution}"`;
    roastText.textContent = result.roast;

    // Animate meter
    setTimeout(() => {
        meterFill.style.width = result.score + '%';
        meterValue.textContent = result.score + '%';
    }, 100);

    // Confetti for achievable (only if not a tiny score)
    if (result.category === 'achievable') {
        launchConfetti();
    }
}

// Try another resolution
function tryAnother() {
    resolutionInput.value = '';
    charCount.textContent = '0';
    checkBtn.disabled = true;

    resultSection.classList.add('hidden');
    inputSection.classList.remove('hidden');
    examples.classList.remove('hidden');

    resolutionInput.focus();
}

// Share to Twitter/X
function shareToTwitter() {
    const text = `My 2026 resolution "${currentResolution}" was analyzed by the Zero-AI Logic Oracle. Result: ${currentResult.category.toUpperCase()} (${currentResult.score}% Probability).\n\nRate yours here: `;
    const url = window.location.href;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank', 'width=550,height=420');
}

// Confetti Effect
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#00ff88', '#00d4ff', '#ff3e3e', '#bc00ff'];

    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 4 + 3,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.1,
            opacity: 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        particles.forEach(p => {
            if (p.opacity <= 0) return;
            active = true;
            p.y += p.speed;
            p.x += Math.sin(p.angle) * 1;
            p.angle += p.spin;
            p.opacity -= 0.005;
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.restore();
        });
        if (active) requestAnimationFrame(animate);
    }
    animate();
}

window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
