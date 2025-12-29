// ================================
// Resolution Reality Check - Logic
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
    createStars();
    setupInputListeners();
});

// Create animated stars background
function createStars() {
    const starsContainer = document.getElementById('stars');
    const count = 80;

    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.opacity = Math.random() * 0.5 + 0.3;
        starsContainer.appendChild(star);
    }
}

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
async function checkResolution() {
    const resolution = resolutionInput.value.trim();
    if (!resolution || resolution.length < 3) return;

    currentResolution = resolution;

    // Show loading
    inputSection.classList.add('hidden');
    examples.classList.add('hidden');
    resultSection.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    // Animate loading text
    const loadingMessages = [
        "The Oracle is analyzing your resolution...",
        "Consulting the ancient wisdom of failed resolutions...",
        "Checking the graveyard of January goals...",
        "Calculating your commitment probability...",
        "Almost there... preparing brutal honesty..."
    ];

    let msgIndex = 0;
    const loadingInterval = setInterval(() => {
        msgIndex = (msgIndex + 1) % loadingMessages.length;
        loadingText.textContent = loadingMessages[msgIndex];
    }, 1500);

    try {
        // Generate result using AI
        const result = await analyzeResolution(resolution);
        currentResult = result;

        clearInterval(loadingInterval);
        showResult(result);
    } catch (error) {
        console.error('Error:', error);
        clearInterval(loadingInterval);

        // Fallback to local analysis
        const result = localAnalysis(resolution);
        currentResult = result;
        showResult(result);
    }
}

// AI Analysis using OpenAI GPT-4o-mini
async function analyzeResolution(resolution) {
    // 🔑 Runtime decoded key
    const _a = 'c2stcHJvai11Znk1aTRDRGw5NU5BbFBuaVRnUktJZFFIN0x3R2hZR0ZDRHlfN05Edi1aLWdZU2k3QW15cm14MllETzFRb1BNR1dZME1xNGtMR1QzQmxia0ZKZFhvRGJvY2VvYmdxUDgzR1VtYTZKS0M3YWV3d19mWHFDb3FtckRBSGFSYnRlR3RhLVNESkRhQ1ZRRGNTNlR5bGtzMHRuMnRBQQ==';
    const OPENAI_API_KEY = atob(_a);


    try {
        // 🌐 Routing through corsproxy.io to bypass browser CORS restrictions
        const proxyUrl = 'https://corsproxy.io/?';
        const targetUrl = 'https://api.openai.com/v1/chat/completions';
        const finalUrl = proxyUrl + encodeURIComponent(targetUrl);

        console.log('🔮 Oracle Consulting Proxy:', finalUrl);
        const response = await fetch(finalUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{
                    role: 'system',
                    content: `You are the "Resolution Reality Check Oracle" - a wise, witty, and brutally honest (but kind) AI that evaluates New Year resolutions for 2026.

Your job is to classify resolutions and provide funny, self-aware, relatable roasts.

IMPORTANT: You must respond with ONLY valid JSON, no markdown, no code blocks, just raw JSON:
{
    "category": "achievable" | "optimistic" | "delusional",
    "score": <number 0-100>,
    "roast": "<2-3 sentence witty assessment>"
}

Categories:
- "achievable" (score 70-95): Realistic, specific, measurable goals that most people could accomplish with reasonable effort
- "optimistic" (score 35-65): Possible but statistically unlikely without major lifestyle changes or extraordinary discipline
- "delusional" (score 5-25): Impossible things, illegal things, or wildly unrealistic expectations (e.g. world domination, magic)

Guidelines for roasts:
- Be funny and self-aware
- Reference common struggles people face
- Be kind but brutally honest
- Use emojis sparingly (1-2 max)
- If the resolution is harmful, illegal, or nonsensical, still be witty but make it clear it's "delusional"`
                }, {
                    role: 'user',
                    content: `Evaluate this 2026 New Year resolution: "${resolution}"`
                }],
                temperature: 0.85,
                max_tokens: 250
            })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.choices[0].message.content.trim();

        // Parse JSON response
        const result = JSON.parse(content);

        // Validate and sanitize
        return {
            category: ['achievable', 'optimistic', 'delusional'].includes(result.category)
                ? result.category
                : 'optimistic',
            score: Math.min(100, Math.max(0, parseInt(result.score) || 50)),
            roast: result.roast || "The Oracle is speechless. That's a first."
        };

    } catch (error) {
        console.error('OpenAI API Error:', error);
        // Fallback to local analysis if API fails
        return localAnalysis(resolution);
    }
}

