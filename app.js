const demos = [
  { video: 'assets/demos/find-door.webm', label: 'AGENT VIEW / SIMULATION', alt: 'Luxi Agent OS 找到门任务演示', kicker: 'VISUAL SEARCH · NAVIGATION · VERIFY', title: '找到门', body: 'Agent 从自然语言中提取视觉目标，主动观察环境并定位门，在在线地图约束下接近目标，最后使用新鲜 RGB-D 证据验证结果。', skills: ['目标搜索', '语义导航', '到达验证'], quote: '找到门' },
  { video: 'assets/demos/follow-person.webm', label: 'TRACKING VIEW / SIMULATION', alt: 'Luxi Agent OS 人物跟随任务演示', kicker: 'ACQUIRE · TRACK · FOLLOW', title: '跟随前面的人', body: '通过视觉模型完成一次目标获取，再由任务内跟踪器持续维持同一人物；根据深度与方位安全跟随，并在停止后完成终态验证。', skills: ['人物检测', '持续跟踪', '安全停距'], quote: '跟随前面的人' },
  { video: 'assets/demos/fetch-water-return.mp4', label: 'LONG-HORIZON TASK / SIMULATION', alt: 'Luxi Agent OS 去厨房取水并返回任务演示', kicker: 'SEARCH · MANIPULATE · RETURN', title: '去厨房拿水并返回', body: 'Agent 将复合指令拆解为位置搜索、目标接近、抓取、携物导航与返回，在一个长程任务中连接空间记忆和操作技能。', skills: ['房间导航', '物体抓取', '携物返回'], quote: '去厨房拿水并返回' },
  { video: 'assets/demos/move-water-kitchen-return.mp4', label: 'MULTI-STAGE TASK / SIMULATION', alt: 'Luxi Agent OS 跨房间物体搬运任务演示', kicker: 'REASON · TRANSFER · COMPLETE', title: '跨房间物体搬运', body: '从客厅识别并获取水瓶，规划前往厨房的安全路线，完成目标放置后返回。多阶段状态持续保存在同一个任务上下文中。', skills: ['长程规划', '跨房间搬运', '状态保持'], quote: '将客厅的水拿到厨房并返回' }
];

const tabs = document.querySelectorAll('.demo-tabs button');
const video = document.querySelector('#demo-video');
const content = document.querySelector('#demo-content');
const current = document.querySelector('#demo-current');
const cameraLabel = document.querySelector('#demo-camera-label');

tabs.forEach((tab) => tab.addEventListener('click', () => {
  const index = Number(tab.dataset.demo);
  const demo = demos[index];
  tabs.forEach((item) => item.classList.toggle('active', item === tab));
  video.style.opacity = '0';
  content.style.opacity = '0';
  setTimeout(() => {
    video.src = demo.video;
    video.setAttribute('aria-label', demo.alt);
    cameraLabel.textContent = demo.label;
    video.load();
    video.play().catch(() => {});
    content.innerHTML = `<p class="demo-kicker">${demo.kicker}</p><h3>${demo.title}</h3><p>${demo.body}</p><div class="demo-skills">${demo.skills.map((skill) => `<span>${skill}</span>`).join('')}</div><div class="task-quote"><small>USER INSTRUCTION</small>“${demo.quote}”</div>`;
    current.textContent = String(index + 1).padStart(2, '0');
    video.style.opacity = '1';
    content.style.opacity = '1';
  }, 220);
}));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.desktop-nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('mobile-open', !open);
});
