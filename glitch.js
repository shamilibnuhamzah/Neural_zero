// User Database (Simulated)
const VALID_USERS = [
    {
        email: "unreal@gmail.com",
        password: "676767",
        username: "UNREAL_USER",
        role: "IMORTAL"
    }
];

// Session Management
const SESSION_KEY = 'NGAWI ZONE';
const CURRENT_USER_KEY = 'neural_user';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initBinaryBackground();
    initClock();
    checkSession();
    initLoginForm();
});

// Binary Background Generator
function initBinaryBackground() {
    const binaryBg = document.getElementById('binaryBg');
    if (!binaryBg) return;
    
    let binaryText = '';
    for(let i = 0; i < 3000; i++) {
        binaryText += Math.random() > 0.5 ? '1' : '0';
        if(i % 100 === 0) binaryText += '<br>';
    }
    binaryBg.innerHTML = binaryText;
}

// Real-time Clock
function initClock() {
    function updateClock() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: false });
        const clockEl = document.getElementById('clock');
        if (clockEl) clockEl.textContent = timeString;
    }
    setInterval(updateClock, 1000);
    updateClock();
}

// Check Active Session
function checkSession() {
    const session = localStorage.getItem(SESSION_KEY);
    const user = localStorage.getItem(CURRENT_USER_KEY);
    
    if (session && user) {
        const sessionData = JSON.parse(session);
        if (new Date().getTime() < sessionData.expires) {
            showDashboard(JSON.parse(user));
        } else {
            clearSession();
        }
    }
}

// Login Form Handler
function initLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
}

// Login Logic
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');
    const btn = document.querySelector('.btn-login');
    
    // Reset error
    errorMsg.textContent = '';
    
    // Simulate processing
    btn.textContent = 'AUTHENTICATING...';
    btn.disabled = true;
    btn.style.background = '#333';
    
    setTimeout(() => {
        const user = VALID_USERS.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Success
            btn.textContent = 'ACCESS_GRANTED';
            btn.style.background = '#00ff41';
            btn.style.color = '#000';
            
            // Create session
            createSession(user);
            
            setTimeout(() => {
                showDashboard(user);
            }, 1000);
        } else {
            // Failed
            btn.textContent = 'ACCESS_DENIED';
            btn.style.background = '#ff0000';
            
            errorMsg.textContent = '> ERROR: INVALID CREDENTIALS // SYSTEM LOCKED';
            
            // Shake effect
            const loginBox = document.querySelector('.login-box');
            loginBox.classList.add('shake');
            setTimeout(() => loginBox.classList.remove('shake'), 500);
            
            setTimeout(() => {
                btn.textContent = 'INITIALIZE_LOGIN';
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 2000);
        }
    }, 1500);
}

