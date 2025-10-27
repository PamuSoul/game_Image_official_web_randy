// 網站主要 JavaScript 功能

// 截圖配置
const SCREENSHOT_CONFIG = {
    'screenshot1.jpg': { alt: '戰鬥畫面', title: '金蘭結義' },
    'screenshot2.jpg': { alt: '美麗場景', title: '跨服BOSS' },
    'screenshot3.jpg': { alt: '角色互動', title: '五行' },
    'screenshot4.jpg': { alt: '技能展示', title: '歸墟' },
    'screenshot5.jpg': { alt: '戰鬥畫面2', title: '情緣' },
    'screenshot6.jpg': { alt: '美麗場景2', title: '領域' },
    'screenshot7.jpg': { alt: '角色互動2', title: '鴻蒙' },
    'screenshot8.jpg': { alt: '技能展示2', title: '神技' },
    'screenshot9.jpg': { alt: '新功能展示', title: '創新玩法' },
    'screenshot10.jpg': { alt: 'PVP對戰', title: '競技場' },
    'screenshot11.jpg': { alt: '團隊副本', title: '協作戰鬥' },
    'screenshot12.jpg': { alt: '裝備強化', title: '裝備系統' },
    'screenshot13.jpg': { alt: '寵物系統', title: '靈寵夥伴' },
    'screenshot14.jpg': { alt: '公會戰', title: '公會爭霸' },
    'screenshot15.jpg': { alt: '坐騎系統', title: '神駒坐騎' },
    'screenshot16.jpg': { alt: '婚姻系統', title: '結緣成親' },
    'screenshot17.jpg': { alt: '房屋系統', title: '家園建設' },
    'screenshot18.jpg': { alt: '釣魚系統', title: '悠閒垂釣' },
    'screenshot19.jpg': { alt: '煉丹系統', title: '丹藥煉製' },
    'screenshot20.jpg': { alt: '世界BOSS', title: '世界首領' },
    // 可以繼續添加更多配置
};

// 角色配置
const CHARACTER_CONFIG = {
    'character1.png': { name: '地藏', description: '慈悲皆虛妄，一念化成魔' },
    'character2.png': { name: '神策', description: '神弓天狼度，槍轉裂蒼穹' },
    'character3.png': { name: '龍吟', description: '御劍乘雲起，龍吟動九霄' },
    'character4.png': { name: '靈霄', description: '一點寒芒破，靈槍映日紅' },
    'character5.png': { name: '琉璃', description: '琉璃劍心落，紫霞轉乾坤' },
    'character6.png': { name: '靈狐仙師', description: '化形狐妖，精通幻術與咒法' },
    'character7.png': { name: '烈焰法師', description: '掌控火焰之力的強大法師' },
    'character8.png': { name: '冰霜女王', description: '冰雪世界的絕美統治者' },
    'character9.png': { name: '雷神戰士', description: '雷電加身的無敵戰士' },
    'character10.png': { name: '暗夜精靈', description: '黑暗中的優雅舞者' },
    'character11.png': { name: '聖光牧師', description: '光明之力的虔誠信仰者' },
    'character12.png': { name: '龍騎士', description: '與巨龍共舞的勇敢騎士' },
    'character13.png': { name: '星空術士', description: '探索星辰奧秘的智者' },
    'character14.png': { name: '森林守護', description: '保護自然的古老精靈' },
    'character15.png': { name: '血族伯爵', description: '永生不死的神秘貴族' },
    'character16.png': { name: '鳳凰舞姬', description: '浴火重生的美麗舞者' },
    'character17.png': { name: '機甲戰神', description: '科技與力量的完美結合' },
    'character18.png': { name: '深海女神', description: '海洋深處的神秘統治者' },
    'character19.png': { name: '風暴領主', description: '掌控狂風暴雨的強者' },
    'character20.png': { name: '時空法師', description: '操縱時間與空間的至尊' },
    // 可以繼續添加更多配置
};

