
import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import PaperSearch from './components/PaperSearch';
import { Paper } from './types';

const MainContent: React.FC = () => {
  const { t, language } = useLanguage();
  const { user, login, isLoading } = useAuth();
  const [searchResult, setSearchResult] = useState<Paper | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>('');
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (result: Paper | null, title: string) => {
    setSearchResult(result);
    setSearchTitle(title);
    setHasSearched(true);
    
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-12">
      <Navbar />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 mb-10 shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
              {t('welcome_title')}
            </h1>
            <p className="text-lg opacity-90 mb-8 max-w-2xl">
              {t('welcome_desc1')}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="https://forms.gle/zDivK2A37ZDgNQDj8" 
                target="_blank" 
                className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-xl transition-all shadow-md flex items-center gap-2"
              >
                <i className="fas fa-cloud-upload-alt"></i>
                {t('btn_upload')}
              </a>
              {!user && (
                <button 
                  onClick={login}
                  className="bg-blue-500 bg-opacity-30 border border-white border-opacity-30 hover:bg-opacity-40 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2"
                >
                  <i className="fab fa-google"></i>
                  {t('btn_login')}
                </button>
              )}
            </div>
          </div>
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
            <i className="fas fa-graduation-cap text-[200px]"></i>
          </div>
        </div>

        {/* Search */}
        <PaperSearch onSearch={handleSearch} />

        {/* Results */}
        {hasSearched && (
          <div id="results" className="mt-12 animate-fadeIn">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <i className="fas fa-list-ul text-blue-500"></i>
                  {t('results_found')}: {searchTitle}
                </h3>
                <button onClick={() => setHasSearched(false)} className="text-gray-400 hover:text-gray-600 text-sm">
                  {t('clear')}
                </button>
              </div>
              
              <div className="p-8">
                {!user ? (
                   <div className="text-center py-6">
                      <div className="bg-yellow-50 text-yellow-800 p-6 rounded-xl border border-yellow-200 inline-block mb-6 max-w-md">
                        <i className="fas fa-lock mb-3 text-3xl"></i>
                        <p className="font-bold text-lg mb-1">{t('login_required')}</p>
                        <p className="text-sm opacity-80">請登錄您的學校或個人 Gmail 帳號以查看試卷。</p>
                      </div>
                      <br />
                      <button onClick={login} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
                        {t('btn_login')}
                      </button>
                   </div>
                ) : searchResult ? (
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                        <i className="fab fa-google-drive"></i>
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">
                          {language === 'zh' ? searchResult.title_zh : searchResult.title_en}
                        </h4>
                        <p className="text-sm text-gray-500">{t('verified_archive')}</p>
                      </div>
                    </div>
                    <a href={searchResult.url} target="_blank" rel="noopener noreferrer" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-all">
                      <span>{t('view_on_drive')}</span>
                      <i className="fas fa-external-link-alt"></i>
                    </a>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <i className="far fa-frown text-5xl mb-4"></i>
                    <p className="text-lg font-medium">{t('no_results')}</p>
                    <a href="https://forms.gle/zDivK2A37ZDgNQDj8" target="_blank" className="text-blue-600 hover:underline mt-2 inline-block">
                      {t('btn_upload')}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {[
            { icon: 'fa-user-secret', title: t('anonymous_upload'), desc: t('anonymous_upload_desc') },
            { icon: 'fa-check-circle', title: t('admin_review'), desc: t('admin_review_desc') },
            { icon: 'fa-lock', title: t('secure_storage'), desc: t('secure_storage_desc') },
          ].map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-sm transition-all">
              <i className={`fas ${feature.icon} text-2xl text-blue-600 mb-4`}></i>
              <h5 className="font-bold text-gray-800 mb-1">{feature.title}</h5>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="mt-24 border-t border-gray-100 pt-10 text-center text-gray-400 text-sm">
        <p>© 2024 {t('app_name')}. All rights reserved.</p>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
