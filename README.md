# UDG(UML Diagram Generator)
## 概要
これは[plantUML](https://plantuml.com/ja/)構文を活用してユーザーがUML図を作成するためのWebアプリケーションです。

ユーザーは他のメンバーと共有可能なプロジェクト単位でUML図の作成・保存・画像ダウンロードが可能であり、更にテンプレートを用いて選択したUML図の雛形から簡単にUML図を作成することも可能です。
サイト内のエディタでplantUML構文を編集すると、対応するUML図の結果がリアルタイムで確認できます。

また、plantUML構文を学ぶための学習ページや構文を記述する際に便利なチートシートページも提供しています。学習ページではUML図の説明に合わせて練習問題が用意されており、基本的な構文学習のインプット・アウトプットが可能です。

![udg-demo-large-fast](https://user-images.githubusercontent.com/69419077/234228940-2b03e084-3317-4043-abe9-7bd3c82a7411.gif)


※1　本サイトはプログラミング学習サイト[Recursion](https://recursionist.io/)のチーム開発課題として2023年3月11日〜4月24日の期間における作成物です。尚、サービス改善のため上記期間後もメンバーによるソースコード修正の可能性があります。

## 使用方法
### 1. プロダクションの利用
[当サイト](https://uml-diagram-generator.vercel.app/)に対応するPCブラウザ(※2)でアクセスしてユーザー登録をしてご利用下さい。

※2 対応ブラウザ：下記PCブラウザでの動作のみ確認（Chrome, Brave, firefox）, Mobileは未対応
### 2. ローカルPCでのdevelopment server起動
2-1. ソースコードをローカルに保存、依存パッケージのインストール

2-2. バックエンドサーバーのDockerコンテナ立ち上げ
```
docker-compose up -d
```

2-3. フロントエンドサーバーの起動
```
cd frontend
npm run dev
```

2-4. 対応ブラウザ(※2)で確認 [http://localhost:3000](http://localhost:3000)

## 技術構成とデプロイ先
### フロントエンド - Vercel
- Webサーバー: Typescript + React + Next.js
### バックエンド - AWS EC2
- リバースプロキシ: nginx
- APサーバー１: Typescript + NestJS + Prisma
- APサーバー２: Servelet
- DBサーバー: PostgreSQL

※3 バックエンドはDockerによりコンテナ化し、単一のEC2インスタンスにデプロイ

## 開発に関するリンク
- 開発ログ: [https://github.com/RecursionTeamA-2023-03/devlog](https://github.com/RecursionTeamA-2023-03/devlog)
- プロジェクト管理: [Trello](https://trello.com/b/bbjX36wD/teama)
- ワイヤーフレーム: [Figma](https://www.figma.com/community/file/1232540049660815066)

## 各種ダイアグラム
1. アクティビティ図
<img src="https://user-images.githubusercontent.com/69419077/234167301-f4d79ec9-e30a-4b01-bc9a-bf0ac72f88b8.png" width="500px">

2. シーケンス図
<img src="https://user-images.githubusercontent.com/69419077/234167396-ebab38b5-0624-4e2d-b17a-78a61acb5689.png" width="500px">

3. ER図
<img src="https://user-images.githubusercontent.com/69419077/234175343-ed285b0c-ad2a-494c-adcf-ad7b36d72c0b.png" width="300px">

4. デプロイ図
<img src="https://user-images.githubusercontent.com/69419077/234222345-fac6e805-af1e-413d-92e2-a72ec522a114.png" width="600px">