// 動態載入截圖
async function loadScreenshotsDynamically() {
    const wrapper = document.getElementById('screenshotsWrapper');
    const indicatorsContainer = document.querySelector('.screenshot-indicators');

    if (!wrapper || !indicatorsContainer) {
        console.log('截圖容器未找到，使用靜態內容');
        return false;
    }

    const loadedScreenshots = [];

    // 嘗試載入截圖（從 1 開始，最多嘗試 50 張）
    for (let i = 1; i <= 50; i++) {
        const filename = `screenshot${i}.jpg`;
        const imagePath = `images/${filename}`;

        try {
            const exists = await checkImageExists(imagePath);
            if (exists) {
                loadedScreenshots.push({
                    filename,
                    path: imagePath,
                    config: SCREENSHOT_CONFIG[filename] || {
                        alt: `遊戲圖片${i}`,
                        title: `遊戲畫面${i}`
                    }
                });
            } else {
                // 連續 3 張不存在就停止檢查
                if (i > loadedScreenshots.length + 3) break;
            }
        } catch (error) {
            continue;
        }
    }

    if (loadedScreenshots.length === 0) {
        console.log('沒有找到動態截圖，保持靜態內容');
        return false;
    }

    // 清空現有內容
    wrapper.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    // 生成截圖 HTML
    loadedScreenshots.forEach((screenshot, index) => {
        const screenshotItem = document.createElement('div');
        screenshotItem.className = 'screenshot-item';
        screenshotItem.innerHTML = `
            <img src="${screenshot.path}" alt="${screenshot.config.alt}" loading="lazy">
            <div class="screenshot-overlay">
                <h4>${screenshot.config.title}</h4>
            </div>
        `;
        wrapper.appendChild(screenshotItem);
    });

    // 計算需要的指示器數量（基於桌面版一次顯示4張）
    const visibleSlides = 4;
    const maxSlide = Math.max(0, loadedScreenshots.length - visibleSlides);

    // 生成指示器
    for (let i = 0; i <= maxSlide; i++) {
        const indicator = document.createElement('span');
        indicator.className = `indicator${i === 0 ? ' active' : ''}`;
        indicator.setAttribute('data-slide', i.toString());
        indicatorsContainer.appendChild(indicator);
    }

    console.log(`動態載入了 ${loadedScreenshots.length} 張截圖，生成了 ${maxSlide + 1} 個指示器`);
    return true;
}

