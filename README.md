# Dickson Lo 線上 CV

盧駿軒 Dickson Lo 的軟體產品經理履歷網站，涵蓋 SaaS、平台產品、管理後台與
AI 工作流自動化經驗。

- 線上 CV：<https://dicksonlo901019.github.io/cv-site/>
- PDF：<https://dicksonlo901019.github.io/cv-site/dickson-lo-software-cv.pdf>
- 發布、版本與回復說明：[GITHUB_PAGES.md](./GITHUB_PAGES.md)

## 內容位置

- `public/software-cv.html`：GitHub Pages 的主要履歷來源
- `public/dickson-lo-software-cv.pdf`：可下載 PDF
- `app/`、`worker/`、`.openai/hosting.json`：保留既有 Sites 網站所需來源與設定
- `.github/workflows/deploy-pages.yml`：GitHub Pages 自動發布流程

## 發布原則

更新履歷後先執行 `npm run pages:build` 與 `npm test`。通過後提交至 `main`，
GitHub Actions 會自動發布。每個對外穩定版本使用 `cv-vYYYY.MM.DD.N` 標籤，
需要回復時以 `git revert` 建立新 commit，保留完整歷史。

現有 Sites 網站在 GitHub Pages 完成驗證與入口遷移前持續保留，不直接移除。
