const config = {
  siteUrl: "https://www.local-e-kaiyun.com.cn",
  brand: "开云",
  features: [
    { id: "tip-1", label: "快速入门", content: "浏览首页即可了解服务概览，无需注册即可查看公开内容。" },
    { id: "tip-2", label: "关键词导航", content: "使用下方徽章快速定位相关内容，点击即可过滤。" },
    { id: "tip-3", label: "访问建议", content: "推荐使用 Chrome 或 Edge 浏览器，并启用 JavaScript 以获得完整体验。" }
  ],
  badges: [
    { tag: "开云", type: "primary" },
    { tag: "指南", type: "secondary" },
    { tag: "新功能", type: "accent" },
    { tag: "常见问题", type: "info" }
  ]
};

(function() {
  const container = document.createElement("div");
  container.id = "site-helper-root";
  container.style.cssText = "position:fixed;bottom:20px;right:20px;z-index:9999;font-family:sans-serif;";

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "💡";
  toggleBtn.title = "打开助手面板";
  toggleBtn.style.cssText = "background:#1a73e8;color:#fff;border:none;border-radius:50%;width:48px;height:48px;font-size:22px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.2);";
  container.appendChild(toggleBtn);

  const panel = document.createElement("div");
  panel.style.cssText = "display:none;position:absolute;bottom:60px;right:0;width:340px;max-height:500px;overflow-y:auto;background:#fff;border:1px solid #e0e0e0;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.12);padding:16px;";
  panel.innerHTML = `<div style="font-weight:bold;font-size:16px;margin-bottom:12px;color:#333;">${config.brand} 助手</div>`;

  const tipsSection = document.createElement("div");
  tipsSection.innerHTML = config.features.map(f => `
    <div style="background:#f8f9fa;border-left:4px solid #1a73e8;padding:10px;margin-bottom:10px;border-radius:4px;">
      <div style="font-weight:600;font-size:14px;color:#1a73e8;">${f.label}</div>
      <div style="font-size:13px;color:#555;margin-top:4px;">${f.content}</div>
    </div>
  `).join("");
  panel.appendChild(tipsSection);

  const badgeContainer = document.createElement("div");
  badgeContainer.style.cssText = "margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;";
  const badgeStyles = {
    primary: "background:#1a73e8;color:#fff;",
    secondary: "background:#6c757d;color:#fff;",
    accent: "background:#e8453c;color:#fff;",
    info: "background:#17a2b8;color:#fff;"
  };
  config.badges.forEach(b => {
    const span = document.createElement("span");
    span.textContent = b.tag;
    span.style.cssText = `display:inline-block;padding:4px 12px;border-radius:20px;font-size:12px;font-weight:500;cursor:default;${badgeStyles[b.type] || badgeStyles.secondary}`;
    badgeContainer.appendChild(span);
  });
  panel.appendChild(badgeContainer);

  const visitInfo = document.createElement("div");
  visitInfo.style.cssText = "margin-top:14px;padding:10px;background:#f1f8ff;border-radius:6px;font-size:12px;color:#2c3e50;";
  visitInfo.innerHTML = `<strong>访问说明</strong><br>当前站点：<a href="${config.siteUrl}" target="_blank" style="color:#1a73e8;text-decoration:none;">${config.siteUrl}</a><br>关键词：${config.brand} · 无需登录即可浏览大部分内容。`;
  panel.appendChild(visitInfo);

  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✕";
  closeBtn.style.cssText = "position:absolute;top:8px;right:10px;background:transparent;border:none;font-size:16px;cursor:pointer;color:#999;";
  panel.insertBefore(closeBtn, panel.firstChild);

  toggleBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    const isHidden = panel.style.display === "none";
    panel.style.display = isHidden ? "block" : "none";
    toggleBtn.title = isHidden ? "关闭助手面板" : "打开助手面板";
  });

  closeBtn.addEventListener("click", function(e) {
    e.stopPropagation();
    panel.style.display = "none";
    toggleBtn.title = "打开助手面板";
  });

  document.addEventListener("click", function(e) {
    if (!container.contains(e.target)) {
      panel.style.display = "none";
      toggleBtn.title = "打开助手面板";
    }
  });

  container.appendChild(panel);
  document.body.appendChild(container);
})();