// 動態載入角色
async function loadCharactersDynamically() {
    const wrapper = document.getElementById('charactersWrapper');
    const indicatorsContainer = document.querySelector('.character-indicators');

    if (!wrapper || !indicatorsContainer) {
        console.log('角色容器未找到，使用靜態內容');
        return false;
    }

    const loadedCharacters = [];

    // 嘗試載入角色（從 1 開始，最多嘗試 30 張）
    for (let i = 1; i <= 30; i++) {
        const filename = `character${i}.png`;
        const imagePath = `images/${filename}`;

        try {
            const exists = await checkImageExists(imagePath);
            if (exists) {
                loadedCharacters.push({
                    filename,
                    path: imagePath,
                    config: CHARACTER_CONFIG[filename] || {
                        name: `角色${i}`,
                        description: `神秘的角色${i}，等待您的探索`
                    }
                });
            } else {
                // 連續 3 張不存在就停止檢查
                if (i > loadedCharacters.length + 3) break;
            }
        } catch (error) {
            continue;
        }
    }

    if (loadedCharacters.length === 0) {
        console.log('沒有找到動態角色，保持靜態內容');
        return false;
    }

    // 清空現有內容
    wrapper.innerHTML = '';
    indicatorsContainer.innerHTML = '';

    // 生成角色 HTML
    loadedCharacters.forEach((character, index) => {
        const characterCard = document.createElement('div');
        characterCard.className = 'character-card';
        characterCard.innerHTML = `
            <div class="character-card-inner">
                <img src="${character.path}" alt="${character.config.name}" loading="lazy">
                <div class="character-info">
                    <h3>${character.config.name}</h3>
                    <p>${character.config.description}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(characterCard);
    });

    // 計算需要的指示器數量（基於桌面版一次顯示3張）
    const visibleSlides = 3;
    const maxSlide = Math.max(0, loadedCharacters.length - visibleSlides);

    // 生成指示器
    for (let i = 0; i <= maxSlide; i++) {
        const indicator = document.createElement('span');
        indicator.className = `indicator${i === 0 ? ' active' : ''}`;
        indicator.setAttribute('data-slide', i.toString());
        indicatorsContainer.appendChild(indicator);
    }

    console.log(`動態載入了 ${loadedCharacters.length} 個角色，生成了 ${maxSlide + 1} 個指示器`);
    return true;
}

// 檢查圖片是否存在
function checkImageExists(imagePath) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = imagePath;

        // 設置超時，避免等待太久
        setTimeout(() => resolve(false), 1000);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // 初始化所有功能
    initNavigation();
    initScrollEffects();

    // 動態載入內容
    Promise.all([
        loadScreenshotsDynamically(),
        loadCharactersDynamically()
    ]).then(([screenshotSuccess, characterSuccess]) => {
        // 初始化輪播功能
        if (screenshotSuccess) {
            console.log('使用動態截圖載入');
        } else {
            console.log('使用靜態截圖內容');
        }
        initScreenshotGallery();

        if (characterSuccess) {
            console.log('使用動態角色載入');
        } else {
            console.log('使用靜態角色內容');
        }
        initCharacterShowcase();

        // 初始化其他功能
        initSmoothScroll();
        initLoadingAnimation();
        initParticleBackground();
        initNewsTabs();
    }).catch(() => {
        console.log('動態載入失敗，使用靜態內容');
        // 如果動態載入失敗，仍然初始化基本功能
        initCharacterShowcase();
        initScreenshotGallery();
        initSmoothScroll();
        initLoadingAnimation();
        initParticleBackground();
        initNewsTabs();
    });
});

// 導航欄功能
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');

    // 手機菜單切換
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // 點擊菜單項時關閉菜單
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // 導航欄滾動效果
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// 滾動效果
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 添加淡入效果到所有區段
    const sections = document.querySelectorAll('section, .feature-card, .character-card, .news-item');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// 角色輪播功能
function initCharacterShowcase() {
    const wrapper = document.getElementById('charactersWrapper');
    const prevBtn = document.getElementById('charPrevBtn');
    const nextBtn = document.getElementById('charNextBtn');
    const indicators = document.querySelectorAll('.character-indicators .indicator');
    const characterCards = document.querySelectorAll('.character-card');

    if (!wrapper || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    const totalSlides = characterCards.length;

    // 根據螢幕寬度決定顯示數量
    function getVisibleSlides() {
        const width = window.innerWidth;
        if (width <= 480) return 1; // 手機顯示1張
        if (width <= 768) return 2; // 平板顯示2張
        return 3; // 桌面顯示3張
    }

    function getSlideWidth() {
        const visibleSlides = getVisibleSlides();
        return 100 / visibleSlides; // 每張角色卡片的寬度百分比
    }

    function getMaxSlide() {
        const visibleSlides = getVisibleSlides();
        return Math.max(0, totalSlides - visibleSlides);
    }

    // 更新CSS中每個角色卡片的寬度
    function updateItemWidths() {
        const slideWidth = getSlideWidth();
        characterCards.forEach(card => {
            card.style.width = `${slideWidth}%`;
        });
    }

    // 更新輪播位置
    function updateCarousel() {
        const visibleSlides = getVisibleSlides();
        const slideWidth = getSlideWidth();
        const translateX = -currentSlide * slideWidth;
        wrapper.style.transform = `translateX(${translateX}%)`;

        // 更新指示器
        const maxSlide = getMaxSlide();
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
            indicator.style.display = index <= maxSlide ? 'block' : 'none';
        });

        // 更新按鈕狀態
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === maxSlide;
    }

    // 下一張
    function nextSlide() {
        const maxSlide = getMaxSlide();
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    }

    // 上一張
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }

    // 跳轉到指定位置
    function goToSlide(index) {
        const maxSlide = getMaxSlide();
        if (index >= 0 && index <= maxSlide) {
            currentSlide = index;
            updateCarousel();
        }
    }

    // 事件監聽器
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 指示器點擊事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // 觸控滑動支援
    let touchStartX = 0;
    let touchEndX = 0;

    const charactersContainer = document.querySelector('.characters-container');
    if (charactersContainer) {
        charactersContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        charactersContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // 向左滑動，顯示下一張
                    nextSlide();
                } else {
                    // 向右滑動，顯示上一張
                    prevSlide();
                }
            }
        }
    }

    // 自動播放
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const maxSlide = getMaxSlide();
            if (currentSlide < maxSlide) {
                nextSlide();
            } else {
                currentSlide = 0;
                updateCarousel();
            }
        }, 5000); // 5秒自動切換
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // 視窗大小改變時重新計算
    function handleResize() {
        const maxSlide = getMaxSlide();
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        updateItemWidths();
        updateCarousel();
    }

    // 初始化函數
    function init() {
        updateItemWidths();
        updateCarousel();
        startAutoplay();
    }

    // 滑鼠懸停時暫停自動播放
    const carousel = document.querySelector('.character-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // 視窗大小改變監聽
    window.addEventListener('resize', handleResize);

    // 初始化
    init();
}

// 截圖輪播功能
function initScreenshotGallery() {
    const wrapper = document.getElementById('screenshotsWrapper');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicators = document.querySelectorAll('.screenshot-indicators .indicator');
    const screenshotItems = document.querySelectorAll('.screenshot-item');

    if (!wrapper || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    const totalSlides = screenshotItems.length;

    // 根據螢幕寬度決定顯示數量
    function getVisibleSlides() {
        const width = window.innerWidth;
        if (width <= 480) return 1; // 手機顯示1張
        if (width <= 768) return 2; // 平板顯示2張
        return 4; // 桌面顯示4張
    }

    function getSlideWidth() {
        const visibleSlides = getVisibleSlides();
        return 100 / visibleSlides; // 每張圖片的寬度百分比
    }

    function getMaxSlide() {
        const visibleSlides = getVisibleSlides();
        return Math.max(0, totalSlides - visibleSlides);
    }

    // 更新CSS中每個圖片的寬度
    function updateItemWidths() {
        const slideWidth = getSlideWidth();
        screenshotItems.forEach(item => {
            item.style.width = `${slideWidth}%`;
        });
    }

    // 更新輪播位置
    function updateCarousel() {
        const visibleSlides = getVisibleSlides();
        const slideWidth = getSlideWidth();
        const translateX = -currentSlide * slideWidth;
        wrapper.style.transform = `translateX(${translateX}%)`;

        // 更新指示器
        const maxSlide = getMaxSlide();
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
            indicator.style.display = index <= maxSlide ? 'block' : 'none';
        });

        // 更新按鈕狀態
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === maxSlide;
    }

    // 下一張
    function nextSlide() {
        const maxSlide = getMaxSlide();
        if (currentSlide < maxSlide) {
            currentSlide++;
            updateCarousel();
        }
    }

    // 上一張
    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    }

    // 跳轉到指定位置
    function goToSlide(index) {
        const maxSlide = getMaxSlide();
        if (index >= 0 && index <= maxSlide) {
            currentSlide = index;
            updateCarousel();
        }
    }

    // 事件監聽器
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // 指示器點擊事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // 鍵盤控制
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });

    // 觸控滑動支援
    let touchStartX = 0;
    let touchEndX = 0;

    const screenshotsContainer = document.querySelector('.screenshots-container');
    if (screenshotsContainer) {
        screenshotsContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        screenshotsContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = touchStartX - touchEndX;

            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    // 向左滑動，顯示下一張
                    nextSlide();
                } else {
                    // 向右滑動，顯示上一張
                    prevSlide();
                }
            }
        }
    }

    // 窗口大小改變時重新計算
    window.addEventListener('resize', () => {
        updateItemWidths();
        currentSlide = Math.min(currentSlide, getMaxSlide());
        updateCarousel();
    });

    // 初始化
    updateItemWidths();
    updateCarousel();

    // 點擊圖片打開模態窗口
    screenshotItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            openImageModal(img.src, img.alt);
        });
    });

    // 自動播放（可選）
    let autoplayInterval;

    function startAutoplay() {
        autoplayInterval = setInterval(() => {
            const maxSlide = getMaxSlide();
            if (currentSlide < maxSlide) {
                nextSlide();
            } else {
                currentSlide = 0;
                updateCarousel();
            }
        }, 4000); // 4秒自動切換
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // 視窗大小改變時重新計算
    function handleResize() {
        const maxSlide = getMaxSlide();
        if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
        }
        updateItemWidths();
        updateCarousel();
    }

    // 初始化函數
    function init() {
        updateItemWidths();
        updateCarousel();
        startAutoplay();
    }

    // 滑鼠懸停時暫停自動播放
    const carousel = document.querySelector('.screenshot-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoplay);
        carousel.addEventListener('mouseleave', startAutoplay);
    }

    // 視窗大小改變監聽
    window.addEventListener('resize', handleResize);

    // 初始化
    init();
}

// 圖片模態窗口
function openImageModal(src, alt) {
    // 創建模態窗口
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="modal-content">
                <img src="${src}" alt="${alt}">
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;

    // 添加樣式
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
    `;

    const backdrop = modal.querySelector('.modal-backdrop');
    backdrop.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(5px);
    `;

    const content = modal.querySelector('.modal-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        z-index: 10001;
    `;

    const img = modal.querySelector('img');
    img.style.cssText = `
        width: 100%;
        height: 100%;
        object-fit: contain;
        border-radius: 10px;
    `;

    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10002;
    `;

    // 關閉功能
    const closeModal = () => {
        modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);

    // ESC 鍵關閉
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);

    document.body.appendChild(modal);
}

// 平滑滾動
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // 考慮導航欄高度

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 載入動畫
function initLoadingAnimation() {
    // 創建載入畫面
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = '<div class="loading-spinner"></div>';

    document.body.appendChild(loading);

    // 模擬載入時間
    setTimeout(() => {
        loading.style.opacity = '0';
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1500);
}

// 粒子背景效果
function initParticleBackground() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;

    // 創建粒子容器
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;

    // 創建粒子
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(244, 208, 63, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
        `;

        particleContainer.appendChild(particle);
    }

    heroSection.appendChild(particleContainer);
}

// 下載按鈕功能
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('download-btn') || e.target.closest('.download-btn')) {
        e.preventDefault();
        showDownloadModal();
    }
});