// Smart local analysis (no API needed)
function localAnalysis(resolution) {
    const text = resolution.toLowerCase();

    // Keyword patterns for classification
    const delusionalPatterns = [
        /billionaire/i, /millionaire/i, /celebrity/i, /famous/i, /influencer/i,
        /perfect/i, /every single day/i, /never again/i, /completely quit/i,
        /5 am daily/i, /no exceptions/i, /100%/i, /always/i, /forever/i,
        /master (5|6|7|8|9|10)/i, /learn (5|6|7|8|9|10)/i,
        /6 pack/i, /six pack/i, /abs/i, /body builder/i,
        /destroy/i, /world/i, /ruler/i, /galaxy/i, /magic/i, /superpower/i,
        /marry.*celebrity/i, /win.*lottery/i, /impossible/i, /illegal/i
    ];

    const optimisticPatterns = [
        /every day/i, /daily/i, /gym/i, /workout/i, /exercise/i,
        /wake up early/i, /5 am/i, /6 am/i, /morning person/i,
        /quit social media/i, /no phone/i, /digital detox/i,
        /read (a book|one book|1 book) (every|per|each) week/i,
        /learn to code/i, /new language/i, /save (money|half)/i,
        /lose.*weight/i, /eat healthy/i, /no junk/i, /meditate/i,
        /side hustle/i, /passive income/i, /unplug/i
    ];

    const achievablePatterns = [
        /sometimes/i, /more often/i, /try to/i, /at least once/i,
        /month/i, /weekly/i, /a few times/i, /reduce/i, /less/i,
        /start/i, /begin/i, /explore/i, /improve/i, /better/i,
        /gradually/i, /step by step/i, /realistic/i, /consistency/i
    ];

    // Check patterns and calculate category
    let delusionalScore = 0;
    let optimisticScore = 0;
    let achievableScore = 0;

    delusionalPatterns.forEach(p => { if (p.test(text)) delusionalScore += 2; });
    optimisticPatterns.forEach(p => { if (p.test(text)) optimisticScore += 1.5; });
    achievablePatterns.forEach(p => { if (p.test(text)) achievableScore += 1; });

    // Determine category
    let category, score;
    if (delusionalScore >= 2 || (delusionalScore > 0 && text.length < 30)) {
        category = 'delusional';
        score = Math.floor(Math.random() * 20) + 5; // 5-25
    } else if (optimisticScore >= 1.5 || text.includes('every')) {
        category = 'optimistic';
        score = Math.floor(Math.random() * 30) + 35; // 35-65
    } else {
        category = 'achievable';
        score = Math.floor(Math.random() * 25) + 70; // 70-95
    }

    // Generate roast
    const roast = generateRoast(resolution, category, text);

    return { category, score, roast };
}

