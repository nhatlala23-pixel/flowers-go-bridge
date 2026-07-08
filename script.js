/**
 * Flowers Go - Bridge Page Script
 * Handles device detection, deep link routing, and fallback states.
 */

// --- CONFIGURATION ---
const DEEP_LINK_URL = 'flowersgo://login';
const APK_DOWNLOAD_URL = './app-debug.apk'; // Đường dẫn file APK chạy trên website của bạn
const DEV_CONTACT_URL = 'https://m.me/flowersgo'; // Cấu hình link liên hệ nhà phát triển ở đây
const REDIRECT_TIMEOUT = 1500; // Thời gian chờ trước khi hiện nút tải (ms)
const TRANSITION_DELAY = 800; // Thời gian hiển thị loading "kiểm tra thiết bị" (ms)

// --- DOM ELEMENTS ---
const stateChecking = document.getElementById('state-checking');
const stateAndroid = document.getElementById('state-android');
const stateIos = document.getElementById('state-ios');
const stateDesktop = document.getElementById('state-desktop');

const androidRedirecting = document.getElementById('android-redirecting');
const androidDownload = document.getElementById('android-download');

const btnDownloadApk = document.getElementById('btn-download-apk');
const btnRetryOpen = document.getElementById('btn-retry-open');
const btnContactDev = document.getElementById('btn-contact-dev');
const qrCodeImg = document.getElementById('qr-code-img');
const qrPlaceholder = document.querySelector('.qr-loading-placeholder');

// --- INITIALIZE CONFIGURATION LINKS ---
btnDownloadApk.href = APK_DOWNLOAD_URL;
btnContactDev.href = DEV_CONTACT_URL;

// --- DEVICE DETECTION LOGIC ---
function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    // Check for Android
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    
    // Check for iOS (iPhone, iPad, iPod)
    // Note: iPad on iOS 13+ reports as Macintosh but supports touch points
    const isIOS = /iPad|iPhone|iPod/.test(userAgent) || 
                  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                  
    if (isIOS && !window.MSStream) {
        return 'ios';
    }
    
    // Default to desktop
    return 'desktop';
}

// --- STATE MANAGEMENT ---
function switchState(targetStateView) {
    // Hide all state views
    [stateChecking, stateAndroid, stateIos, stateDesktop].forEach(view => {
        view.classList.remove('active');
    });
    
    // Show target view with a slight delay for smooth transition
    setTimeout(() => {
        targetStateView.classList.add('active');
    }, 50);
}

// --- ANDROID REDIRECT FLOW ---
let redirectTimer = null;

function tryOpenAndroidApp() {
    // Reset sub-state visibility
    androidDownload.classList.remove('active');
    androidRedirecting.classList.add('active');
    
    // Attempt deep link
    window.location.href = DEEP_LINK_URL;
    
    // Fallback timer: if the app is not opened, transition to the APK download view
    redirectTimer = setTimeout(() => {
        showAndroidDownloadFallback();
    }, REDIRECT_TIMEOUT);
}

function showAndroidDownloadFallback() {
    androidRedirecting.classList.remove('active');
    setTimeout(() => {
        androidDownload.classList.add('active');
    }, 200);
}

// Clean up timer if user navigates away or app opens successfully
function clearRedirectTimer() {
    if (redirectTimer) {
        clearTimeout(redirectTimer);
        redirectTimer = null;
    }
}

// Listen to visibility changes (if app opens, page becomes hidden)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        clearRedirectTimer();
    }
});

window.addEventListener('pagehide', clearRedirectTimer);
window.addEventListener('blur', clearRedirectTimer);

// --- DESKTOP QR GENERATION ---
function generateDesktopQR() {
    // Generate QR using public API (qrserver.com) pointing to current page url
    const currentUrl = window.location.href;
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentUrl)}&color=090714&margin=0`;
    
    qrCodeImg.src = qrApiUrl;
    
    qrCodeImg.onload = () => {
        qrCodeImg.classList.add('loaded');
        if (qrPlaceholder) {
            qrPlaceholder.style.display = 'none';
        }
    };
}

// --- EVENT LISTENERS ---
btnRetryOpen.addEventListener('click', (e) => {
    e.preventDefault();
    tryOpenAndroidApp();
});

// --- MAIN RUNNER ---
window.addEventListener('DOMContentLoaded', () => {
    // Perform checking state delay for premium user experience
    setTimeout(() => {
        const device = detectDevice();
        
        if (device === 'android') {
            switchState(stateAndroid);
            tryOpenAndroidApp();
        } else if (device === 'ios') {
            switchState(stateIos);
        } else {
            switchState(stateDesktop);
            generateDesktopQR();
        }
    }, TRANSITION_DELAY);
});