// 下載模態窗口
function showDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'download-modal';
    modal.innerHTML = `
        <div class="modal-backdrop">
            <div class="download-modal-content">
                <h3>選擇下載平台</h3>
                <div class="download-platforms">
                    <a href="#" class="platform-download ios" data-platform="ios">
                        <span class="platform-icon">📱</span>
                        <div>
                            <strong>iOS 版本</strong>
                            <p>適用於 iPhone 和 iPad</p>
                        </div>
                    </a>
                    <a href="#" class="platform-download android" data-platform="android">
                        <span class="platform-icon">🤖</span>
                        <div>
                            <strong>Android 版本</strong>
                            <p>適用於 Android 手機</p>
                        </div>
                    </a>
                    <a href="#" class="platform-download pc" data-platform="pc">
                        <span class="platform-icon">💻</span>
                        <div>
                            <strong>PC 版本</strong>
                            <p>適用於 Windows 和 Mac</p>
                        </div>
                    </a>
                </div>
                <button class="modal-close">&times;</button>
            </div>
        </div>
    `;

    // 添加樣式
    const style = document.createElement('style');
    style.textContent = `
        .download-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .download-modal .modal-backdrop {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .download-modal-content {
            position: relative;
            background: white;
            padding: 2rem;
            border-radius: 20px;
            max-width: 500px;
            width: 90%;
            z-index: 10001;
            text-align: center;
        }
        
        .download-modal-content h3 {
            margin-bottom: 2rem;
            color: #333;
            font-size: 1.5rem;
        }
        
        .download-platforms {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .platform-download {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1rem;
            border: 2px solid #eee;
            border-radius: 10px;
            text-decoration: none;
            color: #333;
            transition: all 0.3s ease;
        }
        
        .platform-download:hover {
            border-color: #f4d03f;
            background: #f9f9f9;
        }
        
        .platform-icon {
            font-size: 2rem;
        }
        
        .platform-download div {
            text-align: left;
        }
        
        .platform-download strong {
            display: block;
            margin-bottom: 0.25rem;
        }
        
        .platform-download p {
            margin: 0;
            color: #666;
            font-size: 0.9rem;
        }
        
        .download-modal .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #666;
        }
    `;

    document.head.appendChild(style);

    // 關閉功能
    const closeModal = () => {
        modal.remove();
        style.remove();
    };

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    // 平台下載事件
    modal.querySelectorAll('.platform-download').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = e.currentTarget.getAttribute('data-platform');
            handleDownload(platform);
            closeModal();
        });
    });

    document.body.appendChild(modal);
}

