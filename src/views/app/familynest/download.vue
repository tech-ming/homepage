<template>
  <div class="download-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">家庭服务系统</h1>
          <h2 class="hero-subtitle">一站式家庭生活管理应用</h2>
          <p class="hero-description">
            基于Flutter开发的跨平台应用，为家庭生活提供全方位管理服务，支持Android、iOS和鸿蒙系统
          </p>
          <div class="download-buttons">
            <a href="#download" class="download-btn primary">
              立即下载
            </a>
          </div>
          <div class="platform-support">
            支持 Android • iOS • 鸿蒙系统
          </div>
        </div>
        <div class="hero-visual">
          <div class="phone-mockup">
            <div class="phone-screen">
              <div class="app-preview">
                <div class="status-bar"></div>
                <div class="app-content">
                  <div class="feature-card">
                    <div class="feature-icon family"></div>
                    <h3>家庭成员管理</h3>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon tasks"></div>
                    <h3>家务任务管理</h3>
                  </div>
                  <div class="feature-card">
                    <div class="feature-icon points"></div>
                    <h3>积分商城</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Overview -->
    <section class="features-overview">
      <div class="container">
        <h2 class="section-title">强大的功能特性</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon-large family-icon"></div>
            <h3>家庭成员管理</h3>
            <p>管理家庭成员信息、角色和权限，让每个家庭成员都有合适的参与度</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-large tasks-icon"></div>
            <h3>智能任务分配</h3>
            <p>创建、分配和跟踪家务任务完成情况，让家务管理更加高效有序</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon-large points-icon"></div>
            <h3>积分奖励系统</h3>
            <p>完成任务获取积分，兑换奖励，激发家庭成员的参与积极性</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Download Section -->
    <section id="download" class="download-section">
      <div class="container">
        <h2 class="section-title">立即下载体验</h2>
        <p class="download-description">开始您的智能家庭管理之旅</p>
        <div class="download-options">
          <div class="download-card">
            <div class="platform-icon android-icon"></div>
            <h3>Android</h3>
            <p>适用于 Android 8.0 及以上版本</p>
            <button class="download-btn-large">立即下载</button>
          </div>
          <div class="download-card">
            <div class="platform-icon ios-icon"></div>
            <h3>iOS</h3>
            <p>适用于 iOS 12.0 及以上版本</p>
            <button class="download-btn-large">App Store</button>
          </div>
          <div class="download-card">
            <div class="platform-icon harmony-icon"></div>
            <h3>鸿蒙</h3>
            <p>适用于 HarmonyOS 2.0 及以上版本</p>
            <button class="download-btn-large">华为应用市场</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-section">
            <h4>产品</h4>
            <ul>
              <li><a href="#features">功能特性</a></li>
              <li><a href="#download">下载应用</a></li>
              <li><a href="#support">技术支持</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>支持</h4>
            <ul>
              <li><a href="#help">帮助中心</a></li>
              <li><a href="#contact">联系我们</a></li>
              <li><a href="#feedback">意见反馈</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>关于</h4>
            <ul>
              <li><a href="#about">关于我们</a></li>
              <li><a href="#privacy">隐私政策</a></li>
              <li><a href="#terms">服务条款</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2025 家庭服务系统. 保留所有权利</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'FamilyNestDownload',
  mounted() {
    // 添加滚动动画效果
    this.initScrollAnimations();
  },
  methods: {
    initScrollAnimations() {
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, observerOptions);

      // 观察所有需要动画的元素
      document.querySelectorAll('.feature-item, .function-card, .benefit-item, .download-card').forEach(el => {
        observer.observe(el);
      });
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

.download-page {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #e0e7ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1rem;
  opacity: 0.8;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}

.download-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.download-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 12px 24px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
}

.download-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.platform-support {
  font-size: 0.9rem;
  opacity: 0.7;
}

