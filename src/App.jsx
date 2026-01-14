import React, { useState, useMemo } from 'react';
import { Search, Star, Award, Shield, Zap, Trophy, Clock, TrendingUp, CheckCircle, AlertCircle, Filter, ChevronDown, MapPin, Phone, Mail, ExternalLink } from 'lucide-react';

// サンプルデータ - 実際のシステムではAPIから取得
const sampleContractors = [
  {
    id: 1,
    name: '株式会社サンプル建設',
    sizeRank: 'A',
    sizeRankDetail: '特定建設業・年商15億円',
    performanceRank: 'gold',
    performanceScore: 4.2,
    completedProjects: 52,
    badges: ['無事故記録', 'スピード対応', '大規模修繕パートナー', '外壁塗装マスター'],
    specialties: ['外壁塗装', '防水工事', '大規模修繕'],
    avgResponseTime: '25分',
    avgCompletionDays: 45,
    repeatRate: 55,
    area: '大阪府・兵庫県',
    establishedYear: 2005,
    employees: 45,
    licenses: ['特定建設業許可', '一級建築施工管理技士 5名'],
    description: '大規模修繕に特化した実績豊富な総合建設会社。特定建設業許可を保有し、下請総額4,500万円以上の案件にも対応可能です。',
    recentReviews: [
      { rating: 5, comment: '工期を守り、品質も申し分ありませんでした。', date: '2026-01-10' },
      { rating: 4, comment: '対応が迅速で安心してお任せできました。', date: '2026-01-05' }
    ]
  },
  {
    id: 2,
    name: '関西リフォーム株式会社',
    sizeRank: 'B',
    sizeRankDetail: '一般建設業・年商6億円',
    performanceRank: 'platinum',
    performanceScore: 4.6,
    completedProjects: 128,
    badges: ['高評価継続', 'リピート率王', 'アフターフォロー充実', 'ミツマド歴3年'],
    specialties: ['内装リノベーション', '外壁塗装', '防水工事'],
    avgResponseTime: '18分',
    avgCompletionDays: 32,
    repeatRate: 68,
    area: '大阪府全域',
    establishedYear: 2010,
    employees: 28,
    licenses: ['一般建設業許可', '一級建築施工管理技士 3名'],
    description: '中規模修繕を得意とする、顧客満足度の高い建設会社。リピート率68%の信頼性が特徴です。',
    recentReviews: [
      { rating: 5, comment: 'アフターフォローが素晴らしく、安心です。', date: '2026-01-12' },
      { rating: 5, comment: '説明が丁寧で、仕上がりも期待以上でした。', date: '2026-01-08' }
    ]
  },
  {
    id: 3,
    name: '山田建装',
    sizeRank: 'C',
    sizeRankDetail: '一般建設業・年商3億円',
    performanceRank: 'silver',
    performanceScore: 3.8,
    completedProjects: 34,
    badges: ['防水のプロ', 'スピード対応'],
    specialties: ['防水工事', '外壁塗装'],
    avgResponseTime: '42分',
    avgCompletionDays: 28,
    repeatRate: 42,
    area: '大阪市内',
    establishedYear: 2015,
    employees: 15,
    licenses: ['一般建設業許可', '一級防水施工技能士 2名'],
    description: '防水工事に特化した専門性の高い建設会社。小〜中規模案件に迅速対応します。',
    recentReviews: [
      { rating: 4, comment: '防水工事の技術力が高いと感じました。', date: '2026-01-11' },
      { rating: 4, comment: '価格も適正で満足しています。', date: '2026-01-06' }
    ]
  },
  {
    id: 4,
    name: '有限会社田中工務店',
    sizeRank: 'D',
    sizeRankDetail: '一般建設業・年商8,000万円',
    performanceRank: 'bronze',
    performanceScore: 3.5,
    completedProjects: 18,
    badges: ['地域貢献賞', '新星賞'],
    specialties: ['内装工事', '小規模修繕'],
    avgResponseTime: '65分',
    avgCompletionDays: 22,
    repeatRate: 35,
    area: '大阪市東部',
    establishedYear: 2018,
    employees: 8,
    licenses: ['一般建設業許可'],
    description: '地域密着型の工務店。小規模案件に対してフットワークの軽い対応が強みです。',
    recentReviews: [
      { rating: 4, comment: 'フットワークが軽く、相談しやすかったです。', date: '2026-01-09' },
      { rating: 3, comment: '価格は安いですが、もう少し工期管理を。', date: '2026-01-03' }
    ]
  },
  {
    id: 5,
    name: '松本塗装',
    sizeRank: 'E',
    sizeRankDetail: '個人事業主',
    performanceRank: 'standard',
    performanceScore: 3.2,
    completedProjects: 7,
    badges: [],
    specialties: ['外壁塗装'],
    avgResponseTime: '120分',
    avgCompletionDays: 18,
    repeatRate: 28,
    area: '豊中市・吹田市',
    establishedYear: 2020,
    employees: 2,
    licenses: ['塗装技能士'],
    description: '個人事業主として丁寧な施工を心がけています。500万円未満の小規模案件に対応。',
    recentReviews: [
      { rating: 4, comment: '価格が安く助かりました。', date: '2026-01-07' },
      { rating: 3, comment: '仕上がりは良いが、連絡が少し遅いです。', date: '2025-12-28' }
    ]
  }
];