// 處理下載
function handleDownload(platform) {
    const messages = {
        ios: '正在跳轉到 App Store...',
        android: '正在跳轉到 Google Play...',
        pc: '正在準備 PC 版下載...'
    };

    // 顯示下載訊息
    showNotification(messages[platform], 'success');

    // 這裡可以添加實際的下載邏輯
    setTimeout(() => {
        // 模擬下載或跳轉
        console.log(`開始下載 ${platform} 版本`);
    }, 1000);
}

// 通知功能
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(notification);

    // 顯示動畫
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // 自動隱藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 視差滾動效果 (暫時禁用以修復間距問題)
/*
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        const rate = scrolled * -0.5;
        heroBackground.style.transform = `translateY(${rate}px)`;
    }
});
*/

// 鼠標跟隨效果
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        // 創建自定義鼠標
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(244,208,63,0.8) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(newCursor);
    }

    const activeCursor = document.querySelector('.custom-cursor');
    if (activeCursor) {
        activeCursor.style.left = e.clientX - 10 + 'px';
        activeCursor.style.top = e.clientY - 10 + 'px';
    }
});

window.addEventListener('scroll', () => {
    const qrSection = document.querySelector('.qr-section');
    if (qrSection) {
        const scrollY = window.scrollY;
        const baseTop = window.innerHeight / 2; // 初始位置為螢幕中間
        qrSection.style.top = `${baseTop + scrollY}px`; // 跟著頁面滾動
    }
});