/* Phone Mockup */
.hero-visual {
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: 300px;
  height: 600px;
  background: #1a1a1a;
  border-radius: 30px;
  padding: 8px;
  position: relative;
  transform: perspective(1000px) rotateY(-15deg);
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 22px;
  overflow: hidden;
}

.app-preview {
  padding: 40px 20px 20px;
  height: 100%;
}

.status-bar {
  height: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin-bottom: 20px;
}

.feature-card {
  background: white;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

/* Features Overview */
.features-overview {
  padding: 100px 0;
  background: #f8fafc;
}

.section-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 3rem;
  color: #1a202c;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.feature-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.feature-item:hover {
  transform: translateY(-10px);
}

.feature-icon-large {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.feature-item h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #2d3748;
}

.feature-item p {
  color: #718096;
  line-height: 1.6;
}

/* Core Functions */
.core-functions {
  padding: 100px 0;
  background: white;
}

.functions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.function-card {
  padding: 2rem;
  border: 1px solid #e2e8f0;
  border-radius: 15px;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
}

.function-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.function-card:hover {
  border-color: #667eea;
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
}

.function-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  margin-bottom: 1rem;
}

.function-card h4 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #2d3748;
}

.function-card p {
  color: #718096;
  font-size: 0.9rem;
}

/* Why Choose Us */
.why-choose {
  padding: 100px 0;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.why-choose .section-title {
  color: white;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.benefit-item {
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: 0;
  transform: translateY(30px);
}

.benefit-item.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.benefit-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.2);
}

.benefit-item h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.benefit-item p {
  opacity: 0.9;
  line-height: 1.6;
}

/* Download Section */
.download-section {
  padding: 100px 0;
  background: #1a202c;
  color: white;
  text-align: center;
}

.download-section .section-title {
  color: white;
}

.download-description {
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 3rem;
}

.download-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.download-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 3rem 2rem;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.download-card.animate-in {
  opacity: 1;
  transform: translateY(0);
}

.download-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
}

.platform-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  border-radius: 20px;
  background: linear-gradient(45deg, #667eea, #764ba2);
}

.download-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.download-card p {
  opacity: 0.7;
  margin-bottom: 2rem;
}

.download-btn-large {
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  color: white;
  padding: 15px 30px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}

.download-btn-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
}

/* Footer */
.footer {
  background: #0f172a;
  color: white;
  padding: 60px 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h4 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #e2e8f0;
}

.footer-section ul {
  list-style: none;
}

.footer-section li {
  margin-bottom: 0.5rem;
}

.footer-section a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section a:hover {
  color: #667eea;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #334155;
  color: #64748b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .download-buttons {
    flex-direction: column;
  }
  
  .features-grid,
  .functions-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }
  
  .phone-mockup {
    width: 250px;
    height: 500px;
    transform: none;
  }
}

@media (max-width: 480px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .container {
    padding: 0 15px;
  }
}

/* Animation delays for staggered effect */
.feature-item:nth-child(1) { transition-delay: 0.1s; }
.feature-item:nth-child(2) { transition-delay: 0.2s; }
.feature-item:nth-child(3) { transition-delay: 0.3s; }

.function-card:nth-child(1) { transition-delay: 0.1s; }
.function-card:nth-child(2) { transition-delay: 0.15s; }
.function-card:nth-child(3) { transition-delay: 0.2s; }
.function-card:nth-child(4) { transition-delay: 0.25s; }
.function-card:nth-child(5) { transition-delay: 0.3s; }
.function-card:nth-child(6) { transition-delay: 0.35s; }
.function-card:nth-child(7) { transition-delay: 0.4s; }
.function-card:nth-child(8) { transition-delay: 0.45s; }

.download-card:nth-child(1) { transition-delay: 0.1s; }
.download-card:nth-child(2) { transition-delay: 0.2s; }
.download-card:nth-child(3) { transition-delay: 0.3s; }
</style>

