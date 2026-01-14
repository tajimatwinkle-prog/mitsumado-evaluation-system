# 🚀 ミツマド評価システム - GitHub公開＆Web確認手順

## 📋 目次
1. [GitHubリポジトリの作成](#1-githubリポジトリの作成)
2. [コードのアップロード](#2-コードのアップロード)
3. [GitHub Pagesの設定](#3-github-pagesの設定)
4. [Webで確認](#4-webで確認)

---

## 1. GitHubリポジトリの作成

### ステップ 1.1: GitHubにログイン
1. [GitHub.com](https://github.com) にアクセス
2. アカウントにログイン（アカウントがない場合は新規作成）

### ステップ 1.2: 新しいリポジトリを作成
1. 右上の「+」ボタンをクリック → 「New repository」を選択
2. 以下の情報を入力：
   - **Repository name**: `mitsumado-evaluation-system`
   - **Description**: `ミツマド業者評価システム - 建設業界向けマッチングプラットフォーム`
   - **Public** を選択（誰でも見られる）
   - **Add a README file** はチェックしない
   - **Add .gitignore** は「None」
   - **Choose a license** は「MIT License」を推奨
3. 「Create repository」ボタンをクリック

---

## 2. コードのアップロード

### 方法A: GitHub Desktop（初心者におすすめ）

#### ステップ 2A.1: GitHub Desktopをインストール
1. [GitHub Desktop](https://desktop.github.com/) をダウンロード＆インストール
2. GitHub Desktopを起動してログイン

#### ステップ 2A.2: リポジトリをクローン
1. 「File」→「Clone repository」
2. 作成したリポジトリ（mitsumado-evaluation-system）を選択
3. 保存先を選択して「Clone」

#### ステップ 2A.3: ファイルをコピー
1. ダウンロードした `mitsumado-github` フォルダの中身を、
   クローンしたフォルダにすべてコピー
2. GitHub Desktopに戻ると、変更が検出される

#### ステップ 2A.4: コミット＆プッシュ
1. 左下の「Summary」に「Initial commit」と入力
2. 「Commit to main」ボタンをクリック
3. 上部の「Push origin」ボタンをクリック

### 方法B: コマンドライン（経験者向け）

```bash
# ダウンロードしたフォルダに移動
cd mitsumado-github

# Gitリポジトリを初期化
git init

# すべてのファイルを追加
git add .

# コミット
git commit -m "Initial commit: ミツマド業者評価システム"

# リモートリポジトリを追加（[ユーザー名]を自分のものに変更）
git remote add origin https://github.com/[ユーザー名]/mitsumado-evaluation-system.git

# ブランチ名をmainに変更（必要に応じて）
git branch -M main

# プッシュ
git push -u origin main
```

---

## 3. GitHub Pagesの設定

### ステップ 3.1: Settings を開く
1. GitHubのリポジトリページに移動
2. 上部メニューの「Settings」をクリック

### ステップ 3.2: Pages の設定
1. 左サイドバーの「Pages」をクリック
2. 「Source」セクションで以下を設定：
   - **Source**: 「GitHub Actions」を選択
3. 保存すると、自動的にデプロイワークフローが実行されます

### ステップ 3.3: デプロイの確認
1. 上部メニューの「Actions」をクリック
2. 「Deploy to GitHub Pages」ワークフローが実行中/完了を確認
3. 緑色のチェックマークが表示されたら完了！

---

## 4. Webで確認

### ステップ 4.1: URLにアクセス
デプロイ完了後、以下のURLでアクセスできます：

```
https://[ユーザー名].github.io/mitsumado-evaluation-system/
```

**例**: ユーザー名が `tanaka-taro` の場合
```
https://tanaka-taro.github.io/mitsumado-evaluation-system/
```

### ステップ 4.2: URLの確認方法
1. GitHubリポジトリページの「Settings」→「Pages」
2. 「Your site is live at...」にURLが表示されます
3. URLをクリックして確認

---

## 🎉 完成！

システムが正常に動作していることを確認：
- ✅ ヘッダーに「ミツマド」ロゴが表示される
- ✅ 業者検索フィルターが動作する
- ✅ 業者カードをクリックすると詳細モーダルが開く
- ✅ 「選定ガイド」「システムについて」タブが切り替わる

---

## 🔧 トラブルシューティング

### Q1: GitHub Pagesで404エラーが出る
**A**: 以下を確認してください：
1. GitHub Actionsのワークフローが成功しているか
2. Settings > Pages で「GitHub Actions」が選択されているか
3. 5-10分待ってから再度アクセス

### Q2: 画面が真っ白になる
**A**: ブラウザの開発者ツールでエラーを確認：
1. F12キーを押して開発者ツールを開く
2. 「Console」タブでエラーメッセージを確認
3. エラーがあればissueを作成してください

### Q3: デプロイが失敗する
**A**: GitHub Actionsのログを確認：
1. リポジトリの「Actions」タブを開く
2. 失敗したワークフローをクリック
3. エラーメッセージを確認して対処

---

## 📱 スマホでも確認可能

GitHub PagesのURLは、スマートフォンでもアクセス可能です：
- レスポンシブデザインで最適化されています
- PCと同じURLでアクセスしてください

---

## 🔄 更新方法

コードを修正した場合：

### GitHub Desktop使用の場合
1. ファイルを編集
2. GitHub Desktopで変更を確認
3. コミットメッセージを入力
4. 「Commit to main」→「Push origin」
5. 自動的に再デプロイされます（5-10分）

### コマンドライン使用の場合
```bash
git add .
git commit -m "更新内容の説明"
git push
```

---

## 📞 サポート

問題が発生した場合：
1. このREADMEのトラブルシューティングを確認
2. [GitHubのissue](https://github.com/[ユーザー名]/mitsumado-evaluation-system/issues)を作成
3. エラーメッセージとスクリーンショットを添付

---

**ミツマド業者評価システム** - Ver 2.0
作成日: 2026年1月14日