// 錯誤處理
window.addEventListener('error', (e) => {
    console.error('網站錯誤:', e.error);
});

// 性能優化：圖片懶加載
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// 初始化懶加載
initLazyLoading();

// 最新消息標籤頁功能
function initNewsTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活動狀態
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // 添加當前按鈕的活動狀態
            btn.classList.add('active');

            // 顯示對應的內容
            const targetTab = btn.getAttribute('data-tab');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // 添加切換動畫效果
            targetContent.style.opacity = '0';
            setTimeout(() => {
                targetContent.style.opacity = '1';
            }, 50);

            // 重置分頁到第一頁
            resetPagination(targetTab);
        });
    });

    // 初始化所有分頁功能
    initPagination();

    // 確保第一個標籤頁的第一頁顯示
    setTimeout(() => {
        goToPage('latest', 1);
    }, 100);

    // 鍵盤導航支持
    document.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('tab-btn')) {
            const currentIndex = Array.from(tabBtns).indexOf(e.target);
            let nextIndex;

            switch (e.key) {
                case 'ArrowRight':
                    e.preventDefault();
                    nextIndex = (currentIndex + 1) % tabBtns.length;
                    tabBtns[nextIndex].focus();
                    tabBtns[nextIndex].click();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    nextIndex = currentIndex === 0 ? tabBtns.length - 1 : currentIndex - 1;
                    tabBtns[nextIndex].focus();
                    tabBtns[nextIndex].click();
                    break;
                case 'Home':
                    e.preventDefault();
                    tabBtns[0].focus();
                    tabBtns[0].click();
                    break;
                case 'End':
                    e.preventDefault();
                    tabBtns[tabBtns.length - 1].focus();
                    tabBtns[tabBtns.length - 1].click();
                    break;
            }
        }
    });
}

// 分頁功能
function initPagination() {
    const paginationContainers = document.querySelectorAll('.pagination');

    paginationContainers.forEach(container => {
        const tab = container.getAttribute('data-tab');
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');
        const pageNums = container.querySelectorAll('.page-num');

        // 頁碼按鈕點擊事件
        pageNums.forEach(pageBtn => {
            pageBtn.addEventListener('click', () => {
                const pageNumber = parseInt(pageBtn.getAttribute('data-page'));
                goToPage(tab, pageNumber);
            });
        });

        // 上一頁按鈕
        prevBtn.addEventListener('click', () => {
            const currentPage = getCurrentPage(tab);
            if (currentPage > 1) {
                goToPage(tab, currentPage - 1);
            }
        });

        // 下一頁按鈕
        nextBtn.addEventListener('click', () => {
            const currentPage = getCurrentPage(tab);
            const totalPages = getTotalPages(tab);
            if (currentPage < totalPages) {
                goToPage(tab, currentPage + 1);
            }
        });
    });
}

