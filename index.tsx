import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

// ====================== CSS (Merged from user templates) ======================
const styles = `
/* ========== 登入頁面樣式 (由用戶提供) ========== */
.login-page {
    background-color: #f5f7fa;
    color: #333;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-family: 'Segoe UI', 'Microsoft JhengHei', sans-serif;
}

.login-container {
    display: flex;
    max-width: 800px;
    width: 100%;
    background-color: white;
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    overflow: hidden;
}

.right-panel {
    flex: 1;
    padding: 60px 50px;
    display: flex;
    flex-direction: column;
}

.form-header {
    margin-bottom: 40px;
}

.form-header h2 {
    font-size: 2.2rem;
    color: #333;
    margin-bottom: 10px;
}

.form-header p {
    color: #666;
    font-size: 1rem;
}

.form-toggle {
    display: flex;
    margin-bottom: 30px;
    border-bottom: 1px solid #eee;
}

.form-toggle button {
    background: none;
    border: none;
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: 600;
    color: #888;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
}

.form-toggle button.active {
    color: #4a6ee0;
}

.form-toggle button.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 3px;
    background-color: #4a6ee0;
    border-radius: 3px 3px 0 0;
}

.form {
    display: none;
}

.form.active {
    display: block;
}

.registration-steps {
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
    position: relative;
}

.registration-steps::before {
    content: '';
    position: absolute;
    top: 20px;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #eee;
    z-index: 1;
}

.step {
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 2;
}

.step-circle {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    margin-bottom: 10px;
    color: #888;
    border: 2px solid #eee;
    transition: all 0.3s;
}

.step.active .step-circle {
    background-color: #4a6ee0;
    color: white;
    border-color: #4a6ee0;
}

.step.completed .step-circle {
    background-color: #2ecc71;
    color: white;
    border-color: #2ecc71;
}

.step-label {
    font-size: 0.9rem;
    color: #888;
    font-weight: 500;
}

.step.active .step-label {
    color: #4a6ee0;
    font-weight: 600;
}

.step.completed .step-label {
    color: #2ecc71;
}

.verification-container {
    text-align: center;
    padding: 20px 0;
}

.verification-icon {
    font-size: 4rem;
    color: #4a6ee0;
    margin-bottom: 20px;
}

.verification-title {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: #333;
}

.email-address {
    background-color: #f8f9fa;
    padding: 12px 20px;
    border-radius: 8px;
    display: inline-block;
    font-weight: 600;
    color: #4a6ee0;
    margin: 15px 0;
    border: 1px solid #e9ecef;
}

.form-group {
    margin-bottom: 24px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #555;
    font-size: 0.95rem;
}

.input-with-icon {
    position: relative;
}

.input-with-icon i {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #888;
}

.form-control {
    width: 100%;
    padding: 16px 16px 16px 48px;
    border: 1px solid #ddd;
    border-radius: 10px;
    font-size: 1rem;
    transition: border 0.3s, box-shadow 0.3s;
}

.password-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
    font-size: 0.9rem;
}

.forgot-password {
    color: #4a6ee0;
    text-decoration: none;
    font-weight: 500;
}

.submit-btn {
    width: 100%;
    background-color: #4a6ee0;
    color: white;
    border: none;
    padding: 16px;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-top: 10px;
}

.google-btn {
    width: 100%;
    background-color: white;
    color: #555;
    border: 1px solid #ddd;
    padding: 16px;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.divider {
    display: flex;
    align-items: center;
    margin: 30px 0;
    color: #888;
}

.divider::before, .divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #eee;
}

.divider span {
    padding: 0 15px;
    font-size: 0.9rem;
}

/* ========== 主頁面樣式 (由用戶提供) ========== */
.main-page body {
    background-color: #f8f9fa;
    font-family: 'Microsoft JhengHei', 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    line-height: 1.6;
    min-height: 100vh;
}

.navbar {
    background-color: #ffffff;
    border-bottom: 1px solid #dee2e6;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    padding: 1rem 0;
}

.navbar-brand {
    color: #2c3e50;
    font-weight: 600;
    font-size: 1.3rem;
}

.welcome-section {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    margin: 2rem 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e9ecef;
}

.main-btn {
    background-color: #007bff;
    border: none;
    color: white;
    font-weight: 500;
    padding: 0.7rem 1.5rem;
    border-radius: 5px;
}

.secondary-btn {
    background-color: white;
    border: 1px solid #007bff;
    color: #007bff;
    font-weight: 500;
    padding: 0.7rem 1.5rem;
    border-radius: 5px;
}

.search-section {
    background-color: white;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e9ecef;
}

.steps-indicator {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    position: relative;
}

.main-step {
    text-align: center;
    position: relative;
    flex: 1;
}

.main-step-number {
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    background-color: #e9ecef;
    color: #6c757d;
    font-weight: 600;
    margin: 0 auto 0.5rem;
    border: 2px solid #dee2e6;
}

.main-step.active .main-step-number {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
}

.results-section {
    background-color: white;
    border-radius: 8px;
    margin-top: 2rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e9ecef;
}

.result-item {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
}

.result-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 0.6rem 1.2rem;
    border-radius: 5px;
}

.upload-section {
    background-color: white;
    border-radius: 8px;
    padding: 2rem;
    margin-top: 3rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border: 1px solid #e9ecef;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
}

.footer {
    background-color: #f8f9fa;
    color: #6c757d;
    text-align: center;
    padding: 1.5rem 0;
    margin-top: 3rem;
    border-top: 1px solid #e9ecef;
}

.error-message {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 6px;
    display: flex;
    align-items: center;
    gap: 5px;
}

.loading {
    display: inline-block;
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255,255,255,.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.current-user {
    color: #495057;
    font-size: 0.9rem;
    margin-right: 15px;
}

.logout-btn {
    background-color: #f8f9fa;
    border: 1px solid #dc3545;
    color: #dc3545;
    font-weight: 500;
    padding: 0.4rem 0.8rem;
    border-radius: 5px;
    cursor: pointer;
}

.logout-btn:hover {
    background-color: #dc3545;
    color: white;
}
`;