// Create Session
function createSession(user) {
    const session = {
        expires: new Date().getTime() + (24 * 60 * 60 * 1000) // 24 hours
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Clear Session
function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(CURRENT_USER_KEY);
}

// Logout
function logout() {
    clearSession();
    location.reload();
}

// Show Dashboard
function showDashboard(user) {
    // Hide login container
    const container = document.querySelector('.container');
    if (container) container.innerHTML = '';
    
    // Create dashboard HTML
    const dashboardHTML = `
        <div class="dashboard-container">
            <nav class="nav-bar">
                <div class="nav-brand glitch" data-text="NEURAL_TOPUP">NEURAL_TOPUP</div>
                <div class="nav-user">
                    <span class="user-info">[${user.role}] ${user.username}</span>
                    <button class="btn-logout" onclick="logout()">TERMINATE_SESSION</button>
                </div>
            </nav>
            
            <div class="main-content">
                <div class="welcome-section">
                    <h2 class="welcome-text glitch" data-text="WELCOME_BACK_OPERATOR">WELCOME_BACK_OPERATOR</h2>
                    <p style="color: #888;">// SECURE CONNECTION ESTABLISHED // USER_VERIFIED: ${user.email} //</p>
                </div>
                
                <div class="promo-banner">
                    <div class="promo-text">⚠ FLASH_SALE: 50% OFF ALL DIAMOND PACKAGES ⚠</div>
                    <p style="color: #ccc;">LIMITED_TIME_OFFER // EXPIRES_IN: 02:45:33 // USE_CODE: GLITCH777</p>
                </div>
                
                <h3 class="section-title glitch" data-text="DIAMOND_PACKAGES">DIAMOND_PACKAGES</h3>
                <div class="grid-container">
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">STARTER_PACK</span>
                            <span class="card-badge">HOT</span>
                        </div>
                        <div class="card-price">86 💎</div>
                        <div class="card-desc">+8 Bonus Diamonds<br>Instant Delivery<br>24/7 Support</div>
                        <button class="btn-buy" onclick="processOrder('86 Diamonds', 'Rp 12.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">WARRIOR_PACK</span>
                            <span class="card-badge">POPULAR</span>
                        </div>
                        <div class="card-price">172 💎</div>
                        <div class="card-desc">+16 Bonus Diamonds<br>Instant Delivery<br>24/7 Support</div>
                        <button class="btn-buy" onclick="processOrder('172 Diamonds', 'Rp 24.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">ELITE_PACK</span>
                            <span class="card-badge">BEST</span>
                        </div>
                        <div class="card-price">257 💎</div>
                        <div class="card-desc">+25 Bonus Diamonds<br>Instant Delivery<br>Priority Support</div>
                        <button class="btn-buy" onclick="processOrder('257 Diamonds', 'Rp 36.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">MASTER_PACK</span>
                            <span class="card-badge">VIP</span>
                        </div>
                        <div class="card-price">344 💎</div>
                        <div class="card-desc">+34 Bonus Diamonds<br>Instant Delivery<br>VIP Support</div>
                        <button class="btn-buy" onclick="processOrder('344 Diamonds', 'Rp 48.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">EPIC_PACK</span>
                            <span class="card-badge">RARE</span>
                        </div>
                        <div class="card-price">429 💎</div>
                        <div class="card-desc">+43 Bonus Diamonds<br>Instant Delivery<br>VIP Support</div>
                        <button class="btn-buy" onclick="processOrder('429 Diamonds', 'Rp 60.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">LEGEND_PACK</span>
                            <span class="card-badge">MYTHIC</span>
                        </div>
                        <div class="card-price">514 💎</div>
                        <div class="card-desc">+51 Bonus Diamonds<br>Instant Delivery<br>Exclusive Support</div>
                        <button class="btn-buy" onclick="processOrder('514 Diamonds', 'Rp 72.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">MYTHIC_PACK</span>
                            <span class="card-badge">LIMITED</span>
                        </div>
                        <div class="card-price">600 💎</div>
                        <div class="card-desc">+60 Bonus Diamonds<br>Instant Delivery<br>Exclusive Support</div>
                        <button class="btn-buy" onclick="processOrder('600 Diamonds', 'Rp 84.000')">INITIATE_PURCHASE</button>
                    </div>
                    
                    <div class="card">
                        <div class="card-header">
                            <span class="card-title">GLORY_PACK</span>
                            <span class="card-badge">MAX</span>
                        </div>
                        <div class="card-price">706 💎</div>
                        <div class="card-desc">+70 Bonus Diamonds<br>Instant Delivery<br>White Glove Service</div>
                        <button class="btn-buy" onclick="processOrder('706 Diamonds', 'Rp 98.000')">INITIATE_PURCHASE</button>
                    </div>
                </div>
                
                <div class="joki-section">
                    <h3 class="joki-title glitch" data-text="JOKI_RANK_SERVICES">JOKI_RANK_SERVICES</h3>
                    <p style="color: #888; margin-bottom: 20px;">// PROFESSIONAL_BOOSTING_SERVICE // SAFE // FAST // UNDETECTED //</p>
                    
                    <div class="joki-grid">
                        <div class="joki-item">
                            <div class="rank-icon">🥉</div>
                            <h4 style="color: #cd7f32; margin-bottom: 10px;">WARRIOR_TO_ELITE</h4>
                            <p style="color: #00ff41; font-size: 1.2em;">Rp 25.000</p>
                            <p style="color: #666; font-size: 0.8em; margin-top: 10px;">Est: 1-2 Days</p>
                            <button class="btn-buy" style="margin-top: 15px;" onclick="processJoki('Warrior to Elite', 'Rp 25.000')">ORDER_JOKI</button>
                        </div>
                        
                        <div class="joki-item">
                            <div class="rank-icon">🥈</div>
                            <h4 style="color: #c0c0c0; margin-bottom: 10px;">ELITE_TO_MASTER</h4>
                            <p style="color: #00ff41; font-size: 1.2em;">Rp 50.000</p>
                            <p style="color: #666; font-size: 0.8em; margin-top: 10px;">Est: 2-3 Days</p>
                            <button class="btn-buy" style="margin-top: 15px;" onclick="processJoki('Elite to Master', 'Rp 50.000')">ORDER_JOKI</button>
                        </div>
                        
                        <div class="joki-item">
                            <div class="rank-icon">🥇</div>
                            <h4 style="color: #ffd700; margin-bottom: 10px;">MASTER_TO_GRANDMASTER</h4>
                            <p style="color: #00ff41; font-size: 1.2em;">Rp 100.000</p>
                            <p style="color: #666; font-size: 0.8em; margin-top: 10px;">Est: 3-5 Days</p>
                            <button class="btn-buy" style="margin-top: 15px;" onclick="processJoki('Master to Grandmaster', 'Rp 100.000')">ORDER_JOKI</button>
                        </div>
                        
                        <div class="joki-item">
                            <div class="rank-icon">💎</div>
                            <h4 style="color: #00ffff; margin-bottom: 10px;">GRANDMASTER_TO_EPIC</h4>
                            <p style="color: #00ff41; font-size: 1.2em;">Rp 150.000</p>
                            <p style="color: #666; font-size: 0.8em; margin-top: 10px;">Est: 5-7 Days</p>
                            <button class="btn-buy" style="margin-top: 15px;" onclick="processJoki('Grandmaster to Epic', 'Rp 150.000')">ORDER_JOKI</button>
                        </div>
                        
                        <div class="joki-item">
                            <div class="rank-icon">👑</div>
                            <h4 style="color: #ff0000; margin-bottom: 10px;">EPIC_TO_LEGEND</h4>
                            <p style="color: #00ff41; font-size: 1.2em;">Rp 250.000</p>
                            <p style="color: #666; font-size: 0.8em; margin-top: 10px;">Est: 7-10 Days</p>
                            <button class="btn-buy" style="margin-top: 15px;" onclick="processJoki('Epic to Legend', 'Rp 250.000')">ORDER_JOKI</button>
                        </div>
                        
                        <div class="joki-item">
                            <div class="rank-icon">🔥</div>
                            <h4 style="color: #ff4500; margin-bottom: 10px;">LEGEND_TO_MYTHIC</h4>
                            <p style="color: #00ff41; font-size: 1.2em;">Rp 400.000</p>
                            <p style="color: #666; font-size: 0.8em; margin-top: 10px;">Est: 10-14 Days</p>
                            <button class="btn-buy" style="margin-top: 15px;" onclick="processJoki('Legend to Mythic', 'Rp 400.000')">ORDER_JOKI</button>
                        </div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 50px; padding: 20px; border-top: 1px solid #333; color: #444; font-size: 0.8em;">
                    <p>// NEURAL_TOPUP v2.0.77 // SECURE_TRANSACTION_PROTOCOL // ENCRYPTED_CONNECTION //</p>
                    <p style="margin-top: 10px;">© 2026 NEURAL SYSTEMS. ALL_RIGHTS_RESERVED.</p>
                </div>
            </div>
        </div>
    `;
    
    // Replace body content
    document.body.innerHTML = `
        <div class="scanline"></div>
        <div class="binary-bg" id="binaryBg"></div>
        ${dashboardHTML}
    `;
    
    // Re-initialize binary background
    initBinaryBackground();
    
    // Console success message
    console.log('%c ACCESS_GRANTED ', 'background: #00ff41; color: #000; font-size: 20px; font-weight: bold;');
    console.log('%c > USER: ' + user.username, 'color: #00ffff; font-family: monospace;');
    console.log('%c > ROLE: ' + user.role, 'color: #ff0000; font-family: monospace;');
    console.log('%c > SESSION: ACTIVE', 'color: #00ff41; font-family: monospace;');
}

// Process Order
function processOrder(item, price) {
    const btn = event.target;
    const originalText = btn.textContent;
    
    btn.textContent = 'PROCESSING...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'CONFIRMED';
        btn.style.background = '#00ff41';
        btn.style.color = '#000';
        
        alert(`[ORDER_INITIATED]\n\nItem: ${item}\nPrice: ${price}\nStatus: PENDING_PAYMENT\n\nPlease complete payment to proceed.`);
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 2000);
    }, 1500);
}

// Process Joki
function processJoki(service, price) {
    const btn = event.target;
    const originalText = btn.textContent;
    
    btn.textContent = 'VERIFYING...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'QUEUED';
        btn.style.background = '#00ff41';
        btn.style.color = '#000';
        
        alert(`[JOKI_SERVICE_QUEUED]\n\nService: ${service}\nPrice: ${price}\nStatus: WAITING_FOR_BOOSTER\n\nOur agent will contact you shortly.`);
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 2000);
    }, 1500);
}

// Console Easter Egg
console.log('%c NEURAL_TOPUP SYSTEM ', 'background: #ff0000; color: #fff; font-size: 20px; font-weight: bold;');
console.log('%c > STANDBY_MODE ', 'color: #00ff41; font-family: monospace;');
console.log('%c > WAITING_FOR_AUTHENTICATION... ', 'color: #00ffff; font-family: monospace;');