// 跳轉到指定頁面
function goToPage(tab, pageNumber) {
    const tabContent = document.getElementById(tab);
    const pages = tabContent.querySelectorAll('.news-page');
    const pagination = tabContent.querySelector('.pagination');

    if (!pagination) return; // 如果沒有分頁控制就退出

    const pageNums = pagination.querySelectorAll('.page-num');
    const prevBtn = pagination.querySelector('.prev');
    const nextBtn = pagination.querySelector('.next');

    // 隱藏所有頁面
    pages.forEach(page => page.classList.remove('active'));

    // 顯示目標頁面 - 修正選擇器
    const targetPage = tabContent.querySelector(`.news-page[data-page="${pageNumber}"]`);
    if (targetPage) {
        targetPage.classList.add('active');
        console.log(`切換到 ${tab} 的第 ${pageNumber} 頁`); // 調試信息
    } else {
        console.error(`找不到 ${tab} 的第 ${pageNumber} 頁`); // 調試信息
    }

    // 更新頁碼按鈕狀態
    pageNums.forEach(btn => btn.classList.remove('active'));
    const targetPageBtn = pagination.querySelector(`.page-num[data-page="${pageNumber}"]`);
    if (targetPageBtn) {
        targetPageBtn.classList.add('active');
    }

    // 更新上一頁/下一頁按鈕狀態
    const totalPages = getTotalPages(tab);
    if (prevBtn) prevBtn.disabled = pageNumber === 1;
    if (nextBtn) nextBtn.disabled = pageNumber === totalPages;

    // 添加動畫效果
    if (targetPage) {
        targetPage.style.opacity = '0';
        setTimeout(() => {
            targetPage.style.opacity = '1';
        }, 100);
    }
}

// 獲取當前頁碼
function getCurrentPage(tab) {
    const tabContent = document.getElementById(tab);
    const activePage = tabContent.querySelector('.news-page.active');
    return activePage ? parseInt(activePage.getAttribute('data-page')) : 1;
}

// 獲取總頁數
function getTotalPages(tab) {
    const tabContent = document.getElementById(tab);
    const pages = tabContent.querySelectorAll('.news-page');
    return pages.length;
}

// 重置分頁到第一頁
function resetPagination(tab) {
    setTimeout(() => {
        goToPage(tab, 1);
    }, 50);
}

// 調試函數 - 檢查分頁結構
function debugPagination() {
    console.log('=== 分頁調試信息 ===');
    const tabs = ['latest', 'news', 'events', 'guides'];

    tabs.forEach(tab => {
        const tabContent = document.getElementById(tab);
        if (tabContent) {
            const pages = tabContent.querySelectorAll('.news-page');
            const pagination = tabContent.querySelector('.pagination');
            console.log(`${tab}: 找到 ${pages.length} 頁，分頁控制: ${pagination ? '存在' : '不存在'}`);

            pages.forEach((page, index) => {
                const pageNumber = page.getAttribute('data-page');
                const isActive = page.classList.contains('active');
                console.log(`  第${index + 1}頁: data-page="${pageNumber}", active=${isActive}`);
            });
        } else {
            console.log(`${tab}: 標籤內容不存在`);
        }
    });
    console.log('==================');
}

// 在頁面載入完成後執行調試
setTimeout(debugPagination, 1000);

// 調試區塊間距
function debugSectionSpacing() {
    console.log('=== 區塊間距調試 ===');
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(section);
        const marginTop = computedStyle.marginTop;
        const marginBottom = computedStyle.marginBottom;
        const paddingTop = computedStyle.paddingTop;
        const paddingBottom = computedStyle.paddingBottom;

        console.log(`Section ${index + 1} (${section.id}):`, {
            height: rect.height,
            marginTop,
            marginBottom,
            paddingTop,
            paddingBottom,
            top: rect.top + window.pageYOffset
        });
    });
    console.log('==================');
}

// 在頁面載入後執行間距調試
setTimeout(debugSectionSpacing, 1500);