// ====================== Paper Data ======================
const PAPER_DATABASE: Record<string, { url: string; title_zh: string; title_en: string }> = {
  'jh1_math_t1_2024': {
    url: 'https://drive.google.com/drive/folders/119LgpjXMQwTa6NlacKMd8nNxXKQGNHiJ?usp=sharing',
    title_zh: '初中一年級數學第一學期 2024 年試卷',
    title_en: 'Junior High 1 Mathematics First Semester 2024 Papers'
  },
  'jh1_math_t2_2024': {
    url: 'https://drive.google.com/drive/folders/1eQDuvqVBzPZJzW3tF8iEMOLDEwNNebE_?usp=sharing',
    title_zh: '初中一年級數學第二學期 2024 年試卷',
    title_en: 'Junior High 1 Mathematics Second Semester 2024 Papers'
  },
  'jh1_math_t3_2024': {
    url: 'https://drive.google.com/drive/folders/1X-I3xVTGpEMA6iMND7OnXEfm2yeYlzP2?usp=sharing',
    title_zh: '初中一年級數學第三學期 2024 年試卷',
    title_en: 'Junior High 1 Mathematics Third Semester 2024 Papers'
  },
  'jh2_math_t1_2024': {
    url: 'https://drive.google.com/drive/folders/1O_tUo65LEPQ_rIPZC4MPw-0vjUM_l_Xa?usp=sharing',
    title_zh: '初中二年級數學第一學期 2024 年試卷',
    title_en: 'Junior High 2 Mathematics First Semester 2024 Papers'
  },
  'jh3_math_t1_2024': {
    url: 'https://drive.google.com/drive/folders/1utr4P0eRwPpCxm-NEbFnVhh7XxCXBU3Q?usp=sharing',
    title_zh: '初中三年級數學第一學期 2024 年試卷',
    title_en: 'Junior High 3 Mathematics First Semester 2024 Papers'
  },
  'jh3_phy_t2_2024': {
    url: 'https://drive.google.com/drive/folders/1S37cPGSsGSUHzuZWliLul4iSdH2eIZcy?usp=drive_link',
    title_zh: '初中三年級物理第二學期 2024 年試卷',
    title_en: 'Junior High 3 Physics Second Semester 2024 Papers'
  },
  'jh3_chem_t2_2024': {
    url: 'https://drive.google.com/drive/folders/1k9PunF2j4oCGSsldXqAbDIbl0FBOh9s-?usp=sharing',
    title_zh: '初中三年級化學第二學期 2024 年試卷',
    title_en: 'Junior High 3 Chemistry Second Semester 2024 Papers'
  },
  'jh3_chi_t2_2024': {
    url: 'https://drive.google.com/drive/folders/1k1fEOHJzHh_FKSs8A_7KGIPeUweYWH-G?usp=sharing',
    title_zh: '初中三年級中文第二學期 2024 年試卷',
    title_en: 'Junior High 3 Chinese Second Semester 2024 Papers'
  }
};

