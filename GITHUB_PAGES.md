# 線上 CV：GitHub Pages 發布與版本管理

## 架構

- 編輯來源：`public/software-cv.html`
- PDF：`public/dickson-lo-software-cv.pdf`
- 其他靜態資源：`public/`
- 發布成品：`pages-dist/`（由指令產生，不提交 Git）
- 自動發布：`.github/workflows/deploy-pages.yml`
- 現有 Sites 網站：保留，不因 GitHub Pages 發布而變更或下線

發布腳本會把 `public/` 複製成靜態網站，並以 `software-cv.html` 產生首頁
`index.html`。所有站內資源使用相對路徑，因此同時支援：

- 使用者網站：`https://<username>.github.io/`
- 專案網站：`https://<username>.github.io/<repository>/`

## 第一次啟用

1. 在 GitHub 建立公開 repository。建議名稱：`cv-site`。
2. 將本機 repository 新增 GitHub remote，保留既有 `sites` remote。
3. 推送 `main` 與版本 tags 到 GitHub。
4. 到 repository 的 **Settings → Pages → Build and deployment**，將 Source 設為
   **GitHub Actions**。
5. 等待 `Deploy CV to GitHub Pages` 成功，再驗證首頁、PDF、作品連結與 HTTPS。

以上步驟會建立公開原始碼與公開網站；執行前需取得使用者確認。

## 日常更新與發布

1. 更新 `public/software-cv.html`、PDF 或圖片。
2. 執行 `npm run pages:build`，確認 `pages-dist/index.html` 與 PDF 已產生。
3. 在本機預覽 `pages-dist/`，檢查手機版、列印與所有連結。
4. 建立一個只包含本次履歷更新的 commit。
5. 建立不可重複的版本標籤，例如：`cv-v2026.07.13.1`。
6. 推送 `main` 與標籤。`main` 更新會自動發布 GitHub Pages。
7. 到 Actions 確認部署成功，再打開公開網址抽查。

建議 commit 訊息：`Update CV for <職缺或日期>`。

## 回復舊版本

標準方式使用 `git revert`，建立一個「還原」commit 後推送 `main`。這樣不會重寫
歷史，且 GitHub Actions 會自動發布還原後內容。完成後再建立一個新 tag，例如
`cv-v2026.07.13.2`。

若要精確回復到某個 tag，先比較該 tag 與 `main`，再 revert tag 之後的 CV commits。
不要 force-push `main`，也不要刪除既有 tags。GitHub 的 commit、tag 與 Actions
部署紀錄可共同追溯每一次公開版本。

## 遷移安全清單

- [ ] GitHub repository 已確認只含可公開資訊，沒有 API key、私密附件或未公開資料。
- [ ] Actions 部署成功，公開網址可用。
- [ ] `https://<username>.github.io/<repository>/` 首頁正常。
- [ ] PDF 可下載，檔名與內容正確。
- [ ] LinkedIn、Email、四個原型、Notion、App Store、Google Sites 連結逐一正常。
- [ ] 桌面、手機、列印版面正常。
- [ ] 網頁與資源皆為 HTTPS，沒有 mixed content。
- [ ] 建立第一個穩定 tag，並實際演練一次本機回復流程。
- [ ] 先在履歷、LinkedIn 或求職平台的小範圍位置換成新網址。
- [ ] 觀察至少 7 天；期間保留現有 Sites 網址。
- [ ] 確認所有主要入口已切換後，再決定是否保留 Sites 作為備援；不直接刪除。

## 儲存空間結論

目前網站只有 HTML、PDF、圖片與小型 SVG，全部可直接由 GitHub Pages 提供，
不需要額外儲存服務。現在最大的檔案約為 735 KB 圖片，PDF 約 225 KB，遠低於
GitHub 單檔與 Pages 網站大小限制。

只有在以下情況才需要外部儲存：

- 單檔接近 50 MB：先壓縮；大型可下載檔改用 GitHub Releases。
- 單檔超過 100 MB：一般 Git repository 會拒絕，改用 Releases 或物件儲存。
- 私密檔案：不要放公開 repository 或 Pages；用 Google Drive、Dropbox、Box 等
  權限連結，或使用具驗證機制的物件儲存。
- 大量圖片／影音或流量接近 Pages 配額：使用 Cloudflare R2、Amazon S3、Backblaze
  B2 等物件儲存搭配 CDN，並在 HTML 中改成完整 HTTPS 資源網址。
- 需要表單上傳、登入、資料庫或即時資料：GitHub Pages 不執行後端；改用獨立 API
  與資料庫，或使用具後端能力的託管平台。

若未出現上述需求，維持單一 GitHub repository 最簡單、成本最低，也最容易用 tag
與 commit 回復。
