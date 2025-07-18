// QuickLearn - Main Application Logic
// Handles all interactions, animations, and learning flow

class QuickLearn {
    constructor() {
        this.currentTopic = null;
        this.currentCardIndex = 0;
        this.totalCards = 0;
        this.isSwipeInProgress = false;
        this.streak = 0;
        this.startX = 0;
        this.startY = 0;
        this.currentX = 0;
        this.currentY = 0;
        this.isDragging = false;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.createParticles();
    }

    // Setup all event listeners
    setupEventListeners() {
        // Topic card interactions
        document.querySelectorAll('.topic-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleTopicClick(e));
            this.addHoverEffects(card);
        });

        // Modal controls
        document.addEventListener('click', (e) => this.handleModalClick(e));
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Prevent zoom on double tap for mobile
        this.preventDoubleTabZoom();
    }

    // Handle topic card clicks
    handleTopicClick(e) {
        const card = e.currentTarget;
        const topic = card.dataset.topic;
        this.currentTopic = topic;
        
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
        
        this.checkPrerequisites(topic);
    }

    // Add hover effects for desktop
    addHoverEffects(card) {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }

    // Check prerequisites before starting learning
    checkPrerequisites(topic) {
        const prereqs = prerequisites[topic].topics;
        
        if (prereqs.length === 0) {
            this.initializeLearning(topic);
            return;
        }

        const modal = document.getElementById('prerequisitesModal');
        const list = document.getElementById('prerequisitesList');
        
        list.innerHTML = prereqs.map(prereq => `
            <li>
                <input type="checkbox" id="prereq-${prereq.replace(/\s+/g, '-')}" />
                <label for="prereq-${prereq.replace(/\s+/g, '-')}">${prereq}</label>
            </li>
        `).join('');
        
        modal.style.display = 'block';
    }

    // Initialize the learning interface
    initializeLearning(topic) {
        const content = learningContent[topic];
        if (!content) return;

        this.currentCardIndex = 0;
        this.totalCards = content.cards.length;
        this.streak = 0;
        
        // Show learning interface with animation
        const learningContainer = document.getElementById('learningContainer');
        learningContainer.style.display = 'block';
        learningContainer.style.opacity = '0';
        
        setTimeout(() => {
            learningContainer.style.opacity = '1';
            learningContainer.style.transition = 'opacity 0.5s ease';
        }, 50);
        
        document.getElementById('topicTitle').textContent = content.title;
        document.body.style.overflow = 'hidden';
        
        this.loadCards(content.cards);
        this.updateProgress();
        this.updateStreak();
    }

    // Load cards into the interface
    loadCards(cards) {
        const cardStack = document.getElementById('cardStack');
        const existingCards = cardStack.querySelectorAll('.learning-card');
        existingCards.forEach(card => card.remove());
        
        // Load next 3 cards for smooth experience
        for (let i = 0; i < Math.min(3, cards.length - this.currentCardIndex); i++) {
            const cardData = cards[this.currentCardIndex + i];
            const cardElement = this.createCard(cardData, i);
            cardStack.appendChild(cardElement);
        }
    }

    // Create a single card element
    createCard(cardData, stackIndex) {
        const card = document.createElement('div');
        card.className = 'learning-card';
        card.style.zIndex = 10 - stackIndex;
        card.style.transform = `scale(${1 - stackIndex * 0.03}) translateY(${stackIndex * 8}px) translateZ(${-stackIndex * 50}px)`;
        card.style.opacity = 1 - stackIndex * 0.1;
        
        let cardContent = `
            <div class="card-content">
                <h2>${cardData.title}</h2>
                <p>${cardData.content}</p>
        `;
        
        if (cardData.code) {
            cardContent += `<div class="code-block">${cardData.code}</div>`;
        }
        
        if (cardData.analogy) {
            cardContent += `<div class="analogy-box">${cardData.analogy}</div>`;
        }
        
        if (cardData.memoryTip) {
            cardContent += `<div class="memory-tip">${cardData.memoryTip}</div>`;
        }
        
        if (cardData.quickFacts) {
            cardContent += `<div class="quick-facts"><ul>`;
            cardData.quickFacts.forEach(fact => {
                cardContent += `<li>${fact}</li>`;
            });
            cardContent += `</ul></div>`;
        }

        if (cardData.stepByStep) {
            cardContent += `<div class="step-by-step">`;
            cardData.stepByStep.forEach(step => {
                cardContent += `
                    <div class="step">
                        <div class="step-number">${step.step}</div>
                        <div>${step.text}</div>
                    </div>
                `;
            });
            cardContent += `</div>`;
        }
        
        cardContent += '</div>';
        card.innerHTML = cardContent;
        
        // Add enhanced swipe functionality
        this.addSwipeHandlers(card);
        
        return card;
    }

    // Add swipe handlers to a card
    addSwipeHandlers(card) {
        // Touch events
        card.addEventListener('touchstart', (e) => this.handleTouchStart(e, card), { passive: false });
        card.addEventListener('touchmove', (e) => this.handleTouchMove(e, card), { passive: false });
        card.addEventListener('touchend', (e) => this.handleTouchEnd(e, card), { passive: false });
        
        // Mouse events for desktop
        card.addEventListener('mousedown', (e) => this.handleMouseStart(e, card));
    }

    handleTouchStart(e, card) {
        this.startInteraction(e.touches[0].clientX, e.touches[0].clientY, card);
    }

    handleMouseStart(e, card) {
        e.preventDefault();
        this.startInteraction(e.clientX, e.clientY, card);
        
        // Add mouse move and up listeners
        document.addEventListener('mousemove', this.mouseMoveHandler);
        document.addEventListener('mouseup', this.mouseUpHandler);
    }

    startInteraction(x, y, card) {
        if (this.isSwipeInProgress) return;
        
        this.isDragging = true;
        this.startX = x;
        this.startY = y;
        this.activeCard = card;
        card.style.transition = 'none';
        card.style.cursor = 'grabbing';
    }

    handleTouchMove(e, card) {
        e.preventDefault();
        if (this.isDragging && this.activeCard === card) {
            this.handleMove(e.touches[0].clientX, e.touches[0].clientY, card);
        }
    }

    // Mouse move handler (bound to document)
    mouseMoveHandler = (e) => {
        if (this.isDragging && this.activeCard) {
            this.handleMove(e.clientX, e.clientY, this.activeCard);
        }
    }

    handleMove(x, y, card) {
        if (!this.isDragging) return;
        
        this.currentX = x - this.startX;
        this.currentY = y - this.startY;
        
        const rotation = this.currentX * 0.08;
        const scale = 1 - Math.abs(this.currentX) * 0.0001;
        
        card.style.transform = `translateX(${this.currentX}px) translateY(${this.currentY * 0.5}px) rotate(${rotation}deg) scale(${scale})`;
        
        // Enhanced visual feedback
        this.updateSwipeIndicators();
    }

    updateSwipeIndicators() {
        const opacity = Math.min(Math.abs(this.currentX) / 80, 0.8);
        const likeIndicator = document.getElementById('likeIndicator');
        const dislikeIndicator = document.getElementById('dislikeIndicator');
        
        if (this.currentX > 50) {
            this.activeCard.style.boxShadow = `0 25px 60px rgba(76, 175, 80, ${opacity})`;
            likeIndicator.style.opacity = opacity;
            likeIndicator.classList.add('show');
            dislikeIndicator.classList.remove('show');
        } else if (this.currentX < -50) {
            this.activeCard.style.boxShadow = `0 25px 60px rgba(255, 107, 107, ${opacity})`;
            dislikeIndicator.style.opacity = opacity;
            dislikeIndicator.classList.add('show');
            likeIndicator.classList.remove('show');
        } else {
            this.activeCard.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
            likeIndicator.classList.remove('show');
            dislikeIndicator.classList.remove('show');
        }
    }

    handleTouchEnd(e, card) {
        this.endInteraction(card);
    }

    // Mouse up handler (bound to document)
    mouseUpHandler = (e) => {
        if (this.activeCard) {
            this.endInteraction(this.activeCard);
        }
        // Remove mouse event listeners
        document.removeEventListener('mousemove', this.mouseMoveHandler);
        document.removeEventListener('mouseup', this.mouseUpHandler);
    }

    endInteraction(card) {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        card.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        card.style.cursor = 'grab';
        
        // Hide indicators
        document.getElementById('likeIndicator').classList.remove('show');
        document.getElementById('dislikeIndicator').classList.remove('show');
        
        const swipeThreshold = 120;
        
        if (Math.abs(this.currentX) > swipeThreshold) {
            if (this.currentX > 0) {
                this.completeSwipeRight();
            } else {
                this.completeSwipeLeft();
            }
        } else {
            // Snap back with elastic animation
            card.style.transform = '';
            card.style.boxShadow = '0 25px 60px rgba(0,0,0,0.15)';
        }
        
        this.currentX = 0;
        this.currentY = 0;
        this.activeCard = null;
    }

    // Button-triggered swipe functions
    swipeRight() {
        if (this.isSwipeInProgress) return;
        this.completeSwipeRight();
    }

    swipeLeft() {
        if (this.isSwipeInProgress) return;
        this.completeSwipeLeft();
    }

    completeSwipeRight() {
        if (this.isSwipeInProgress) return;
        this.isSwipeInProgress = true;
        
        const topCard = document.querySelector('.learning-card');
        if (topCard) {
            topCard.classList.add('swiped-right');
            this.showSuccessFeedback('✨');
            this.streak++;
            setTimeout(() => {
                this.nextCard();
            }, 600);
        }
    }

    completeSwipeLeft() {
        if (this.isSwipeInProgress) return;
        this.isSwipeInProgress = true;
        
        const topCard = document.querySelector('.learning-card');
        if (topCard) {
            topCard.classList.add('swiped-left');
            this.showSuccessFeedback('💪');
            this.streak++;
            setTimeout(() => {
                this.nextCard();
            }, 600);
        }
    }

    showSuccessFeedback(emoji) {
        const feedback = document.getElementById('successFeedback');
        feedback.textContent = emoji;
        feedback.classList.add('show');
        
        setTimeout(() => {
            feedback.classList.remove('show');
        }, 800);
    }

    nextCard() {
        const cardStack = document.getElementById('cardStack');
        const topCard = cardStack.querySelector('.learning-card');
        
        if (topCard) {
            cardStack.removeChild(topCard);
        }
        
        this.currentCardIndex++;
        this.isSwipeInProgress = false;
        
        if (this.currentCardIndex >= this.totalCards) {
            this.showCompletion();
            return;
        }
        
        // Load next card if needed
        const content = learningContent[this.currentTopic];
        const remainingCards = cardStack.children.length - 3; // Exclude indicators
        
        if (this.currentCardIndex + remainingCards < this.totalCards) {
            const newCardData = content.cards[this.currentCardIndex + remainingCards];
            const newCard = this.createCard(newCardData, remainingCards);
            cardStack.appendChild(newCard);
        }
        
        // Update existing cards position with smooth animation
        const cards = Array.from(cardStack.querySelectorAll('.learning-card'));
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.zIndex = 10 - index;
                card.style.transform = `scale(${1 - index * 0.03}) translateY(${index * 8}px) translateZ(${-index * 50}px)`;
                card.style.opacity = 1 - index * 0.1;
            }, index * 50);
        });
        
        this.updateProgress();
        this.updateStreak();
    }

    updateProgress() {
        const progress = (this.currentCardIndex / this.totalCards) * 100;
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `Card ${this.currentCardIndex + 1} of ${this.totalCards}`;
    }

    updateStreak() {
        const streakCounter = document.getElementById('streakCounter');
        streakCounter.textContent = `🔥 ${this.streak}`;
        
        if (this.streak > 0 && this.streak % 5 === 0) {
            streakCounter.style.animation = 'none';
            setTimeout(() => {
                streakCounter.style.animation = 'streakPulse 2s ease-in-out infinite';
            }, 50);
        }
    }

    // Modal and UI functions
    closeModal() {
        document.getElementById('prerequisitesModal').style.display = 'none';
    }

    startLearning() {
        const checkboxes = document.querySelectorAll('#prerequisitesList input[type="checkbox"]');
        const allChecked = Array.from(checkboxes).every(cb => cb.checked);
        
        if (!allChecked) {
            // Add vibration effect
            document.querySelector('.modal-content').classList.add('vibrate');
            setTimeout(() => {
                document.querySelector('.modal-content').classList.remove('vibrate');
            }, 300);
            
            alert('Please confirm you have knowledge of all prerequisites before starting.');
            return;
        }
        
        this.closeModal();
        this.initializeLearning(this.currentTopic);
    }

    closeLearning() {
        const learningContainer = document.getElementById('learningContainer');
        learningContainer.style.opacity = '0';
        
        setTimeout(() => {
            learningContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.currentCardIndex = 0;
            this.streak = 0;
        }, 300);
    }

    showCompletion() {
        document.getElementById('completionModal').style.display = 'block';
    }

    closeCompletion() {
        document.getElementById('completionModal').style.display = 'none';
        this.closeLearning();
    }

    reviewCards() {
        document.getElementById('completionModal').style.display = 'none';
        this.currentCardIndex = 0;
        const content = learningContent[this.currentTopic];
        this.loadCards(content.cards);
        this.updateProgress();
    }

    // Keyboard shortcuts
    handleKeyboard(e) {
        if (document.getElementById('learningContainer').style.display === 'block') {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                e.preventDefault();
                this.swipeRight();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                this.swipeLeft();
            } else if (e.key === 'Escape') {
                this.closeLearning();
            }
        }
    }

    // Modal click handler
    handleModalClick(e) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    // Prevent double-tap zoom on mobile
    preventDoubleTabZoom() {
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function (event) {
            const now = (new Date()).getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }

    // Setup scroll animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            observer.observe(el);
        });
    }

    // Create floating particles
    createParticles() {
        // This would create floating particles if you add a particles container
        // Implementation depends on whether you want to add this visual effect
    }

    // Haptic feedback for supported devices
    triggerHapticFeedback() {
        if (navigator.vibrate) {
            navigator.vibrate(10); // Very brief vibration
        }
    }
}

// Global functions for HTML onclick handlers
function closeModal() {
    app.closeModal();
}

function startLearning() {
    app.startLearning();
}

function closeLearning() {
    app.closeLearning();
}

function swipeRight() {
    app.swipeRight();
}

function swipeLeft() {
    app.swipeLeft();
}

function closeCompletion() {
    app.closeCompletion();
}

function reviewCards() {
    app.reviewCards();
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', function() {
    app = new QuickLearn();
});