// ====================== Main App Component ======================
const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [lang, setLang] = useState<'zh' | 'en'>('zh');
  const [view, setView] = useState<'login' | 'register' | 'verification' | 'forgot-password'>('login');
  const [isLoading, setIsLoading] = useState(false);

  // Home Page states
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [term, setTerm] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState<any>(null);

  // Lang Helper
  const t = (zh: string, en: string) => (lang === 'zh' ? zh : en);

  // Effect to inject CSS
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = styles;
    document.head.appendChild(styleTag);
    return () => { document.head.removeChild(styleTag); };
  }, []);

  // Handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setUser({ email: 'user@example.com', name: '測試用戶' });
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 800);
  };

  const handleSearch = () => {
    if (!grade || !subject || !term || !year) {
      alert(t('請填寫所有搜尋條件！', 'Please fill in all search criteria!'));
      return;
    }
    const key = `${grade}_${subject}_${term}_${year}`;
    setResults(PAPER_DATABASE[key] || 'none');
  };

  // ---------------- Render Logic ----------------

  if (!isLoggedIn) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="right-panel">
            <div className="form-header">
              <h2>{t('迅速登入或註冊', 'Fast Login or Register')}</h2>
              <p>{t('使用你的電子郵件或其他服務，以繼續使用試卷題庫系統！', 'Continue with your email or other services!')}</p>
            </div>

            {(view === 'login' || view === 'register') && (
              <div className="form-toggle">
                <button className={view === 'login' ? 'active' : ''} onClick={() => setView('login')}>{t('登入', 'Login')}</button>
                <button className={view === 'register' ? 'active' : ''} onClick={() => setView('register')}>{t('註冊', 'Register')}</button>
              </div>
            )}

            <div className="form-container">
              {/* Login Form */}
              {view === 'login' && (
                <form className="form active" onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>{t('電子郵件', 'Email')}</label>
                    <div className="input-with-icon">
                      <i className="far fa-envelope"></i>
                      <input type="email" className="form-control" placeholder={t('請輸入電子郵件', 'Enter Email')} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('密碼', 'Password')}</label>
                    <div className="input-with-icon">
                      <i className="fas fa-lock"></i>
                      <input type="password" placeholder={t('請輸入密碼', 'Enter Password')} className="form-control" required />
                    </div>
                    <div className="password-actions">
                      <div className="remember-me">
                        <input type="checkbox" id="remember" className="me-1" />
                        <label htmlFor="remember">{t('記住我', 'Remember me')}</label>
                      </div>
                      <a href="#" className="forgot-password" onClick={() => setView('forgot-password')}>{t('忘記密碼？', 'Forgot Password?')}</a>
                    </div>
                  </div>
                  <button type="submit" className="submit-btn" disabled={isLoading}>
                    {isLoading ? <span className="loading"></span> : <span>{t('登入', 'Login')}</span>}
                  </button>
                  <div className="divider"><span>{t('或使用第三方服務', 'or via other services')}</span></div>
                  <button type="button" className="google-btn" onClick={handleLogin}>
                    <i className="fab fa-google"></i> {t('使用 Google 登入', 'Login with Google')}
                  </button>
                </form>
              )}

              {/* Register Form Step 1 */}
              {view === 'register' && (
                <form className="form active" onSubmit={(e) => { e.preventDefault(); setView('verification'); }}>
                  <div className="registration-steps">
                    <div className="step active"><div className="step-circle">1</div><div className="step-label">{t('基本資料', 'Profile')}</div></div>
                    <div className="step"><div className="step-circle">2</div><div className="step-label">{t('驗證郵件', 'Verify')}</div></div>
                  </div>
                  <div className="form-group">
                    <label>{t('姓名', 'Name')}</label>
                    <div className="input-with-icon"><i className="far fa-user"></i><input type="text" className="form-control" placeholder={t('請輸入姓名', 'Your Name')} required /></div>
                  </div>
                  <div className="form-group">
                    <label>{t('電子郵件', 'Email')}</label>
                    <div className="input-with-icon"><i className="far fa-envelope"></i><input type="email" className="form-control" placeholder={t('請輸入電子郵件', 'Your Email')} required /></div>
                  </div>
                  <div className="form-group">
                    <label>{t('密碼', 'Password')}</label>
                    <div className="input-with-icon"><i className="fas fa-lock"></i><input type="password" placeholder={t('請輸入密碼', 'Your Password')} className="form-control" required /></div>
                  </div>
                  <button type="submit" className="submit-btn">{t('下一步：驗證郵件', 'Next: Verification')}</button>
                </form>
              )}

              {/* Verification Form */}
              {view === 'verification' && (
                <div className="form active">
                  <div className="registration-steps">
                    <div className="step completed"><div className="step-circle"><i className="fas fa-check"></i></div><div className="step-label">{t('基本資料', 'Profile')}</div></div>
                    <div className="step active"><div className="step-circle">2</div><div className="step-label">{t('驗證郵件', 'Verify')}</div></div>
                  </div>
                  <div className="verification-container">
                    <div className="verification-icon"><i className="fas fa-envelope"></i></div>
                    <h2 className="verification-title">{t('請驗證您的電子郵件', 'Please verify your Email')}</h2>
                    <p>{t('我們已發送驗證連結到：', 'We sent a link to:')}</p>
                    <div className="email-address">user@example.com</div>
                    <p>{t('請點擊郵件中的驗證連結以完成註冊。', 'Check your inbox to finish registration.')}</p>
                    <button type="button" className="verification-success-button" onClick={() => { setIsLoggedIn(true); setUser({email:'u@e.c', name:'New User'}); }}>
                      {t('我已驗證，繼續使用', 'Verified, continue')}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password */}
              {view === 'forgot-password' && (
                <form className="form active" onSubmit={(e) => { e.preventDefault(); alert('Reset link sent!'); setView('login'); }}>
                  <div className="form-group">
                    <label>{t('電子郵件', 'Email')}</label>
                    <div className="input-with-icon"><i className="far fa-envelope"></i><input type="email" className="form-control" placeholder={t('請輸入電子郵件', 'Your Email')} required /></div>
                  </div>
                  <button type="submit" className="submit-btn">{t('發送重置連結', 'Send Reset Link')}</button>
                  <div className="text-center mt-3"><a href="#" onClick={() => setView('login')} className="forgot-password">{t('返回登入', 'Back to Login')}</a></div>
                </form>
              )}
            </div>
            
            <div className="terms">
                {t('點擊「註冊」即表示您同意我們的', 'By registering, you agree to our')} <a href="#">{t('服務條款', 'Terms')}</a> {t('和', 'and')} <a href="#">{t('隱私政策', 'Privacy Policy')}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================== Home Page Render ======================
  return (
    <div className="main-page">
      <nav className="navbar">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" className="me-2" />
            <span className="fw-bold">{t('試卷題庫系統', 'Paper Repository')}</span>
          </a>
          <div className="d-flex align-items-center">
            <span className="current-user hidden-mobile">
              {t(`歡迎，${user?.name}`, `Welcome, ${user?.name}`)}
            </span>
            <button className="logout-btn me-3" onClick={() => setIsLoggedIn(false)}>{t('登出', 'Logout')}</button>
            <div className="btn-group">
                <button className={`btn btn-sm ${lang==='zh'?'btn-primary':'btn-light'}`} onClick={()=>setLang('zh')}>繁中</button>
                <button className={`btn btn-sm ${lang==='en'?'btn-primary':'btn-light'}`} onClick={()=>setLang('en')}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="welcome-section">
          <h1>{t('歡迎來到試卷題庫系統', 'Welcome to the Paper Repository System')}</h1>
          <p>{t('查找初中至高中的舊試卷：中文、英文、數學、物理、化學、生物。', 'Find old exam papers from junior high to senior high.')}</p>
          <p>{t('可按年級、科目、學期及年份瀏覽，亦可上傳您的試卷。', 'Browse by grade, subject, and year, or contribute your own.')}</p>
          <a href="#upload" className="btn secondary-btn mt-2">{t('上傳試卷', 'Upload Your Paper')}</a>
        </div>

        <div className="steps-indicator">
          {[
            { n: 1, l: t('年級', 'Grade'), a: !!grade },
            { n: 2, l: t('科目', 'Subject'), a: !!subject },
            { n: 3, l: t('學期', 'Term'), a: !!term },
            { n: 4, l: t('年份', 'Year'), a: !!year }
          ].map(s => (
            <div key={s.n} className={`main-step ${s.a ? 'active' : ''}`}>
              <div className="main-step-number">{s.n}</div>
              <div className="small fw-bold">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="search-section shadow-sm">
          <h2 className="h5 fw-bold mb-4">{t('瀏覽舊試卷', 'Browse Old Papers')}</h2>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold">{t('年級', 'Grade')}</label>
              <select className="form-select" value={grade} onChange={e => setGrade(e.target.value)}>
                <option value="">{t('選擇年級', 'Select Grade')}</option>
                <option value="jh1">{t('初中一年級', 'JH 1')}</option>
                <option value="jh2">{t('初中二年級', 'JH 2')}</option>
                <option value="jh3">{t('初中三年級', 'JH 3')}</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">{t('學科', 'Subject')}</label>
              <select className="form-select" value={subject} onChange={e => setSubject(e.target.value)}>
                <option value="">{t('選擇學科', 'Select Subject')}</option>
                <option value="chi">{t('中文文學', 'Chinese')}</option>
                <option value="math">{t('數學', 'Math')}</option>
                <option value="phy">{t('物理', 'Physics')}</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">{t('學期', 'Term')}</label>
              <select className="form-select" value={term} onChange={e => setTerm(e.target.value)}>
                <option value="">{t('選擇學期', 'Select Term')}</option>
                <option value="t1">{t('第一學期', 'Term 1')}</option>
                <option value="t2">{t('第二學期', 'Term 2')}</option>
                <option value="t3">{t('第三學期', 'Term 3')}</option>
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold">{t('學年', 'Year')}</label>
              <select className="form-select" value={year} onChange={e => setYear(e.target.value)}>
                <option value="">{t('選擇年份', 'Select Year')}</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
              </select>
            </div>
          </div>
          <div className="text-center mt-4">
            <button className="btn main-btn px-5" onClick={handleSearch}>
              <i className="bi bi-search me-2"></i> {t('瀏覽檔案', 'Browse Files')}
            </button>
          </div>
        </div>

        {results && (
          <div className="results-section p-4">
            <h5 className="fw-bold border-bottom pb-2 mb-3"><i className="bi bi-list-task me-2"></i>{t('搜尋結果', 'Results')}</h5>
            {results === 'none' ? (
              <div className="text-center py-5 text-muted">
                <i className="bi bi-file-earmark-x d-block h1 mb-3"></i>
                <p>{t('暫無符合條件的試卷檔案。成為首個貢獻者！', 'No matching documents found. Be the first contributor!')}</p>
              </div>
            ) : (
              <div className="result-item border shadow-sm rounded-3">
                <div className="fw-bold h5 mb-2">{lang === 'zh' ? results.title_zh : results.title_en}</div>
                <p className="text-muted small mb-3">{t('已找到對應試卷，請點擊下方連結查看：', 'File found. Click below to view:')}</p>
                <a href={results.url} target="_blank" className="result-link">
                  <i className="bi bi-google-drive"></i> {t('前往 Google Drive 查看', 'View on Google Drive')}
                </a>
              </div>
            )}
            <div className="text-center mt-3">
              <button className="btn btn-sm btn-link text-decoration-none" onClick={() => setResults(null)}>
                <i className="bi bi-arrow-left me-1"></i>{t('重置搜尋', 'Reset Search')}
              </button>
            </div>
          </div>
        )}

        <div className="upload-section shadow-sm" id="upload">
          <h2 className="h4 fw-bold mb-4">{t('上傳您的舊試卷', 'Upload Old Papers')}</h2>
          <div className="alert alert-info border-0 shadow-sm mb-4">
             <h6 className="fw-bold">{t('隱私保護承諾', 'Privacy Guarantee')}</h6>
             <p className="small mb-0">{t('所有上傳試卷將嚴格保密並去識別化，確保符合隱私政策。', 'Papers are redacted and reviewed to protect your identity.')}</p>
          </div>
          <div className="features-grid">
            <div className="p-3 bg-light rounded text-center">
              <i className="bi bi-shield-check h3 text-primary d-block mb-2"></i>
              <div className="fw-bold">{t('保密處理', 'Redaction')}</div>
              <small>{t('遮蓋個人姓名學號', 'Privacy redact')}</small>
            </div>
            <div className="p-3 bg-light rounded text-center">
              <i className="bi bi-eye-slash h3 text-primary d-block mb-2"></i>
              <div className="fw-bold">{t('匿名上傳', 'Anonymous')}</div>
              <small>{t('身分資訊不公開', 'Identity protected')}</small>
            </div>
            <div className="p-3 bg-light rounded text-center">
              <i className="bi bi-clipboard-check h3 text-primary d-block mb-2"></i>
              <div className="fw-bold">{t('管理員審核', 'Review')}</div>
              <small>{t('確保內容質量', 'Quality check')}</small>
            </div>
          </div>
          <div className="text-center mt-5">
            <a href="https://forms.gle/zDivK2A37ZDgNQDj8" target="_blank" className="btn main-btn btn-lg px-5 shadow">
              <i className="bi bi-google me-2"></i> {t('透過 Google 表單上傳', 'Upload via Google Form')}
            </a>
          </div>
        </div>
      </div>

      <footer className="footer py-4 mt-5">
        <div className="container">
          <p className="mb-0 small fw-bold">&copy; 2024 {t('試卷題庫系統 版權所有', 'Paper Repository System. All Rights Reserved.')}</p>
        </div>
      </footer>
    </div>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
