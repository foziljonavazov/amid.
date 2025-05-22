// Burger menu and sidebar logic
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar burger menu
    const burger = document.getElementById('burger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('closeSidebar');
  
    burger?.addEventListener('click', () => sidebar?.classList.add('active'));
    closeBtn?.addEventListener('click', () => sidebar?.classList.remove('active'));
  
    // Button active effect logic
    const getStartedBtn = document.querySelector('.getStarted');
    const demoVideoBtn = document.querySelector('.demoVideo');
  
    function addActiveEffect(btn) {
      btn.classList.add('active');
      setTimeout(() => btn.classList.remove('active'), 150);
    }
  
    getStartedBtn?.addEventListener('click', () => addActiveEffect(getStartedBtn));
    demoVideoBtn?.addEventListener('click', () => addActiveEffect(demoVideoBtn));
  
    // Service cards animation and hover
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
  
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function animateCardsOnScroll() {
      serviceCards.forEach((card, index) => {
        if (isInViewport(card)) {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 150);
        }
      });
    }
  
    animateCardsOnScroll();
    window.addEventListener('scroll', animateCardsOnScroll);
  
    serviceCards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        const icon = this.querySelector('.icon-container i');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      card.addEventListener('mouseleave', function () {
        const icon = this.querySelector('.icon-container i');
        if (icon) icon.style.transform = 'scale(1)';
      });
    });
  
    // Stats numbers animation
    const statsSection = document.querySelector('.stats-container');
    let animatedStats = false;
  
    function animateValue(element, start, end, duration) {
      let startTimestamp = null;
      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let value = Math.floor(progress * (end - start) + start);
  
        if (end >= 1000) {
          element.textContent = value >= 1000 ? Math.floor(value / 1000) + 'k+' : value + '+';
        } else {
          element.textContent = value;
        }
  
        if (progress < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  
    function animateStats() {
      if (statsSection && isInViewport(statsSection) && !animatedStats) {
        animatedStats = true;
        setTimeout(() => animateValue(document.getElementById('projects-count'), 0, 9000, 2000), 0);
        setTimeout(() => animateValue(document.getElementById('clients-count'), 0, 924, 2000), 500);
        setTimeout(() => animateValue(document.getElementById('employees-count'), 0, 416, 2000), 1000);
        setTimeout(() => animateValue(document.getElementById('startups-count'), 0, 3024, 2000), 1500);
      }
    }
  
    animateStats();
    window.addEventListener('scroll', animateStats);
  
    // Portfolio image and reveal animation
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      const image = item.querySelector('.portfolio-img');
      item.addEventListener('mouseenter', () => { if (image) image.style.transform = 'scale(1.05)'; });
      item.addEventListener('mouseleave', () => { if (image) image.style.transform = 'scale(1)'; });
    });
  
    function revealOnScroll() {
      portfolioItems.forEach(item => {
        if (isInViewport(item)) {
          item.style.opacity = '1';
          item.style.transform = 'translateY(0)';
        }
      });
    }
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
  
    // Blog slider logic
    const blogPosts = [
      {
        image: './imgs/doctors.webp',
        imagePosition: '0% 25%',
        day: '22',
        month: 'Dec',
        title: 'Upgrading Economy Needs More Startups',
        description: 'We understand how desperately you want to grow in the business world & our motto is to help you with practicable idea and plan'
      },
      {
        image: './imgs/two-girls.webp',
        imagePosition: '50% 50%',
        day: '16',
        month: 'Dec',
        title: 'Team Has Some Unique Feature - What Yours?',
        description: 'We understand how desperately you want to grow in the business world & our motto is to help you with practicable idea and plan'
      },
      {
        image: './imgs/doctors.webp',
        imagePosition: '0% 75%',
        day: '10',
        month: 'Dec',
        title: 'How to Build a Successful Business Strategy',
        description: 'Learn the key components of a successful business strategy and how to implement them effectively in your organization'
      },
      {
        image: './imgs/two-girls.webp',
        imagePosition: '50% 25%',
        day: '05',
        month: 'Dec',
        title: 'Digital Marketing Trends for 2023',
        description: 'Stay ahead of the competition with these cutting-edge digital marketing trends that will dominate the business landscape in 2023'
      }
    ];
  
    const blogContainer = document.querySelector('.blog-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentPage = 0;
    const postsPerPage = 2;
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  
    function renderBlogPosts() {
      if (!blogContainer) return;
      blogContainer.innerHTML = '';
      const startIndex = currentPage * postsPerPage;
      const endIndex = Math.min(startIndex + postsPerPage, blogPosts.length);
  
      for (let i = startIndex; i < endIndex; i++) {
        const post = blogPosts[i];
        const blogCard = document.createElement('div');
        blogCard.className = 'blog-card';
        blogCard.style.opacity = '0';
        blogCard.style.transform = 'translateY(20px)';
        blogCard.innerHTML = `
          <div class="blog-image">
            <img src="${post.image}" alt="${post.title}" class="blog-img" style="object-position: ${post.imagePosition}">
            <div class="blog-date">
              <span class="day">${post.day}</span>
              <span class="month">${post.month}</span>
            </div>
          </div>
          <div class="blog-content">
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <a href="#" class="learn-more-btn">
              Learn More
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        `;
        blogContainer.appendChild(blogCard);
        setTimeout(() => {
          blogCard.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          blogCard.style.opacity = '1';
          blogCard.style.transform = 'translateY(0)';
        }, i * 200);
      }
    }
  
    function updateButtonStates() {
      if (!prevBtn || !nextBtn) return;
      prevBtn.disabled = currentPage === 0;
      nextBtn.disabled = currentPage === totalPages - 1;
      prevBtn.style.opacity = prevBtn.disabled ? '0.5' : '1';
      nextBtn.style.opacity = nextBtn.disabled ? '0.5' : '1';
    }
  
    renderBlogPosts();
    updateButtonStates();
  
    prevBtn?.addEventListener('click', () => {
      if (currentPage > 0) {
        currentPage--;
        renderBlogPosts();
        updateButtonStates();
      }
    });
  
    nextBtn?.addEventListener('click', () => {
      if (currentPage < totalPages - 1) {
        currentPage++;
        renderBlogPosts();
        updateButtonStates();
      }
    });
  
    document.addEventListener('mouseover', e => {
      const card = e.target.closest('.blog-card');
      if (card) {
        const btn = card.querySelector('.learn-more-btn');
        btn.style.transform = 'translateY(-3px)';
        btn.style.boxShadow = '0 5px 15px rgba(255, 107, 53, 0.3)';
      }
    });
    document.addEventListener('mouseout', e => {
      const card = e.target.closest('.blog-card');
      if (card) {
        const btn = card.querySelector('.learn-more-btn');
        btn.style.transform = 'translateY(0)';
        btn.style.boxShadow = 'none';
      }
    });
  
    // Newsletter modal logic
    const subscribeBtn = document.getElementById('subscribeBtn');
    const modal = document.getElementById('newsletterModal');
    const close = document.querySelector('.closebtn');
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('emailInput');
    const successMessage = document.getElementById('successMessage');
  
    function validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  
    function closeModal() {
      if (!modal) return;
      modal.style.display = 'none';
    }
  
    subscribeBtn?.addEventListener('click', () => {
      if (!modal) return;
      modal.style.display = 'flex';
      setTimeout(() => modal.querySelector('.modal-content')?.classList.add('show'), 10);
    });
  
    close?.addEventListener('click', closeModal);
    window.addEventListener('click', event => {
      if (event.target === modal) closeModal();
    });
  
    newsletterForm?.addEventListener('submit', event => {
      event.preventDefault();
      const email = emailInput.value.trim();
      if (validateEmail(email)) {
        newsletterForm.style.display = 'none';
        successMessage.style.display = 'block';
        setTimeout(() => {
          closeModal();
          setTimeout(() => {
            newsletterForm.style.display = 'block';
            successMessage.style.display = 'none';
            emailInput.value = '';
          }, 300);
        }, 3000);
      } else {
        emailInput.classList.add('error');
        emailInput.focus();
      }
    });
  
    emailInput?.addEventListener('input', () => {
      emailInput.classList.remove('error');
    });
  
    // Social icons hover
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
      icon.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.color = '#ff7846';
      });
      icon.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.color = 'white';
      });
    });
  
    // Modal animation CSS
    const style = document.createElement('style');
    style.textContent = `
      .modal { font-family: Poppins; opacity: 1; transition: opacity 0.3s ease; }
      .modal-content { transform: translateY(20px); opacity: 0; transition: transform 0.3s ease, opacity 0.3s ease; }
      .modal-content.show { transform: translateY(0); opacity: 1; }
      #emailInput.error { border-color: #ef4444; background-color: #fee2e2; }
    `;
    document.head.appendChild(style);

    function toLogInPage(){
        window.location.href = "login-page.html"
    }
  });