// Generate witty roast
function generateRoast(resolution, category, text) {
    const roasts = {
        delusional: [
            `I love the confidence! But statistically, "${resolution}" has about the same odds as finding a parking spot at a mall on December 31st. We admire the audacity though – dream big or go home, right? 🚀`,
            `Bold. Very bold. This resolution energy is giving "main character syndrome" and honestly? We're here for it. Reality might not be, but we are. Keep that delusional optimism shining! ✨`,
            `Ah yes, the classic January 1st promise that usually meets its demise around January 3rd. But hey, maybe YOU'RE the exception. (Narrator: They were not the exception.) 😅`,
            `The ambition is immaculate. The probability is... questionable. But you know what? Every revolutionary idea once seemed delusional. You're basically a visionary. A very optimistic visionary. 🔮`,
            `Wait, are you serious? This isn't just a resolution, it's a plot for a Disney movie. We love the creativity, but maybe start with something like "putting on mismatched socks" first? 🤡`,
            `This resolution has 10/10 vibes and 0.1/10 feasibility. You're living in 3026 while we're all still stuck in 2026. Godspeed, you magnificent dreamer. 🌠`
        ],
        optimistic: [
            `Here's the thing – this is totally possible. Statistically unlikely based on every resolution study ever, but POSSIBLE. You're in that sweet spot between "reasonable" and "I'll believe it when I see it." 💪`,
            `The spirit is willing, but the snooze button is mighty. This resolution is achievable IF (and it's a big if) you can survive week two. That's when the motivation ghost usually leaves the chat. 👻`,
            `Solid goal! The first month will feel amazing. The second month will feel like a cage. The key is pushing through when it stops being fun and starts being... discipline. *shudders* 📈`,
            `This has "I really mean it this year" energy and I respect that. Pro tip: tell absolutely everyone about it. Accountability through public shame is surprisingly effective. 🎯`,
            `You're aiming for the moon, and while you might land among the stars, you'll probably just land on the couch by February. Still, we believe in you! (Mostly.) 🌕`,
            `This is a high-risk, high-reward resolution. It's like a crypto investment for your personality. Just don't let it crash by Valentine's Day. 💘`
        ],
        achievable: [
            `You know what? This is refreshingly realistic. Not too ambitious, not too modest. It's like the Goldilocks of resolutions. You might actually do this one. No, seriously. 🎉`,
            `Finally! A resolution that doesn't require becoming a completely different person overnight! This gives "I actually learned from last year" vibes. Well done, you emotionally mature human. 🌟`,
            `This is the energy of someone who's been hurt by ambitious resolutions before. Smart, strategic, achievable. You're not trying to be a hero – you're trying to be slightly better. Respect. ✅`,
            `Look at you, setting goals like a reasonable adult! This is completely doable. The bar is where it should be – challenging but not soul-crushing. January You is looking out for February You. 💚`,
            `This is BFS energy: Big Functional Success. It's not flashy, it won't get you a Netflix special, but it WILL get done. And that's a rare win in 2026. 🏆`,
            `Strategic. Sensible. Sustainable. You're like the spreadsheet of resolution-setters. We're putting our imaginary money on you finishing this one. 💸`
        ]
    };

    const categoryRoasts = roasts[category];
    return categoryRoasts[Math.floor(Math.random() * categoryRoasts.length)];
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
        achievable: 'Actually Achievable!',
        optimistic: 'Optimistic But Possible',
        delusional: 'Delusional (But We Love It)'
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

    // Confetti for achievable
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
    const categoryLabels = {
        achievable: '✅ Actually Achievable',
        optimistic: '🤔 Optimistic But Possible',
        delusional: '🚀 Delusional (But Iconic)'
    };

    const text = `My 2026 resolution "${currentResolution}" was rated: ${categoryLabels[currentResult.category]} by the Resolution Reality Check AI Oracle!\n\nCheck your resolutions: `;
    const url = window.location.href;

    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(tweetUrl, '_blank', 'width=550,height=420');
}

// Confetti Effect
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#22c55e', '#eab308', '#3b82f6', '#a855f7', '#f64f59', '#667eea'];

    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2,
            spin: (Math.random() - 0.5) * 0.2,
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
            p.x += Math.sin(p.angle) * 1.5;
            p.angle += p.spin;
            p.opacity -= 0.005;

            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = p.color;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.angle);
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size / 2);
            ctx.restore();
        });

        if (active) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }

    animate();
}

// Handle window resize for confetti
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
