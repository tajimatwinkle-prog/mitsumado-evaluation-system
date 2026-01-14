# ミツマド業者評価システム

建設業界向けの革新的なマッチングプラットフォーム。2軸評価システム（規模ランク×実績ランク）とバッジシステムにより、適正な業者選定を実現します。

![ミツマドロゴ](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Mitsumado+Evaluation+System)

## 🎯 主要機能

### 2軸評価システム
- **規模ランク（A-E）**: 建設業法に完全準拠した法的安全性
- **実績ランク（プラチナ〜要改善）**: パフォーマンスベースの評価

### バッジシステム
- 専門性バッジ（外壁塗装マスター、防水のプロ等）
- サービス品質バッジ（スピード対応、高評価継続等）
- 信頼性バッジ（無事故記録、ISO取得企業等）
- 特別バッジ（月間MVP、新星賞等）

### 高度な検索・フィルタリング
- 業者名・工事種別での検索
- 複数条件でのフィルタリング
- 案件規模別のクイック選択

## 🚀 デモサイト

**GitHub Pages**: [https://[あなたのユーザー名].github.io/mitsumado-evaluation-system/](https://[あなたのユーザー名].github.io/mitsumado-evaluation-system/)

## 📦 インストール方法

### 前提条件
- Node.js 16.x以上
- npm または yarn

### セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/[あなたのユーザー名]/mitsumado-evaluation-system.git

# ディレクトリに移動
cd mitsumado-evaluation-system

# 依存パッケージをインストール
npm install

# 開発サーバーを起動
npm run dev
```

開発サーバーが起動したら、ブラウザで `http://localhost:5173` にアクセスしてください。

## 🛠️ ビルド

```bash
# 本番用ビルド
npm run build

# ビルド結果をプレビュー
npm run preview
```

ビルドされたファイルは `dist` フォルダに出力されます。

## 📁 プロジェクト構造

```
mitsumado-evaluation-system/
├── src/
│   ├── App.jsx          # メインコンポーネント
│   ├── main.jsx         # エントリーポイント
│   └── index.css        # グローバルスタイル
├── index.html           # HTMLテンプレート
├── package.json         # 依存関係
├── vite.config.js       # Vite設定
└── README.md           # このファイル
```

## 🌐 GitHub Pagesへのデプロイ

### 方法1: 手動デプロイ

```bash
# ビルド
npm run build

# GitHub Pagesブランチを作成してデプロイ
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### 方法2: GitHub Actionsで自動デプロイ

1. リポジトリの Settings > Pages に移動
2. Source を "GitHub Actions" に設定
3. `.github/workflows/deploy.yml` が自動で実行されます

## 🎨 技術スタック

- **フレームワーク**: React 18
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS (CDN)
- **アイコン**: Lucide React
- **言語**: JavaScript (JSX)

## 📊 システムの特徴

### 3つの圧倒的優位性

1. **建設業法完全準拠による法的安全性**
   - A-Eランクで受注可能規模を明示
   - 発注者が法的リスクを事前に把握

2. **2軸評価による適正マッチング**
   - 会社の規模と実績の質を分離評価
   - 案件規模に最適な業者を選定可能

3. **客観データ自動収集による透明性**
   - 返信時間、完工日数等を自動計測
   - 主観的評価に頼らない信頼性

## 🤝 コントリビューション

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

## 📄 ライセンス

MIT License

## 📞 お問い合わせ

- プロジェクト作成者: 中島CEO
- 作成日: 2026年1月14日
- バージョン: Ver 2.0（競合優位性強化版）

---

**ミツマド** - 建設業界ナンバーワンの巨大プラットフォームを目指して
