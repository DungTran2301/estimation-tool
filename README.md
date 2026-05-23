# Estimation Tool

Một trang web blog về "Tư duy Estimate trong Mobile Development" và một tool tính toán effort cho các feature.

## Tính năng hiện tại
- 📖 Blog post về cách senior engineer ước tính effort
- 🎨 Giao diện đẹp, responsive trên mọi thiết bị
- 📱 Hỗ trợ mobile view

## Tính năng sắp tới
- 🧮 Estimation Calculator - tool tính toán effort tự động

## Cách chạy local

1. Clone repository:
```bash
git clone https://github.com/dungtran2301/estimation.git
cd estimation
```

2. Mở file `index.html` trong browser hoặc sử dụng local server:
```bash
# Nếu có Python 3
python -m http.server 8000

# Hoặc nếu có Node.js
npx http-server
```

3. Truy cập `http://localhost:8000`

## Deploy lên GitHub Pages

Được deploy tự động từ branch `master` tới: https://dungtran2301.github.io/estimation

## Cấu trúc dự án

```
.
├── index.html           # Main HTML file
├── content.md          # Blog content in markdown
├── css/
│   └── style.css       # Styling
├── js/
│   └── script.js       # JavaScript functionality
├── README.md           # This file
└── .gitignore
```

## Công nghệ sử dụng

- HTML5
- CSS3
- Vanilla JavaScript
- [Marked.js](https://marked.js.org/) - Markdown parser

## Tác giả

Dũng Trần (@dungtran2301)
