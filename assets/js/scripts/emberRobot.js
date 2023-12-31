
function createChatWindow(config) {
  console.log('received config: ', config)
  // 创建按钮元素
  const btn = document.createElement('button')
  btn.id = config.buttonId || 'answerfansai-chat-bubble-button'
  btn.style.zIndex = '99999'
  btn.textContent = config.buttonText || '';
  btn.style.position = 'fixed';
  btn.style.bottom = config.buttonBottom || '4px';
  btn.style.right = config.buttonRight || '10px';
  btn.style.zIndex = config.buttonZIndex || '9999';
  btn.style.width = config.buttonWidth || '50px';
  btn.style.height = config.buttonHeight || '50px';
  btn.style.borderRadius = config.buttonBorderRadius || '50%';
  btn.style.backgroundColor = config.buttonBackgroundColor || '#8a2be2'; // 设置背景颜色为紫色
  btn.style.backgroundImage = `url('${config.buttonIconUrl || 'data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="32" height="32" viewBox="0 0 32 32"%3E%3Cpath fill="white" d="M16 19a6.99 6.99 0 0 1-5.833-3.129l1.666-1.107a5 5 0 0 0 8.334 0l1.666 1.107A6.99 6.99 0 0 1 16 19zm4-11a2 2 0 1 0 2 2a1.98 1.98 0 0 0-2-2zm-8 0a2 2 0 1 0 2 2a1.98 1.98 0 0 0-2-2z"%2F%3E%3Cpath fill="white" d="M17.736 30L16 29l4-7h6a1.997 1.997 0 0 0 2-2V6a1.997 1.997 0 0 0-2-2H6a1.997 1.997 0 0 0-2 2v14a1.997 1.997 0 0 0 2 2h9v2H6a4 4 0 0 1-4-4V6a3.999 3.999 0 0 1 4-4h20a3.999 3.999 0 0 1 4 4v14a4 4 0 0 1-4 4h-4.835Z"%2F%3E%3C%2Fsvg%3E'}')`;
  btn.style.backgroundSize = config.buttonIconSize || '50%'; // 设置 SVG 图标大小为按钮大小的一半
  btn.style.backgroundRepeat = config.buttonIconRepeat || 'no-repeat';
  btn.style.backgroundPosition = config.buttonIconPosition || 'center';
  btn.style.boxShadow = config.buttonBoxShadow || '0 2px 4px rgba(0, 0, 0, 0.5)';

  document.body.appendChild(btn);

  // 创建 iframe 元素
  const iframe = document.createElement('iframe');
  iframe.src = config.chatUrl || '';
  iframe.id = config.chatWindowId || "answerfansai-chat-bubble-window"
  iframe.style.border = config.chatWindowBorder || 'none';
  iframe.style.position = config.chatWindowPosition || 'fixed';
  iframe.style.flexDirection = config.chatWindowFlexDirection || 'column';
  iframe.style.justifyContent = config.chatWindowJustifyContent || 'space-between';
  iframe.style.boxShadow = config.chatWindowBoxShadow || 'rgba(150, 150, 150, 0.2) 0px 10px 30px 0px';
  iframe.style.bottom = config.chatWindowBottom || '5rem';
  iframe.style.right = config.chatWindowRight || '1rem';
  iframe.style.width = config.chatWindowWidth || '448px';
  iframe.style.height = config.chatWindowHeight || '85vh';
  iframe.style.maxHeight = config.chatWindowMaxHeight || '824px';
  iframe.style.borderRadius = config.chatWindowBorderRadius || '0.75rem';
  iframe.style.display = config.chatWindowDisplay || 'none';
  iframe.style.zIndex = config.chatWindowZIndex || '99999';
  iframe.style.overflow = config.chatWindowOverflow || 'hidden';
  iframe.style.left = config.chatWindowLeft || 'unset';

  // 在按钮上方显示或隐藏 iframe
  let isOpen = false;
  btn.addEventListener('click', () => {
    if (isOpen) {
      iframe.style.display = 'none'
      isOpen = false;
    } else {
      iframe.style.display = 'flex'
      isOpen = true;
    }
  });

  let notShowButton = document.querySelector('#afa-button-not-show');
  if (notShowButton) {
    console.log('not show button')
    btn.style.display = 'none';
  } else {
    console.log('show button')
    btn.style.display = 'block';
  }

  // 将 iframe 添加到页面中
  document.body.appendChild(iframe);
}

export default function run(debug = false) {
  let robotId = ''
  let buttonBottom = '4px';
  let buttonRight = '10px';
  let buttonBackgroundColor = '#8a2be2';
  let lang = 'en-US'
  let buttonIcon = '';
  let chatUrl = `https://answerfansai.com/${lang}/robot-chat-room/${robotId}`;

  if (debug) {
    robotId = '0c925a58-c2e2-4c99-a9a2-f32bd6a9e6f5'
    buttonBottom = '4px';
    buttonRight = '10px';
    buttonBackgroundColor = '#8a2be2';
    lang = 'en-US'
    buttonIcon = '';
    chatUrl = `http://answerfansai.com/${lang}/robot-chat-room/${robotId}`;
  } else {
    robotId = document.currentScript.getAttribute('id');
    const params = new URLSearchParams(document.currentScript.getAttribute('src'));
    buttonBottom = params.get('buttonBottom');
    buttonRight = params.get('buttonRight');
    buttonBackgroundColor = params.get('buttonBackgroundColor');
    buttonIcon = params.get('buttonIcon');
    lang = params.get('lang');
    chatUrl = `https://answerfansai.com/${lang}/robot-chat-room/${robotId}`;
  }

  createChatWindow({
    chatUrl: chatUrl,
    buttonBottom: buttonBottom,
    buttonRight: buttonRight,
    buttonBackgroundColor: buttonBackgroundColor,
    buttonIconUrl: buttonIcon,
    // 其他配置参数...
  });
}

// run();