// バッジのアイコンマッピング
const badgeIcons = {
  '無事故記録': { icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50' },
  'スピード対応': { icon: Zap, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  '大規模修繕パートナー': { icon: Trophy, color: 'text-purple-600', bg: 'bg-purple-50' },
  '外壁塗装マスター': { icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
  '防水のプロ': { icon: Award, color: 'text-cyan-600', bg: 'bg-cyan-50' },
  '高評価継続': { icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
  'リピート率王': { icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  'アフターフォロー充実': { icon: CheckCircle, color: 'text-teal-600', bg: 'bg-teal-50' },
  'ミツマド歴3年': { icon: Trophy, color: 'text-orange-600', bg: 'bg-orange-50' },
  '地域貢献賞': { icon: Award, color: 'text-pink-600', bg: 'bg-pink-50' },
  '新星賞': { icon: Star, color: 'text-rose-600', bg: 'bg-rose-50' }
};

// ランク情報
const sizeRankInfo = {
  A: { label: 'A（特定・大規模）', color: 'from-purple-600 to-indigo-600', description: '大規模修繕対応可', icon: '🏢' },
  B: { label: 'B（一般・中規模）', color: 'from-blue-600 to-cyan-600', description: '中規模修繕対応可', icon: '🏗️' },
  C: { label: 'C（許可あり）', color: 'from-green-600 to-emerald-600', description: '一般修繕対応可', icon: '🔨' },
  D: { label: 'D（小規模）', color: 'from-yellow-600 to-orange-600', description: '小規模工事対応可', icon: '🛠️' },
  E: { label: 'E（個人事業主）', color: 'from-gray-600 to-slate-600', description: '軽微な工事のみ', icon: '👷' }
};

const performanceRankInfo = {
  platinum: { label: 'プラチナ', icon: '🏆', color: 'from-cyan-400 to-blue-500', description: '最上位実績' },
  gold: { label: 'ゴールド', icon: '🥇', color: 'from-yellow-400 to-amber-500', description: '優良実績' },
  silver: { label: 'シルバー', icon: '🥈', color: 'from-gray-300 to-gray-400', description: '標準実績' },
  bronze: { label: 'ブロンズ', icon: '🥉', color: 'from-orange-400 to-amber-600', description: '基準達成' },
  standard: { label: 'スタンダード', icon: '🔰', color: 'from-green-400 to-emerald-500', description: '新規・成長中' },
  needsImprovement: { label: '要改善', icon: '⚠️', color: 'from-red-400 to-rose-500', description: '改善必要' }
};

const MitsumadoEvaluationSystem = () => {
  const [selectedView, setSelectedView] = useState('search'); // search, guide, about
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    sizeRank: [],
    performanceRank: [],
    specialty: [],
    projectSize: 'all' // small, medium, large, all
  });
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [showFilters, setShowFilters] = useState(false);

  // フィルタリング処理
  const filteredContractors = useMemo(() => {
    return sampleContractors.filter(contractor => {
      // 検索クエリ
      if (searchQuery && !contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !contractor.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
        return false;
      }
      
      // 規模ランク
      if (filters.sizeRank.length > 0 && !filters.sizeRank.includes(contractor.sizeRank)) {
        return false;
      }
      
      // 実績ランク
      if (filters.performanceRank.length > 0 && !filters.performanceRank.includes(contractor.performanceRank)) {
        return false;
      }
      
      // 専門性
      if (filters.specialty.length > 0 && !filters.specialty.some(s => contractor.specialties.includes(s))) {
        return false;
      }
      
      // 案件規模によるおすすめフィルタ
      if (filters.projectSize !== 'all') {
        if (filters.projectSize === 'large' && !['A', 'B'].includes(contractor.sizeRank)) return false;
        if (filters.projectSize === 'medium' && !['B', 'C'].includes(contractor.sizeRank)) return false;
        if (filters.projectSize === 'small' && !['C', 'D', 'E'].includes(contractor.sizeRank)) return false;
      }
      
      return true;
    });
  }, [searchQuery, filters]);

  const toggleFilter = (category, value) => {
    setFilters(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value]
    }));
  };

  const ContractorCard = ({ contractor, onClick }) => {
    const sizeInfo = sizeRankInfo[contractor.sizeRank];
    const perfInfo = performanceRankInfo[contractor.performanceRank];
    
    return (
      <div 
        onClick={onClick}
        className="bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-400 transition-all duration-300 cursor-pointer hover:shadow-xl transform hover:-translate-y-1"
      >
        {/* ヘッダー部分 */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{contractor.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <MapPin size={14} />
                <span>{contractor.area}</span>
                <span className="text-gray-400">•</span>
                <span>設立 {contractor.establishedYear}年</span>
              </div>
            </div>
          </div>
          
          {/* ランクバッジ */}
          <div className="flex flex-wrap gap-2 mb-3">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${sizeInfo.color} text-white text-sm font-bold shadow-md`}>
              <span className="text-base">{sizeInfo.icon}</span>
              <span>規模 {contractor.sizeRank}</span>
            </div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r ${perfInfo.color} text-white text-sm font-bold shadow-md`}>
              <span className="text-base">{perfInfo.icon}</span>
              <span>{perfInfo.label}</span>
            </div>
          </div>
          
          {/* 評価スコア */}
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <span className="font-bold text-gray-900">{contractor.performanceScore}</span>
              <span className="text-gray-500">/ 5.0</span>
            </div>
            <div className="text-gray-600">
              完工 <span className="font-bold text-gray-900">{contractor.completedProjects}</span>件
            </div>
            <div className="text-gray-600">
              リピート率 <span className="font-bold text-gray-900">{contractor.repeatRate}</span>%
            </div>
          </div>
        </div>
        
        {/* バッジ部分 */}
        {contractor.badges.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {contractor.badges.slice(0, 3).map((badge, idx) => {
                const badgeInfo = badgeIcons[badge] || { icon: Award, color: 'text-gray-600', bg: 'bg-gray-100' };
                const Icon = badgeInfo.icon;
                return (
                  <div key={idx} className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${badgeInfo.bg} text-xs font-medium ${badgeInfo.color}`}>
                    <Icon size={12} />
                    <span>{badge}</span>
                  </div>
                );
              })}
              {contractor.badges.length > 3 && (
                <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-gray-200 text-xs font-medium text-gray-700">
                  +{contractor.badges.length - 3}個
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* 詳細情報 */}
        <div className="p-6">
          <p className="text-sm text-gray-700 mb-4 line-clamp-2">{contractor.description}</p>
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Clock className="text-indigo-600 mt-0.5" size={14} />
              <div>
                <div className="text-gray-500">平均返信時間</div>
                <div className="font-bold text-gray-900">{contractor.avgResponseTime}</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="text-green-600 mt-0.5" size={14} />
              <div>
                <div className="text-gray-500">平均完工日数</div>
                <div className="font-bold text-gray-900">{contractor.avgCompletionDays}日</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-1.5">
            {contractor.specialties.map((specialty, idx) => (
              <span key={idx} className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const ContractorDetailModal = ({ contractor, onClose }) => {
    if (!contractor) return null;
    
    const sizeInfo = sizeRankInfo[contractor.sizeRank];
    const perfInfo = performanceRankInfo[contractor.performanceRank];
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
        <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl" onClick={e => e.stopPropagation()}>
          {/* ヘッダー */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-t-2xl">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-3xl font-bold mb-2">{contractor.name}</h2>
                <p className="text-indigo-100">{contractor.sizeRankDetail}</p>
              </div>
              <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm text-sm font-bold`}>
                <span className="text-xl">{sizeInfo.icon}</span>
                <span>規模ランク {contractor.sizeRank}</span>
              </div>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm text-sm font-bold`}>
                <span className="text-xl">{perfInfo.icon}</span>
                <span>{perfInfo.label}ランク</span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white bg-opacity-20 backdrop-blur-sm text-sm font-bold">
                <Star className="fill-yellow-300 text-yellow-300" size={18} />
                <span>{contractor.performanceScore} / 5.0</span>
              </div>
            </div>
          </div>
          
          {/* コンテンツ */}
          <div className="p-8">
            {/* バッジセクション */}
            {contractor.badges.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="text-indigo-600" size={20} />
                  獲得バッジ
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {contractor.badges.map((badge, idx) => {
                    const badgeInfo = badgeIcons[badge] || { icon: Award, color: 'text-gray-600', bg: 'bg-gray-100' };
                    const Icon = badgeInfo.icon;
                    return (
                      <div key={idx} className={`flex items-center gap-2 px-3 py-2.5 rounded-lg ${badgeInfo.bg} ${badgeInfo.color} border-2 border-transparent hover:border-current transition-colors`}>
                        <Icon size={16} />
                        <span className="text-sm font-medium">{badge}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* 実績・統計情報 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">実績・パフォーマンス</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="text-blue-600 mb-1 text-sm font-medium">完工件数</div>
                  <div className="text-2xl font-bold text-blue-900">{contractor.completedProjects}件</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="text-green-600 mb-1 text-sm font-medium">平均返信時間</div>
                  <div className="text-2xl font-bold text-green-900">{contractor.avgResponseTime}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="text-purple-600 mb-1 text-sm font-medium">平均完工日数</div>
                  <div className="text-2xl font-bold text-purple-900">{contractor.avgCompletionDays}日</div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-orange-600 mb-1 text-sm font-medium">リピート率</div>
                  <div className="text-2xl font-bold text-orange-900">{contractor.repeatRate}%</div>
                </div>
              </div>
            </div>
            
            {/* 会社情報 */}
            <div className="mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-4">会社情報</h3>
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="text-gray-400 mt-1" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">対応エリア</div>
                    <div className="font-medium text-gray-900">{contractor.area}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-gray-400 mt-1" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">保有資格・許可</div>
                    <div className="font-medium text-gray-900">{contractor.licenses.join(' / ')}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-gray-400 mt-1" size={18} />
                  <div>
                    <div className="text-sm text-gray-500">設立年 / 従業員数</div>
                    <div className="font-medium text-gray-900">{contractor.establishedYear}年 / {contractor.employees}名</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 最近のレビュー */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">最近のレビュー</h3>
              <div className="space-y-4">
                {contractor.recentReviews.map((review, idx) => (
                  <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* アクションボタン */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                この業者に見積依頼
              </button>
              <button className="px-6 py-4 border-2 border-gray-300 rounded-xl font-bold text-gray-700 hover:border-indigo-600 hover:text-indigo-600 transition-colors">
                お気に入り
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SelectionGuide = () => (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white mb-8">
        <h2 className="text-3xl font-bold mb-3">業者選定ガイド</h2>
        <p className="text-indigo-100">案件規模や重視するポイントに応じた最適な業者の選び方</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl border-2 border-blue-200 p-6 hover:shadow-xl transition-all">
          <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <Shield className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">安心・管理重視</h3>
          <p className="text-sm text-gray-600 mb-4">大規模案件向け</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm"><span className="font-bold text-blue-600">推奨:</span> 規模A + 実績ゴールド以上</div>
            <div className="text-sm text-gray-600">✓ 法的管理能力</div>
            <div className="text-sm text-gray-600">✓ 財務基盤</div>
            <div className="text-sm text-gray-600">✓ 大規模実績豊富</div>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
            注意: 価格は市場平均より高めになる傾向
          </div>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-green-200 p-6 hover:shadow-xl transition-all">
          <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">バランス重視</h3>
          <p className="text-sm text-gray-600 mb-4">中規模案件向け</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm"><span className="font-bold text-green-600">推奨:</span> 規模B-C + 実績シルバー以上</div>
            <div className="text-sm text-gray-600">✓ 適正価格</div>
            <div className="text-sm text-gray-600">✓ フットワークの軽さ</div>
            <div className="text-sm text-gray-600">✓ きめ細かい対応</div>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
            注意: 超大規模案件への対応力は限定的
          </div>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-orange-200 p-6 hover:shadow-xl transition-all">
          <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <TrendingUp className="text-orange-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">コスト重視</h3>
          <p className="text-sm text-gray-600 mb-4">小規模案件向け</p>
          <div className="space-y-2 mb-4">
            <div className="text-sm"><span className="font-bold text-orange-600">推奨:</span> 規模D-E + 実績ブロンズ以上</div>
            <div className="text-sm text-gray-600">✓ 低価格</div>
            <div className="text-sm text-gray-600">✓ 迅速な対応</div>
            <div className="text-sm text-gray-600">✓ 直接施工</div>
          </div>
          <div className="text-xs text-gray-500 bg-gray-50 rounded p-2">
            注意: 管理体制が簡易。実績ランク確認必須
          </div>
        </div>
      </div>
      
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600 mt-1" size={24} />
          <div>
            <h3 className="text-lg font-bold text-red-900 mb-2">重要な注意喚起</h3>
            <p className="text-sm text-red-800">
              価格のみで業者を選ぶと、手抜き工事や追加請求のリスクが高まります。必ず「実績ランク」を確認し、過去の評価が高い業者を選定してください。
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const AboutSystem = () => (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white mb-8">
        <h2 className="text-3xl font-bold mb-3">ミツマド評価システムについて</h2>
        <p className="text-purple-100">建設業界初の2軸評価システムで、適正なマッチングを実現</p>
      </div>
      
      <div className="bg-white rounded-xl border-2 border-gray-200 p-8 mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">3つの圧倒的優位性</h3>
        
        <div className="space-y-6">
          <div className="border-l-4 border-blue-600 pl-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">① 建設業法完全準拠による「法的安全性」</h4>
            <p className="text-sm text-gray-700 mb-2">
              建設業法に基づくA-Eランクで、発注者が「この業者に任せて大丈夫か？」を法的に判断できる唯一のプラットフォーム。
            </p>
            <p className="text-xs text-gray-600">
              他社は「口コミ」「星評価」のみで、業者の法的な受注可能規模を明示していません。
            </p>
          </div>
          
          <div className="border-l-4 border-green-600 pl-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">② 2軸評価（規模×実績）による「適正マッチング」</h4>
            <p className="text-sm text-gray-700 mb-2">
              「会社の大きさ」と「実績の質」を分離することで、発注者が案件規模に合った業者を選択可能。
            </p>
            <p className="text-xs text-gray-600">
              500万円の案件に年商15億円の業者を選ぶ必要はなく、逆に5,000万円の案件に個人事業主は法的にNG。
            </p>
          </div>
          
          <div className="border-l-4 border-purple-600 pl-6">
            <h4 className="text-lg font-bold text-gray-900 mb-2">③ 客観データ自動収集による「透明性」</h4>
            <p className="text-sm text-gray-700 mb-2">
              返信時間、着工日数、完工日数、再クレーム率などをシステムが自動計測。業者の「口だけ」を排除。
            </p>
            <p className="text-xs text-gray-600">
              他社は発注者の主観的な口コミのみ。自作自演や感情的な低評価のリスクがあります。
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">規模ランク（A-E）</h3>
          <div className="space-y-3">
            {Object.entries(sizeRankInfo).map(([rank, info]) => (
              <div key={rank} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center text-white font-bold`}>
                  {rank}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm">{info.label}</div>
                  <div className="text-xs text-gray-600">{info.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4">実績ランク</h3>
          <div className="space-y-3">
            {Object.entries(performanceRankInfo).map(([rank, info]) => (
              <div key={rank} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${info.color} flex items-center justify-center text-xl`}>
                  {info.icon}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-gray-900 text-sm">{info.label}</div>
                  <div className="text-xs text-gray-600">{info.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* ヘッダー */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                M
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ミツマド
                </h1>
                <p className="text-xs text-gray-600">業者評価システム</p>
              </div>
            </div>
            
            <nav className="flex gap-2">
              <button
                onClick={() => setSelectedView('search')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedView === 'search'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                業者検索
              </button>
              <button
                onClick={() => setSelectedView('guide')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedView === 'guide'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                選定ガイド
              </button>
              <button
                onClick={() => setSelectedView('about')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedView === 'about'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                システムについて
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {selectedView === 'search' && (
          <>
            {/* 検索バー */}
            <div className="mb-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-200">
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="業者名または工事種別で検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-indigo-600 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                      showFilters
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <Filter size={20} />
                    フィルター
                  </button>
                </div>
                
                {/* 案件規模クイック選択 */}
                <div className="flex gap-2">
                  <span className="text-sm text-gray-600 py-2">案件規模:</span>
                  {[
                    { value: 'all', label: 'すべて' },
                    { value: 'large', label: '大規模（3000万円〜）' },
                    { value: 'medium', label: '中規模（500-3000万円）' },
                    { value: 'small', label: '小規模（〜500万円）' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFilters(prev => ({ ...prev, projectSize: option.value }))}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filters.projectSize === option.value
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                
                {/* 詳細フィルター */}
                {showFilters && (
                  <div className="mt-6 pt-6 border-t-2 border-gray-200 space-y-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">規模ランク</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(sizeRankInfo).map(([rank, info]) => (
                          <button
                            key={rank}
                            onClick={() => toggleFilter('sizeRank', rank)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.sizeRank.includes(rank)
                                ? `bg-gradient-to-r ${info.color} text-white shadow-md`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {rank} {info.icon}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">実績ランク</h3>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(performanceRankInfo).map(([rank, info]) => (
                          <button
                            key={rank}
                            onClick={() => toggleFilter('performanceRank', rank)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.performanceRank.includes(rank)
                                ? `bg-gradient-to-r ${info.color} text-white shadow-md`
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {info.icon} {info.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2">専門性</h3>
                      <div className="flex flex-wrap gap-2">
                        {['外壁塗装', '防水工事', '大規模修繕', '内装リノベーション'].map(specialty => (
                          <button
                            key={specialty}
                            onClick={() => toggleFilter('specialty', specialty)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              filters.specialty.includes(specialty)
                                ? 'bg-indigo-600 text-white shadow-md'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {specialty}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 検索結果 */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                検索結果: <span className="text-indigo-600">{filteredContractors.length}</span>件
              </h2>
              {(filters.sizeRank.length > 0 || filters.performanceRank.length > 0 || filters.specialty.length > 0 || filters.projectSize !== 'all') && (
                <button
                  onClick={() => setFilters({ sizeRank: [], performanceRank: [], specialty: [], projectSize: 'all' })}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  フィルターをクリア
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContractors.map(contractor => (
                <ContractorCard
                  key={contractor.id}
                  contractor={contractor}
                  onClick={() => setSelectedContractor(contractor)}
                />
              ))}
            </div>

            {filteredContractors.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">検索結果がありません</h3>
                <p className="text-gray-600">フィルター条件を変更してお試しください</p>
              </div>
            )}
          </>
        )}
        
        {selectedView === 'guide' && <SelectionGuide />}
        {selectedView === 'about' && <AboutSystem />}
      </main>

      {/* 業者詳細モーダル */}
      {selectedContractor && (
        <ContractorDetailModal
          contractor={selectedContractor}
          onClose={() => setSelectedContractor(null)}
        />
      )}

      {/* フッター */}
      <footer className="bg-gray-900 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">© 2026 ミツマド業者評価システム. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2">建設業界ナンバーワンの巨大プラットフォームを目指して</p>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return <MitsumadoEvaluationSystem />;
}